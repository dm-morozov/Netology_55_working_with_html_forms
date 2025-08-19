import puppeteer, { Browser, Page } from "puppeteer";

describe("Редактор списка (ItemManager + Modal)", () => {
  let browser: Browser;
  let page: Page;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: false, // можно true, если не нужно смотреть
      // slowMo: 50,
    });
    page = await browser.newPage();
    await page.goto("http://127.0.0.1:3000");
  });

  afterAll(async () => {
    await browser.close();
  });

  beforeEach(async () => {
    await page.evaluate(() => localStorage.clear()); // чистим сохранения
    await page.reload();
  });

  test("Добавление нового элемента", async () => {
    await page.click(".btn-add");

    await page.type(".input-name", "Тестовый товар");
    await page.type(".input-price", "100");

    await page.click(".btn-save");

    const text = await page.$eval(
      ".table-body tr td:first-child",
      (el) => el.textContent,
    );
    expect(text).toBe("Тестовый товар");
  });

  test("Редактирование элемента", async () => {
    // добавляем
    await page.click(".btn-add");
    await page.type(".input-name", "Товар 1");
    await page.type(".input-price", "50");
    await page.click(".btn-save");

    // редактируем
    await page.click(".btn-edit");
    await page.focus(".input-name");
    await page.keyboard.down("Control");
    await page.keyboard.press("A");
    await page.keyboard.up("Control");
    await page.keyboard.press("Backspace");
    await page.type(".input-name", "Товар 1 - обновлённый");
    await page.click(".btn-save");

    const text = await page.$eval(
      ".table-body tr td:first-child",
      (el) => el.textContent,
    );
    expect(text).toBe("Товар 1 - обновлённый");
  });

  test("Удаление элемента", async () => {
    await page.click(".btn-add");
    await page.type(".input-name", "Товар для удаления");
    await page.type(".input-price", "70");
    await page.click(".btn-save");

    await page.click(".btn-delete");

    const rows = await page.$$eval(".table-body tr", (els) => els.length);
    expect(rows).toBe(0);
  });

  test("Валидация: пустые поля", async () => {
    await page.click(".btn-add");
    await page.click(".btn-save");

    const nameError = await page.$eval(".error-name", (el) => el.textContent);
    const priceError = await page.$eval(".error-price", (el) => el.textContent);

    expect(nameError).toBe("Введите название товара");
    expect(priceError).toBe("Введите цену товара"); // твой текст из Modal
  });

  test("Валидация: цена <= 0", async () => {
    await page.click(".btn-add");
    await page.type(".input-name", "Нулевой товар");
    await page.type(".input-price", "0");
    await page.click(".btn-save");

    const priceError = await page.$eval(".error-price", (el) => el.textContent);
    expect(priceError).toBe("Цена должна быть больше 0");
  });

  test("Валидация: цена не число", async () => {
    await page.click(".btn-add");
    await page.type(".input-name", "Невалидный товар");
    await page.type(".input-price", "abc");
    await page.click(".btn-save");

    const priceError = await page.$eval(".error-price", (el) => el.textContent);
    expect(priceError).toBe("Цена должна быть числом");
  });
});
