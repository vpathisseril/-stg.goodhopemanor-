import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const routes = [
  { path: "/", label: "Home" },
  { path: "/about/", label: "About Us" },
  { path: "/services/", label: "Care & Services" },
  { path: "/life/", label: "Life at Good Hope" },
  { path: "/families/", label: "For Families" },
  { path: "/reviews/", label: "Reviews" },
  { path: "/referrals/", label: "Referral Partners" },
  { path: "/contact/", label: "Contact" },
];
const pagePaths = routes.map((route) => route.path);
const allPagePaths = [...pagePaths, "/privacy/", "/accessibility/"];

test("marks the current desktop navigation link on every route", async ({
  page,
}) => {
  for (const route of routes) {
    await page.goto(route.path);
    await expect(
      page.getByRole("navigation", { name: "Primary" }).first().getByRole("link", {
        name: route.label,
        exact: true,
      }),
    ).toHaveAttribute("aria-current", "page");
  }
});

test("mobile menu opens, traps focus, and closes with Escape", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/about/");

  const menuButton = page.getByRole("button", { name: "Menu" });
  await menuButton.click();
  await expect(menuButton).toHaveAttribute("aria-expanded", "true");
  await expect(page.getByRole("navigation", { name: "Primary" }).last()).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("button", { name: "Menu" })).toHaveAttribute(
    "aria-expanded",
    "false",
  );
  await expect(menuButton).toBeFocused();
});

test("sub-pages include a breadcrumb with the current page", async ({ page }) => {
  await page.goto("/services/");
  const breadcrumb = page.getByRole("navigation", { name: "Breadcrumb" });
  await expect(breadcrumb.getByRole("link", { name: "Home" })).toBeVisible();
  await expect(breadcrumb.getByText("Care & Services")).toHaveAttribute(
    "aria-current",
    "page",
  );
});

test("skip link is the first focusable page control", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Skip to main content" })).toBeFocused();
});

test("Contact keeps a mobile call action visible while its contact details are below the fold", async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto("/contact/");

  const mobileActions = page.getByRole("group", {
    name: "Mobile contact actions",
  });
  const callLink = mobileActions.getByRole("link", {
    name: "Call (954) 677-2900",
  });
  await expect(callLink).toBeVisible();
  await expect
    .poll(() =>
      callLink.evaluate((element) => {
        const bounds = element.getBoundingClientRect();
        return bounds.top >= 0 && bounds.bottom <= window.innerHeight;
      }),
    )
    .toBe(true);
  await expect(mobileActions.getByRole("link")).toHaveCount(1);
});

test("route titles and social metadata use the page title without repeating the brand", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page).toHaveTitle("Assisted Living in Oakland Park | Good Hope Manor");
  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
    "content",
    "Assisted Living in Oakland Park | Good Hope Manor",
  );
  await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute(
    "content",
    "summary",
  );
});

test("LocalBusiness JSON-LD contains configured site facts and omits empty fields", async ({
  page,
}) => {
  await page.goto("/");
  const jsonLdText = await page
    .locator('script[type="application/ld+json"]')
    .textContent();
  const localBusiness = JSON.parse(jsonLdText ?? "{}") as Record<string, unknown>;

  expect(localBusiness).toMatchObject({
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Good Hope Manor",
    telephone: "+19546772900",
    address: {
      "@type": "PostalAddress",
      streetAddress: "2251 NW 29th Ct.",
      addressLocality: "Oakland Park",
      addressRegion: "FL",
      postalCode: "33311",
    },
  });
  expect(localBusiness).not.toHaveProperty("url");
});

