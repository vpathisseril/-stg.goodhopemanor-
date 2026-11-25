import { expect, test } from "@playwright/test";

test("referral page contains the supplied referral relationships and admission qualifications", async ({
  page,
}) => {
  await page.goto("/referrals/");

  await expect(
    page.getByRole("heading", { name: "Referral Partners", level: 1 }),
  ).toBeVisible();
  await expect(page.getByText("Local hospitals", { exact: true })).toBeVisible();
  await expect(
    page.getByText("Residents' families and responsible parties", {
      exact: true,
    }),
  ).toBeVisible();
  await expect(
    page.getByText(/Each prospective resident is considered individually/),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Contact Good Hope Manor" }),
  ).toHaveAttribute("href", "/contact/");
  await expect(page.locator("main")).not.toContainText(/commission|incentive/i);
});

test("footer provides client-required contact, license, privacy, accessibility, and AHCA links", async ({
  page,
}) => {
  await page.goto("/");

  const footer = page.locator("footer");
  await expect(
    footer.getByText("Assisted Living Facility License #8627", { exact: true }),
  ).toBeVisible();
  await expect(
    footer.getByRole("link", { name: "info@goodhopemanor.com" }),
  ).toHaveAttribute("href", "mailto:info@goodhopemanor.com");
  await expect(footer).toContainText("(954) 486-5335");
  await expect(
    footer.getByRole("link", { name: "Privacy Policy" }),
  ).toHaveAttribute("href", "/privacy/");
  await expect(
    footer.getByRole("link", { name: "Accessibility" }),
  ).toHaveAttribute("href", "/accessibility/");
  await expect(
    footer.getByRole("link", {
      name: "AHCA consumer information for licensed facilities (opens in a new tab)",
    }),
  ).toHaveAttribute("href", "https://quality.healthfinder.fl.gov/");
  await expect(
    footer.getByRole("link", {
      name: "AHCA consumer information for licensed facilities (opens in a new tab)",
    }),
  ).toHaveAttribute("target", "_blank");
});

test("contact page shows verified contact details and public hours", async ({
  page,
}) => {
  await page.goto("/contact/");

  const contactCard = page
    .getByRole("heading", { name: "Visit Good Hope Manor" })
    .locator("xpath=..");
  await expect(contactCard).toContainText("2251 NW 29th Ct.");
  await expect(
    contactCard.getByRole("link", { name: "info@goodhopemanor.com" }),
  ).toBeVisible();
  await expect(contactCard).toContainText("Fax: (954) 486-5335");
  await expect(contactCard).toContainText("Monday–Friday, 9 AM–5 PM");
  await expect(contactCard).toContainText("Monday–Sunday, 9 AM–9 PM");
});

test("reviews display the three supplied excerpts with month-and-year source labels", async ({
  page,
}) => {
  await page.goto("/reviews/");

  const quotes = [
    "The staff treats her like family and she loves it there.",
    "The facility is clean, inviting, and very maintained.",
    "They treat my dad with respect and kindness, ensuring he feels valued and cared for.",
  ];

  for (const quote of quotes) {
    await expect(page.getByText(quote)).toBeVisible();
  }
  const attributions = page.locator("main figcaption");
  await expect(attributions).toHaveCount(3);
  for (let index = 0; index < 3; index += 1) {
    await expect(attributions.nth(index)).toContainText("Google Review");
  }
  await expect(page.getByText("March 2025", { exact: true })).toBeVisible();
  await expect(page.getByText("November 2024", { exact: true })).toHaveCount(2);
  await expect(page.locator("main")).not.toContainText(/\b[1-5]\.0?\s*stars?\b/i);
});

test("service copy includes dining and qualified admissions without unapproved memory-care terms", async ({
  page,
}) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", {
      name: "Table-Service Dining",
      exact: true,
    }).first(),
  ).toBeVisible();
  await expect(page.locator("main")).toContainText(/nursing oversight/i);

  await page.goto("/services/");
  await expect(
    page.getByRole("heading", { name: "Care & Services" }),
  ).toBeVisible();
  await expect(page.locator("main")).toContainText("Important Information About Services");
  await expect(page.locator("main")).toContainText("applicable licensing requirements");
  await expect(page.locator("main")).not.toContainText(
    /memory support|memory care|dementia care/i,
  );
});

test("privacy and accessibility pages use the supplied website statements", async ({
  page,
}) => {
  await page.goto("/privacy/");
  await expect(page.locator("main")).toContainText(
    "Good Hope Manor respects the privacy of website visitors.",
  );
  await expect(page.locator("main")).toContainText(
    "Do not submit emergency medical information through the website.",
  );

  await page.goto("/accessibility/");
  await expect(page.locator("main")).toContainText(
    "The site uses semantic headings, descriptive image text, keyboard-accessible navigation, visible focus states, and responsive layouts.",
  );
  await expect(
    page.getByRole("link", { name: "(954) 677-2900" }).last(),
  ).toHaveAttribute("href", "tel:+19546772900");
});
