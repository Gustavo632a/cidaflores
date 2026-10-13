import { test, expect } from "@playwright/test";
for (const width of [320, 375, 390, 430, 768, 1024, 1440, 1920]) {
  test(`layout and assets at ${width}px`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);
    await expect(page.locator("h1")).toHaveCount(1);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBeTruthy();
    for (const image of await page.locator("main img").all()) {
      await image.scrollIntoViewIfNeeded();
      await expect(image).toHaveJSProperty("complete", true);
      expect(
        await image.evaluate((img: HTMLImageElement) => img.naturalWidth),
      ).toBeGreaterThan(0);
    }
    const anchors = await page
      .locator('a[href^="#"]')
      .evaluateAll((elements) =>
        elements.map((element) => element.getAttribute("href")!.slice(1)),
      );
    for (const id of anchors)
      await expect(page.locator(`[id="${id}"]`)).toHaveCount(1);
    await expect(page.locator('a[href*="wa.me"]')).toHaveCount(0);
    expect(errors).toEqual([]);
    await page.goto("/");
    await page.waitForTimeout(1000);
    await page.screenshot({
      path: `artifacts/viewport-${width}.png`,
      fullPage: true,
    });
  });
}
test("mobile menu keyboard, selection, and outside click", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const opener = page.getByRole("button", { name: "Abrir menu" });
  const menu = page.locator("#mobile-menu");
  await opener.click();
  await expect(menu).toBeVisible();
  await expect(opener).toHaveAttribute("aria-expanded", "true");
  await page.keyboard.press("Escape");
  await expect(menu).not.toBeVisible();
  await expect(opener).toBeFocused();
  await opener.click();
  await page
    .getByRole("navigation", { name: "Navegação mobile" })
    .getByRole("link", { name: "Coleção" })
    .click();
  await expect(menu).not.toBeVisible();
  await expect(page).toHaveURL(/#colecao$/);
  await opener.click();
  await page.mouse.click(5, 400);
  await expect(menu).not.toBeVisible();
});
test("lightbox navigation, focus trap, escape, and close", async ({ page }) => {
  await page.goto("/");
  const trigger = page.getByRole("button", { name: /Ampliar:/ }).first();
  await trigger.click();
  const modal = page.getByRole("dialog", {
    name: "Galeria de inspiração floral",
  });
  await expect(modal).toBeVisible();
  expect(await page.evaluate(() => document.body.style.overflow)).toBe(
    "hidden",
  );
  await page.keyboard.press("ArrowRight");
  await expect(modal.locator("p")).toContainText("2 / 6");
  await page.keyboard.press("ArrowLeft");
  await expect(modal.locator("p")).toContainText("1 / 6");
  for (let i = 0; i < 5; i++) {
    await page.keyboard.press("Tab");
    expect(
      await modal.evaluate((element) =>
        element.contains(document.activeElement),
      ),
    ).toBeTruthy();
  }
  await page.keyboard.press("Escape");
  await expect(modal).not.toBeVisible();
  await expect(trigger).toBeFocused();
  await trigger.click();
  await page.getByRole("button", { name: "Fechar galeria" }).click();
  await expect(modal).not.toBeVisible();
});
test("reduced motion and truthful business data", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  expect(
    await page
      .locator("h1")
      .evaluate((element) => getComputedStyle(element).animationName),
  ).toBe("none");
  const data = await page
    .locator('script[type="application/ld+json"]')
    .textContent();
  expect(JSON.parse(data!)).not.toHaveProperty("address");
  await expect(
    page.getByText("Endereço de referência, a confirmar."),
  ).toBeVisible();
});
