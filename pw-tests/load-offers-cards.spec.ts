import { test, expect } from '@playwright/test';

test.describe('Loading Cards from server', () => {
  test('should load cards from server correctly', async ({ page }) => {
    await page.goto('http://localhost:5173'); 

    // Ожидание ответа сервера
    await page.waitForResponse((resp) => resp.url().includes('/six-cities/offers') && resp.status() === 200);

    await page.locator('.cities__card').first().waitFor();

    const cardElements = await page.locator('.cities__card').all();
    expect(cardElements.length).toBeGreaterThan(0);

    for (const element of cardElements) {
      // Проверка наличия у карточек текста
      const text = await element.innerText();
      expect(text).toContain('night');
      expect(text).toContain('To bookmarks');

      // Проверка наличия у карточек цены
      const number = text.replace(/^\D+/g, '');
      const isNumber = !isNaN(parseInt(number)) && isFinite(parseInt(number));
      expect(isNumber).toBe(true);
    }
  });
});
