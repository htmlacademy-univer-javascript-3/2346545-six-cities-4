import { test, expect } from '@playwright/test';

test.describe('Send Comment', () => {
  test('should not let unauthorized user send comment', async ({ page }) => {
    await page.goto('http://localhost:5173');

    await page.locator('.cities__card').first().waitFor(); 
    const cardElements = await page.locator('.cities__card');

    await cardElements.first().click(); 

    await page.locator('.offer__gallery').first().waitFor(); // Ожидание загрузки предложений

    const commentForm = await page.locator('.reviews__form');
    expect(await commentForm.isHidden()).toBeTruthy(); // Форма комментария должна быть спрятана
  });

  test('should let authorized user send comment', async ({ page }) => {
    await page.goto('http://localhost:5173'); 
    await page.goto('http://localhost:5173/login'); 

    // Заполнение формы
    await page.fill('input[name="email"]', 'nailsmurino@gmail.com');
    await page.fill('input[name="password"]', 'q1w2e3r4t5');
    await page.click('button[type="submit"]');

    await page.locator('.cities__card').first().waitFor(); 
    const cardElement = await page.locator('.cities__card').first();

    // Получение id первой карточки
    const aElement = await cardElement.locator('a').first();
    const href = await aElement.getAttribute('href');
    const cardId = href ? href.split('/').pop() : '';

    await cardElement.click();

    await page.waitForURL(`http://localhost:5173/offer/${ cardId}`); // Ожидание загрузки страницы предложения
    await page.locator('.offer__gallery').first().waitFor();

    const commentForm = await page.locator('.reviews__form');
    expect(await commentForm.isHidden()).not.toBeTruthy(); // Форма комментария должна быть спрятана

    // Отправка комментария
    const reviewText = 'this is a test message which is at least 50 charachters long.';
    await page.fill('[name="review"]', reviewText);
    const ratingInputs = await page.locator('.form__rating-label').all();
    await ratingInputs[1].click(); 
    await page.click('button[type="submit"]');

    // Ожидание ответа сервера
    await page.waitForResponse((resp) => resp.url().includes(`/six-cities/comments/${ cardId}`) && resp.status() === 201);

    // Ожидание перезагрузки отзывов
    await page.locator('.offer__gallery').first().waitFor();
    const newReview = await page.locator('.reviews__item').first();

    const newReviewText = await newReview?.locator('.reviews__text').first()?.evaluate((el) =>
      el.textContent?.trim()
    );

    expect(newReviewText).toBe(reviewText); // Проверка соответствия текста отзыва

    const newReviewRating = await newReview?.locator('.reviews__stars').first()?.getAttribute('data-test');
    expect(parseInt(String(newReviewRating).replace(/^\D+/g, ''))).toBe(4 * 20); // Проверка поставленной оценки

    const newReviewUser = await newReview?.locator('.reviews__user-name').first()?.evaluate((el) =>
      el.textContent?.trim()
    );
    const element = await page.locator('.header__user-name').first();
    const headerUser = await element?.getAttribute('data-test');
    expect(newReviewUser).toBe(headerUser?.split('@')[0]); // Проверка соответствия пользователя
  });
});
