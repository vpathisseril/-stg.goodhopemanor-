import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { createServer } from "node:http";
import { extname, resolve, sep } from "node:path";
import { createGzip } from "node:zlib";
import { chromium } from "@playwright/test";
import { launch } from "chrome-launcher";
import lighthouse from "lighthouse";

const outputDirectory = resolve("out");
const routes = [
  "/",
  "/about/",
  "/services/",
  "/life/",
  "/families/",
  "/reviews/",
  "/contact/",
];
const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".woff2": "font/woff2",
  ".xml": "application/xml; charset=utf-8",
};

function startStaticServer() {
  const server = createServer(async (request, response) => {
    let pathname;
    try {
      pathname = decodeURIComponent(
        new URL(request.url ?? "/", "http://localhost").pathname,
      );
    } catch {
      response.writeHead(400).end();
      return;
    }

    let filePath = resolve(outputDirectory, `.${pathname}`);
    if (filePath !== outputDirectory && !filePath.startsWith(`${outputDirectory}${sep}`)) {
      response.writeHead(403).end();
      return;
    }

    try {
      if ((await stat(filePath)).isDirectory()) filePath = resolve(filePath, "index.html");
    } catch {
      if (!extname(filePath)) filePath = resolve(filePath, "index.html");
    }

    try {
      const file = await stat(filePath);
      if (!file.isFile()) throw new Error("Requested path is not a file.");
      const contentType =
        contentTypes[extname(filePath)] ?? "application/octet-stream";
      const compressible =
        contentType.startsWith("text/") ||
        ["application/json", "application/xml"].includes(contentType);
      const acceptsGzip =
        compressible && /\bgzip\b/.test(request.headers["accept-encoding"] ?? "");
      const headers = {
        "Content-Type": contentType,
        Vary: "Accept-Encoding",
      };
      if (acceptsGzip) headers["Content-Encoding"] = "gzip";
      else headers["Content-Length"] = file.size;
      response.writeHead(200, headers);
      if (request.method === "HEAD") response.end();
      else {
        const fileStream = createReadStream(filePath);
        if (acceptsGzip) fileStream.pipe(createGzip()).pipe(response);
        else fileStream.pipe(response);
      }
    } catch {
      response.writeHead(404).end("Not found");
    }
  });

  return new Promise((resolveListen, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", () => {
      const address = server.address();
      if (!address || typeof address === "string") {
        reject(new Error("Static preview server did not report a network port."));
        return;
      }
      resolveListen({ server, origin: `http://127.0.0.1:${address.port}` });
    });
  });
}

let staticServer;
let chrome;

try {
  staticServer = await startStaticServer();
  chrome = await launch({
    chromeFlags: ["--headless", "--no-sandbox"],
    chromePath: chromium.executablePath(),
  });
  let failed = false;

  for (const route of routes) {
    const result = await lighthouse(
      new URL(route, staticServer.origin).toString(),
      {
        formFactor: "mobile",
        logLevel: "error",
        onlyCategories: ["performance", "accessibility", "seo"],
        port: chrome.port,
        throttlingMethod: "simulate",
      },
    );
    if (!result) throw new Error(`Lighthouse returned no result for ${route}.`);

    const scores = result.lhr.categories;
    const summary = ["performance", "accessibility", "seo"]
      .map((category) => `${category} ${Math.round((scores[category]?.score ?? 0) * 100)}`)
      .join(", ");
    console.info(`${route}: ${summary}`);

    if ((scores.performance?.score ?? 0) < 0.95) {
      const lcpBreakdown = result.lhr.audits["lcp-breakdown-insight"]?.details;
      if (lcpBreakdown?.items) {
        console.info(`  LCP breakdown: ${JSON.stringify(lcpBreakdown.items)}`);
      }

      const underperformingAudits = (scores.performance?.auditRefs ?? [])
        .filter(({ id, weight }) => weight > 0 && (result.lhr.audits[id]?.score ?? 1) < 1)
        .sort((left, right) => right.weight - left.weight)
        .slice(0, 5);
      for (const { id } of underperformingAudits) {
        const audit = result.lhr.audits[id];
        console.info(
          `  ${id}: ${audit?.displayValue ?? audit?.title ?? "score below 100"}`,
        );
      }
    }

    if (
      (scores.performance?.score ?? 0) < 0.95 ||
      (scores.accessibility?.score ?? 0) < 1 ||
      (scores.seo?.score ?? 0) < 0.95
    ) {
      failed = true;
    }
  }

  if (failed) {
    console.error(
      "Lighthouse thresholds not met: performance ≥ 95, accessibility = 100, SEO ≥ 95.",
    );
    process.exitCode = 1;
  }
} catch (error) {
  console.error("Lighthouse run failed.", error);
  process.exitCode = 1;
} finally {
  await chrome?.kill();
  if (staticServer) {
    await new Promise((resolveClose, rejectClose) => {
      staticServer.server.close((error) => {
        if (error) rejectClose(error);
        else resolveClose();
      });
    });
  }
}
