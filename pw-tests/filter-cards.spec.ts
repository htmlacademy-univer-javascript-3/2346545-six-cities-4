import { test, expect } from '@playwright/test';

test.describe('Filter Cards by Price and Rating', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173');

    await page.locator('.cities__card').first().waitFor(); // Загрузка карточек

    const filterMenu = await page.locator('.places__sorting-type').first();
    filterMenu.click(); // Нажатие на выпадающее меню
  });

  test('should filter cards by price (low to high) correctly', async ({page}) => {
    const filters = await page.locator('.places__option').all();
    await filters[1].click(); // Нажатие на опцию из меню

    await page.locator('.places__found').first().waitFor(); // Ожидание перезагрузки страницы
    await page.locator('.cities__card').first().waitFor(); // Ожидание загрузки карточек

    const cardElements = await page.locator('.cities__card').all();
    expect(cardElements.length).toBeGreaterThan(0); // Проверка наличие хотя бы 1 карточки

    const pricesLocators = await page.locator('.cities__card .place-card__price-value').all();

    const prices = await Promise.all(pricesLocators.map(async (locator) => {
      const text = await locator.innerText();
      return parseInt(text.replace(/^\D+/g, ''));
    }));

    const sortedPrices = [...prices].sort((a, b) => a - b); // Сортировка по цене (по возрастанию)
    expect(prices).toEqual(sortedPrices);
  });

  test('should filter cards by price (high to low) correctly', async ({page}) => {
    const filters = await page.locator('.places__option').all();
    await filters[2].click();

    await page.locator('.places__found').first().waitFor();
    await page.locator('.cities__card').first().waitFor(); 

    const cardElements = await page.locator('.cities__card').all();
    expect(cardElements.length).toBeGreaterThan(0);

    const pricesLocators = await page.locator('.cities__card .place-card__price-value').all();

    const prices = await Promise.all(pricesLocators.map(async (locator) => {
      const text = await locator.innerText();
      return parseInt(text.replace(/^\D+/g, ''));
    })); 

    const sortedPrices = [...prices].sort((a, b) => b - a); // Сортировка по цене (по убыванию)
    expect(prices).toEqual(sortedPrices);
  });

  test('should filter cards by rating (top rated first) correctly', async ({page}) => {
    const filters = await page.locator('.places__option').all();
    await filters[3].click(); 

    await page.locator('.places__found').first().waitFor(); 
    await page.locator('.cities__card').first().waitFor();

    const cardElements = await page.locator('.cities__card').all(); 
    expect(cardElements.length).toBeGreaterThan(0); 

    const ratingsLocators = await page.locator('.place-card__rating').all();

    const ratings = await Promise.all(ratingsLocators.map(async (locator) => {
      const rating = await locator.getAttribute('data-test');
      return await parseFloat(String(rating).replace(/^\D+/g, '') ?? '0');
    })); // get all offers ratings

    const sortedRatings = [...ratings].sort((a, b) => b - a); // Сортировка пе рейтингку
    expect(ratings).toEqual(sortedRatings);
  });
});

test.describe('Filter Cards by City', () => {
  test('should filter cards by city correctly', async ({ page }) => {
    await page.goto('http://localhost:5173');

    await page.locator('.cities__card').first().waitFor(); 

    const locations = await page.locator('.locations__item-link').all(); 
    for (const location of locations) {
      const cityNameTab = await location.getAttribute('city-name'); // Выбор города

      await location.click(); // click the element

      await page.locator('.places__found').first().waitFor();
      await page.locator('.cities__card').first().waitFor();

      const cardElements = await page.locator('.cities__card').all(); 
      expect(cardElements.length).toBeGreaterThan(0); 

      const boardText = await page.locator('.places__found').first()?.evaluate((el) =>
        el.textContent?.trim()
      );
      const cityNameBoard = boardText?.split(' ').pop(); // Получение названия города
      expect(cityNameTab).toBe(cityNameBoard); // Сравнение названий
    }
  });
});
