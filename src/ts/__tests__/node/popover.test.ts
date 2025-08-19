// popover.test.ts
/**
 * @jest-environment jsdom
 */

import Popover from "../../popover";

describe("Проверка popover", () => {
  let button: HTMLElement;

  beforeEach(() => {
    document.body.innerHTML = `<button class="btn-popover">Нажми меня</button>`;
    button = document.querySelector(".btn-popover") as HTMLElement;
  });

  test("popover появляется при клике", () => {
    new Popover(button, "Заголовок", "Текст внутри всплывающего сообщения.");

    button.click(); // имитируем клик по кнопке

    const popover = document.querySelector(".popover");
    expect(popover).not.toBeNull(); // Должен существовать
    expect(popover?.textContent).toContain("Заголовок");
    expect(popover?.textContent).toContain(
      "Текст внутри всплывающего сообщения.",
    );
  });

  test("popover скрывается при повторном клике", () => {
    new Popover(button, "Заголовок", "Текст");

    // два клика
    button.click();
    button.click();

    const popover = document.querySelector(".popover");
    expect(popover).toBeNull();
  });

  // тесты для защитных return
  test("повторный вызов show() ничего не ломает", () => {
    const pop = new Popover(button, "Title", "Content");
    pop["show"](); // первый вызов
    const firstPopover = document.querySelector(".popover");
    expect(firstPopover).not.toBeNull();

    pop["show"](); // второй вызов должен просто вернуть и не создать новый
    const allPopovers = document.querySelectorAll(".popover");
    expect(allPopovers.length).toBe(1); // только один popover
  });

  test("вызов hide() без show() не ломает", () => {
    const pop = new Popover(button, "Title", "Content");

    // hide() до show() должен просто вернуть
    expect(() => pop["hide"]()).not.toThrow(); // не выбрасывает исключение

    button.click();
    const popover = document.querySelector(".popover");
    expect(popover).not.toBeNull();
  });
});