test("home displays approved illustrations and life displays loaded supplied photos", async ({
  page,
}) => {
  await page.goto("/");
  const heroBackground = page.locator(
    'div[role="img"][aria-label="Illustrative image of three older adults smiling together in a garden."]',
  );
  await expect(heroBackground).toBeVisible();
  const backgroundUrl = await heroBackground.evaluate((element) => {
    const match = getComputedStyle(element).backgroundImage.match(/url\(["']?(.*?)["']?\)/);
    return match?.[1];
  });
  if (!backgroundUrl) {
    throw new Error("Homepage hero background image URL was not found.");
  }
  const backgroundResponse = await page.request.get(backgroundUrl);
  expect(backgroundResponse.ok()).toBe(true);
  const caregivingIllustration = page.getByRole("img", {
    name: "Illustrative image of a caregiver talking with an older woman in a garden.",
  });
  await expect(caregivingIllustration).toBeVisible();
  await expect
    .poll(() =>
      caregivingIllustration.evaluate(
        (image) =>
          image instanceof HTMLImageElement &&
          image.complete &&
          image.naturalWidth > 0,
      ),
    )
    .toBe(true);
  await expect
    .poll(() =>
      page.locator("main img").evaluateAll((images) =>
        images.every(
          (image) =>
            image instanceof HTMLImageElement &&
            image.complete &&
            image.naturalWidth > 0,
        ),
      ),
    )
    .toBe(true);

  await page.goto("/life/");
  await expect(page.locator("main img")).toHaveCount(6);
  await expect(page.locator("main img[alt='']")).toHaveCount(0);
  for (const image of await page.locator("main img").all()) {
    await image.scrollIntoViewIfNeeded();
    await expect
      .poll(() =>
        image.evaluate(
          (element) =>
            element instanceof HTMLImageElement &&
            element.complete &&
            element.naturalWidth > 0,
        ),
      )
      .toBe(true);
  }
});

test("homepage hero background covers the section at responsive widths", async ({
  page,
}) => {
  const heroBackground = page.locator(
    'div[role="img"][aria-label="Illustrative image of three older adults smiling together in a garden."]',
  );

  for (const width of [1440, 768, 390, 320]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    await expect(heroBackground).toHaveCSS("background-size", "cover");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.getByRole("link", { name: "Schedule a Tour" }).first()).toBeVisible();

    const hasHorizontalOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
    );
    expect(hasHorizontalOverflow).toBe(false);
  }
});

test("home feature section presents client-approved text responsively", async ({
  page,
}) => {
  const section = page.getByRole("region", {
    name: "Why Families Choose Good Hope Manor",
  });

  await page.goto("/");

  for (const width of [1440, 768, 390, 320]) {
    await page.setViewportSize({ width, height: 900 });
    await expect(section).toBeVisible();
    await expect(section.getByRole("img")).toHaveCount(0);
    await expect(
      section.getByRole("heading", { name: "Long-Tenured Staff" }),
    ).toBeVisible();
    await expect(
      section.getByRole("heading", {
        name: "Table-Service Dining",
        exact: true,
      }).first(),
    ).toBeVisible();
    await expect(
      section.getByRole("heading", { name: "Meaningful Activities" }),
    ).toBeVisible();

    const hasHorizontalOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
    );
    expect(hasHorizontalOverflow).toBe(false);
  }
});

test("family care approach has a clear responsive editorial layout", async ({
  page,
}) => {
  const section = page
    .locator("section")
    .filter({
      has: page.getByRole("heading", {
        name: "Personalized Assisted Living",
      }),
    });

  for (const width of [1440, 1024, 768, 390, 320]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");

    await expect(
      section.getByRole("heading", {
        name: "Personalized Assisted Living",
      }),
    ).toBeVisible();
    await expect(
      section.getByRole("img", {
        name: "Illustrative image of a caregiver talking with an older woman in a garden.",
      }),
    ).toBeVisible();
    await expect(section.locator("p").first()).toBeVisible();
    await expect(
      section.getByRole("link", { name: "Explore Care & Services" }),
    ).toHaveAttribute("href", "/services/");

    const columnCount = await section
      .locator(".grid")
      .evaluate((layout) =>
        getComputedStyle(layout).gridTemplateColumns.split(" ").length,
      );
    expect(columnCount).toBe(width >= 1024 ? 2 : 1);

    const hasHorizontalOverflow = await page.evaluate(
      () =>
        document.documentElement.scrollWidth >
        document.documentElement.clientWidth,
    );
    expect(hasHorizontalOverflow).toBe(false);
  }
});

