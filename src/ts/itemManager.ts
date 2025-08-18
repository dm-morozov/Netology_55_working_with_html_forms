// itemManager.ts

import { Item } from "./interface";
import Modal from "./modal";


export default class ItemManager {
  private items: Item[] = [];
  private tableBody: HTMLTableSectionElement;
  private modal: Modal;
  private editItemId: number | null = null; // id редактируемого элемента


  constructor(tableSelector: string, modal: Modal) {
    this.tableBody = document.querySelector(tableSelector) as HTMLTableSectionElement;
    this.modal = modal;

    // callback модалки
    this.modal.setOnSave((name: string, price: number) => {
      if (this.editItemId) {
        this.updateItem(this.editItemId, name, price);
      } else {
        this.addItem(name, price);
      }
    });

    this.tableBody.addEventListener("click", (event) => this.handleTableClick(event));
  
    // загружаем сохранённые данные при инициализации
    this.loadFromStorage();
    this.render();
  }

  private updateItem(id: number, name: string, price: number) {
    const item = this.items.find((it) => it.id === id);
    if (!item) return;

    item.name = name;
    item.price = price;
    this.render();
    this.editItemId = null; // сбрасываем после редактирования
    this.saveToStorage();
  }

  private addItem(name: string, price: number) {
    const item: Item = {
      id: Date.now(),
      name,
      price,
    };

    this.items.push(item);

    this.render();
    this.saveToStorage();
  }

  private render() {
    this.tableBody.innerHTML = "";

    this.items.forEach(item => {
      const row = document.createElement("tr");
      row.dataset.id = String(item.id);

      row.innerHTML = `
        <td>${item.name}</td>
        <td>${item.price}</td>
        <td>
          <button class="btn-edit">✎</button>
          <button class="btn-delete">✕</button>
        </td>
      `;

      this.tableBody.append(row);
    });
  }

  addNew() {
    this.editItemId = null; // новый элемент — без id
    this.modal.open();
  }

  private deleteItem(id: number) {
    this.items = this.items.filter((it) => it.id !== id);
    this.render();
    this.saveToStorage();
  }

  private handleTableClick(event: Event) {
    const target = event.target as HTMLElement;
    const row = target.closest("tr") as HTMLTableRowElement;
    if (!row) return;
    const id = Number(row.dataset.id);

    if (target.classList.contains("btn-delete")) {
      this.deleteItem(id);
    }

    if (target.classList.contains("btn-edit")) {
      const item = this.items.find((it) => it.id === id);
      if (!item) return;
      this.editItemId = id;
      this.modal.open(item.name, String(item.price));
    }
  }


  private saveToStorage() {
    localStorage.setItem("items", JSON.stringify(this.items));
  }

  private loadFromStorage() {
    const data = localStorage.getItem("items");
    this.items = data ? JSON.parse(data) : [];
  }
}

