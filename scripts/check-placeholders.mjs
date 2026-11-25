import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";

const contentRoot = join(process.cwd(), "src");
const markers = ["[CONTENT NEEDED:", "[PHOTO NEEDED:"];

async function findFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((entry) => {
      const path = join(directory, entry.name);
      return entry.isDirectory() ? findFiles(path) : [path];
    }),
  );
  return files.flat();
}

const files = await findFiles(contentRoot);
const placeholders = [];

for (const file of files) {
  const contents = await readFile(file, "utf8");
  for (const marker of markers) {
    const count = contents.split(marker).length - 1;
    if (count > 0) placeholders.push(`${file}: ${count} ${marker} marker(s)`);
  }
}

if (placeholders.length > 0) {
  console.warn("Unresolved content placeholders remain; production release is blocked:");
  for (const placeholder of placeholders) console.warn(`- ${placeholder}`);
} else {
  console.info("No content or photo placeholders found in src/content.");
}