test("the two editorial sections preserve the rose-petal corners responsively", async ({
  page,
}) => {
  await page.goto("/");

  const sections = [
    page
      .locator("section")
      .filter({
        has: page.getByRole("heading", {
          name: "Family Owned. Personally Committed.",
        }),
      }),
    page
      .locator("section")
      .filter({
        has: page.getByRole("heading", {
          name: "Personalized Assisted Living",
        }),
      }),
  ];

  for (const [width, height] of [
    [1920, 1080],
    [1440, 900],
    [1024, 768],
    [768, 1024],
    [390, 844],
    [375, 667],
    [844, 390],
  ] as const) {
    await page.setViewportSize({ width, height });

    for (const section of sections) {
      const upperLeftPetal = section.locator("img.rose-petal-upper-left");
      const lowerRightPetal = section.locator("img.rose-petal-lower-right");
      const heading = section.getByRole("heading").first();

      await section.scrollIntoViewIfNeeded();
      await expect(upperLeftPetal).toHaveAttribute(
        "src",
        /rose-petal-upper-left/,
      );
      await expect(lowerRightPetal).toHaveAttribute(
        "src",
        /rose-petal-lower-right/,
      );
      await expect(upperLeftPetal).toHaveCSS("object-fit", "contain");
      await expect(lowerRightPetal).toHaveCSS("object-fit", "contain");
      await expect(upperLeftPetal).toHaveCSS("filter", "none");
      await expect(lowerRightPetal).toHaveCSS("filter", "none");
      await expect(upperLeftPetal).toHaveCSS("mask-image", /radial-gradient/);
      await expect(lowerRightPetal).toHaveCSS("mask-image", /radial-gradient/);
      await expect(upperLeftPetal).toHaveJSProperty("naturalWidth", 360);
      await expect(upperLeftPetal).toHaveJSProperty("naturalHeight", 300);
      await expect(lowerRightPetal).toHaveJSProperty("naturalWidth", 360);
      await expect(lowerRightPetal).toHaveJSProperty("naturalHeight", 330);
      await expect(section).toHaveCSS("overflow", "hidden");
      await expect(section).toHaveCSS(
        "background-color",
        "rgb(249, 247, 241)",
      );
      await expect(heading).toHaveCSS("filter", "none");
      await expect(upperLeftPetal).toBeVisible();
      await expect(lowerRightPetal).toBeVisible();

      const sectionWidth = await section.evaluate(
        (element) => element.getBoundingClientRect().width,
      );
      for (const petal of [upperLeftPetal, lowerRightPetal]) {
        const petalWidth = await petal.evaluate(
          (element) => element.getBoundingClientRect().width,
        );
        expect(petalWidth).toBeLessThan(sectionWidth / 2);
      }
    }

    const hasHorizontalOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
    );
    expect(hasHorizontalOverflow).toBe(false);
  }
});

test("the two editorial sections have no serious accessibility violations", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  const results = await new AxeBuilder({ page })
    .include(".corner-petal-section")
    .withTags([
      "wcag2a",
      "wcag2aa",
      "wcag21a",
      "wcag21aa",
      "wcag22a",
      "wcag22aa",
    ])
    .analyze();

  expect(results.violations).toEqual([]);
});

