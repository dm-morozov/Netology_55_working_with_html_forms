import "./validation_of_forms";
import "./LocalStorage";
import Popover from "./popover";

console.log("main.ts");

document.addEventListener("DOMContentLoaded", () => {
  const buttonPopover = document.querySelector(".btn-popover") as HTMLElement;
  new Popover(
    buttonPopover,
    "Заголовок",
    "Текст внутри всплывающего сообщения.",
  );
});
