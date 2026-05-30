import { expect, test } from "@playwright/test";

test("login page shows password and social sign-in options", async ({
  page,
}) => {
  await page.goto("/login");

  await expect(
    page.getByRole("heading", { name: "Sign in" }),
  ).toBeVisible();
  await expect(page.getByRole("button", { name: "Continue with Google" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Continue with GitHub" })).toBeVisible();
  await expect(page.getByLabel("Email")).toBeVisible();
  await expect(page.getByLabel("Password")).toBeVisible();
});

test("profile page redirects anonymous users to login", async ({ page }) => {
  await page.goto("/profile");

  await expect(page).toHaveURL(/\/login$/);
  await expect(
    page.getByRole("heading", { name: "Sign in" }),
  ).toBeVisible();
});

test("login form rejects short passwords before submit", async ({ page }) => {
  await page.goto("/login");

  const password = page.getByLabel("Password");

  await page.getByLabel("Email").fill("missing@example.com");
  await password.fill("123");
  await page.getByRole("button", { name: "Sign in" }).click();

  await expect(password).toHaveJSProperty("validity.valid", false);
});