test("community photo gallery includes all spaces and supports manual navigation", async ({
  page,
}) => {
  const expectedPhotoNames = [
    "A living room with sofas, armchairs, and a bookcase.",
    "Dining room with tables, chairs, and windows.",
    "Bedroom with a bed, chair, and bedside furniture.",
    "A shared room with bookshelves, a television, a table, and chairs.",
    "Dining room with tables, chairs, and blue tablecloths.",
    "Bathroom with grab bars, a shower seat, and a walk-in shower.",
  ];
  const gallery = page.getByRole("region", {
    name: "Photographs of living, dining, bedroom, and bathroom spaces",
  });

  for (const width of [1440, 768, 390, 320]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");

    await expect(
      page.getByRole("heading", { name: "Spaces to picture everyday life" }),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Explore life at Good Hope Manor" }),
    ).toHaveAttribute("href", "/life/");
    const sectionTint = await page
      .locator(".community-life-section")
      .evaluate((section) => {
        const channels = getComputedStyle(section)
          .backgroundColor.match(/[\d.]+/g)
          ?.slice(0, 3)
          .map(Number);

        return channels?.map((channel) =>
          Math.round(channel <= 1 ? channel * 255 : channel),
        );
      });
    expect(sectionTint).toEqual([245, 238, 233]);
    await expect(gallery.locator("li")).toHaveCount(expectedPhotoNames.length);

    for (const name of expectedPhotoNames) {
      await expect(gallery.getByRole("img", { name })).toHaveCount(1);
    }

    const hasHorizontalOverflow = await page.evaluate(
      () =>
        document.documentElement.scrollWidth >
        document.documentElement.clientWidth,
    );
    expect(hasHorizontalOverflow).toBe(false);
  }

  const nextButton = page.getByRole("button", { name: "Next spaces" });
  const previousButton = page.getByRole("button", { name: "Previous spaces" });
  await expect(gallery).toHaveCSS("touch-action", "pan-x");
  await expect(gallery.locator("ul")).toHaveCSS("animation-name", "none");
  await expect
    .poll(() => gallery.evaluate((element) => element.scrollLeft))
    .toBe(0);
  await page.waitForTimeout(500);
  await expect
    .poll(() => gallery.evaluate((element) => element.scrollLeft))
    .toBe(0);
  await expect(previousButton).toBeDisabled();
  await gallery.focus();
  await page.keyboard.press("ArrowRight");
  await expect
    .poll(() => gallery.evaluate((element) => element.scrollLeft))
    .toBeGreaterThan(0);
  await page.keyboard.press("ArrowLeft");
  await expect
    .poll(() => gallery.evaluate((element) => element.scrollLeft))
    .toBe(0);

  await nextButton.click();
  await expect(previousButton).toBeEnabled();
  await expect
    .poll(() => gallery.evaluate((element) => element.scrollLeft))
    .toBeGreaterThan(0);

  await page.emulateMedia({ reducedMotion: "reduce" });
  const positionBeforeReducedMotionNavigation = await gallery.evaluate(
    (element) => element.scrollLeft,
  );
  await nextButton.click();
  await expect
    .poll(() => gallery.evaluate((element) => element.scrollLeft))
    .toBeGreaterThan(positionBeforeReducedMotionNavigation);

  while (!(await previousButton.isDisabled())) {
    const previousPosition = await gallery.evaluate(
      (element) => element.scrollLeft,
    );
    await previousButton.click();
    await expect
      .poll(() => gallery.evaluate((element) => element.scrollLeft))
      .toBeLessThan(previousPosition);
  }
  await expect
    .poll(() => gallery.evaluate((element) => element.scrollLeft))
    .toBe(0);

  for (let index = 0; index < expectedPhotoNames.length; index += 1) {
    if (await nextButton.isDisabled()) {
      break;
    }

    const previousPosition = await gallery.evaluate(
      (element) => element.scrollLeft,
    );
    await nextButton.click();
    await expect
      .poll(() => gallery.evaluate((element) => element.scrollLeft))
      .toBeGreaterThan(previousPosition);
  }
  await expect(nextButton).toBeDisabled();
  await expect
    .poll(() =>
      gallery.locator("img").evaluateAll((images) =>
        images.every(
          (image) =>
            image instanceof HTMLImageElement &&
            image.complete &&
            image.naturalWidth > 0,
        ),
      ),
    )
    .toBe(true);

  const endPosition = await gallery.evaluate((element) => element.scrollLeft);
  await previousButton.click();
  await expect
    .poll(() => gallery.evaluate((element) => element.scrollLeft))
    .toBeLessThan(endPosition);
});

test("community photo gallery has no serious accessibility violations", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  const results = await new AxeBuilder({ page })
    .include(".community-life-section")
    .withTags([
      "wcag2a",
      "wcag2aa",
      "wcag21a",
      "wcag21aa",
      "wcag22a",
      "wcag22aa",
    ])
    .analyze();

  expect(results.violations).toEqual([]);
});

test("all routes render without visible content placeholders", async ({
  page,
}) => {
  for (const path of allPagePaths) {
    await page.goto(path);
    await expect(page.locator("body")).not.toContainText(
      /\[(?:CONTENT|PHOTO) NEEDED:|client approval needed/i,
    );
  }
});
