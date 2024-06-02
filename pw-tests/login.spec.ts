import { test, expect } from '@playwright/test';

test.describe('Login Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173');

    await page.locator('.header__nav-link').first().waitFor();
    const loginButton = await page.locator('.header__login');

    // Переход к логину
    await loginButton.first().click();
    await page.waitForURL('http://localhost:5173/login');
  });

  test('should log in successfully with valid email and password', async ({ page }) => {
    const email = 'nailsmurino@gmail.com';
    // Заполнение формы
    await page.fill('input[name="email"]', email);
    await page.fill('input[name="password"]', 'q1w2e3r4t5y6');
    await page.click('button[type="submit"]');

    // Ожидание ответа сервера
    await page.waitForResponse((resp) => resp.url().includes('/six-cities/login') && resp.status() === 201);
    await page.waitForURL('http://localhost:5173/');

    // Проверка соответсвия почты в шапке с той, с которой был произведен вход
    const element = await page.locator('.header__user-name');
    const text = await element.getAttribute('data-test');
    expect(text).toEqual(email);
  });

  test('should display error message with invalid password', async ({ page }) => {
    // Заполнение формы
    await page.fill('input[name="email"]', 'email@gmail.com');
    await page.fill('input[name="password"]', 'qwerty');
    await page.click('button[type="submit"]');

    await page.locator('.Toastify__toast-body').first().waitFor(); // Ожидание сообщения

    const url = page.url();
    expect(url).toBe('http://localhost:5173/login'); // Отсутствие перехода к другой странице
  });
});
