// main.ts

import "./validation_of_forms";
import "./LocalStorage";
import Popover from "./popover";
import Modal from "./modal";
import ItemManager from "./itemManager";


console.log("main.ts");

document.addEventListener("DOMContentLoaded", () => {
  const buttonPopover = document.querySelector(".btn-popover") as HTMLElement;
  new Popover(
    buttonPopover,
    "Заголовок",
    "Текст внутри всплывающего сообщения.",
  );
});


// Редактор списка* (задача со звёздочкой)
const modal = new Modal(".modal");
const itemManager = new ItemManager(".table-body", modal);
const btnAdd = document.querySelector(".btn-add") as HTMLButtonElement;
btnAdd.addEventListener("click", () => itemManager.addNew());
