// modal.ts

export default class Modal {
  private modal: HTMLDivElement;
  private inputName: HTMLInputElement;
  private inputPrice: HTMLInputElement;
  private errorName: HTMLDivElement;
  private errorPrice: HTMLDivElement;
  private btnSave: HTMLButtonElement;
  private btnCancel: HTMLButtonElement;

  private onSaveCallBack: ((name: string, price: number) => void) | null = null;

  constructor(modalSelector: string) {
    this.modal = document.querySelector(modalSelector) as HTMLDivElement;
    this.inputName = this.modal.querySelector(".input-name") as HTMLInputElement;
    this.inputPrice = this.modal.querySelector(".input-price") as HTMLInputElement;
    this.errorName = this.modal.querySelector(".error-name") as HTMLDivElement;
    this.errorPrice = this.modal.querySelector(".error-price") as HTMLDivElement;
    this.btnSave = this.modal.querySelector(".btn-save") as HTMLButtonElement;
    this.btnCancel = this.modal.querySelector(".btn-cancel") as HTMLButtonElement;

    this.btnSave.addEventListener("click", () => this.handleSave());
    this.btnCancel.addEventListener("click", () => this.close());
  
        // Отслеживаем клавиши
    this.inputName.addEventListener("keydown", (e) => this.handleKeyDown(e));
    this.inputPrice.addEventListener("keydown", (e) => this.handleKeyDown(e));
  }

  open(name = "", price = "") {
    this.modal.classList.remove("hidden");
    this.inputName.value = name;
    this.inputPrice.value = price;
    this.clearErrors();
  }

  private clearErrors() {
    this.errorName.textContent = "";
    this.errorPrice.textContent = "";
  }

  private validate(): boolean {
    let isValid = true;

    this.clearErrors();
    if(!this.inputName.value.trim()) {
      this.errorName.textContent = "Введите название товара";
      isValid = false;
    }

    const price = Number(this.inputPrice.value);
    if(!this.inputPrice.value.trim()) {
      this.errorPrice.textContent = "Введите цену товара";
      isValid = false;
    } else if(isNaN(price)) {
      this.errorPrice.textContent = "Цена должна быть числом";
      isValid = false;
    } else if(price <= 0) {
      this.errorPrice.textContent = "Цена должна быть больше 0";
      isValid = false;
    }

    return isValid;
  }

  private handleSave() {
    console.log("Save");
    
    if(!this.validate()) return;

    const name = this.inputName.value;
    const price = Number(this.inputPrice.value);

    if (this.onSaveCallBack) {
      this.onSaveCallBack(name, price);
    }

    this.close();
  }

  setOnSave(callback: (name: string, price: number) => void) {
    this.onSaveCallBack = callback;
  }

  private close() {
    this.modal.classList.add("hidden");
    console.log("Close");
  }

  private handleKeyDown(event: KeyboardEvent) {
    if (event.key === "Enter") {
      this.handleSave();
    } else if (event.key === "Escape") {
      this.close();
    }
  }
}