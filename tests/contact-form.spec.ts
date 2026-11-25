import { expect, test } from "@playwright/test";

test("validates required contact details and focuses the error summary", async ({
  page,
}) => {
  await page.goto("/contact/");
  await page.getByRole("button", { name: "Request a Tour" }).click();
  await expect(page.getByRole("alert").first()).toContainText(
    "Please fix the following",
  );
  await expect(page.getByLabel("Your name")).toHaveAttribute("aria-invalid", "true");
  await expect(page.getByLabel("Phone number")).toHaveAttribute(
    "aria-invalid",
    "true",
  );
});

test("posts a valid request and shows the confirmation", async ({ page }) => {
  let requestCount = 0;
  await page.route("https://formspree.io/f/test-endpoint", async (route) => {
    requestCount += 1;
    await new Promise((resolve) => setTimeout(resolve, 250));
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ ok: true }),
    });
  });
  await page.goto("/contact/");
  await page.getByLabel("Your name").fill("Jamie Example");
  await page.getByLabel("Phone number").fill("(954) 555-0100");
  const submitButton = page.getByRole("button", { name: "Request a Tour" });
  await submitButton.click();
  await page.locator("form").evaluate((form) =>
    (form as HTMLFormElement).requestSubmit(),
  );
  await expect(page.getByRole("button", { name: "Sending request…" })).toBeDisabled();
  await expect(
    page.getByRole("heading", {
      name: "Thank you — we've received your request",
    }),
  ).toBeVisible();
  expect(requestCount).toBe(1);
});
