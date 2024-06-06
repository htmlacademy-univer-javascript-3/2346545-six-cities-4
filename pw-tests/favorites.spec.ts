import { expect, test } from '@playwright/test';


test.describe('Favorites', () => {
  test('should redirect unauthorizes users to login page when trying to add offer to favorites',
    async ({ page }) => {
      await page.goto('http://localhost:5173');

      await page.locator('.cities__card').first().waitFor; // Загрузка карточек
      const cardElement = await page.locator('.cities__card').first(); // Определение первой карточки
      await cardElement.locator('.place-card__bookmark-button').click(); // Нажатие на кнопку для добавления в избранное
      page.waitForURL('http://localhost:5173/login'); // Ожидание перенаправления на страницу логина

      await page.goto('http://localhost:5173/favorites'); // Попытка перейти в избранное
      page.waitForURL('http://localhost:5173/login'); // Ожидание перенаправления на страницу логина

      await page.goto('http://localhost:5173');

      await page.locator('.cities__card').first().waitFor; 
      const cardElements = await page.locator('.cities__card');

      await cardElements.first().click(); // Нажатие на первую карточку

      await page.locator('.offer__gallery').first().waitFor(); // Ожидание загрузки страницы предложения

      const addToFavoritesButton = await page.locator('.offer__bookmark-button');
      await addToFavoritesButton.click(); // Нажатие на кнопку для добавления в избранное
      page.waitForURL('http://localhost:5173/login'); // Ожидание перенаправления на страницу логина
    });

  test('should let authorized user add offer to favorites and delete from favorites', async ({ page }) => {
    const getFavoritesCount = async () =>
      parseInt(
        (await page.locator('.header__favorite-count').textContent()) || '0'
      );

    await page.goto('http://localhost:5173'); 
    await page.goto('http://localhost:5173/login');

    await page.fill('input[name="email"]', 'rayangosling@gmail.com');
    await page.fill('input[name="password"]', 'IDrive69');

    await page.click('button[type="submit"]');

    await page.waitForURL('http://localhost:5173');
    await page.waitForSelector('.cities__card'); 

    const initialFavoritesCount = await getFavoritesCount();

    const addToFavoritesButton = await page.locator('.place-card__bookmark-button').all();
    await addToFavoritesButton[0].click(); // Добавление предложения в избранное
    await page.waitForResponse((resp) => resp.url().includes(`/six-cities/favorite/`)
         && resp.status() === 201);
    await page.waitForTimeout(100);
    expect(await getFavoritesCount()).toBe(initialFavoritesCount + 1);

    await addToFavoritesButton[0].click(); // Удаление предложения из избранного
    await page.waitForResponse((resp) => resp.url().includes(`/six-cities/favorite/`) && resp.status() === 200);
    await page.waitForTimeout(100);
    expect(await getFavoritesCount()).toBe(initialFavoritesCount);
  });
});
