import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const routes = [
  "/",
  "/about/",
  "/services/",
  "/life/",
  "/families/",
  "/reviews/",
  "/referrals/",
  "/contact/",
  "/privacy/",
  "/accessibility/",
];

for (const route of routes) {
  test(`has no serious accessibility violations at ${route}`, async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(route);
    await expect(page.locator("main h1")).toHaveCount(1);

    const results = await new AxeBuilder({ page }).withTags([
      "wcag2a",
      "wcag2aa",
      "wcag21a",
      "wcag21aa",
      "wcag22a",
      "wcag22aa",
    ]).analyze();

    expect(results.violations).toEqual([]);
  });
}

test("the not-found page has no serious accessibility violations", async ({
  page,
}) => {
  await page.goto("/not-a-page/");
  await expect(page.getByRole("heading", { name: "We can't find that page" })).toBeVisible();

  const results = await new AxeBuilder({ page })
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
