export default class Popover {
  private element: HTMLElement;
  private title: string;
  private content: string;
  private popover: HTMLElement | null = null;

  constructor(element: HTMLElement, title: string, content: string) {
    this.element = element;
    this.title = title;
    this.content = content;

    this.init();
  }

  private init() {
    this.element.addEventListener("click", () => {
      if (this.popover) return this.hide();
      this.show();
    });
  }

  private show() {
    if (this.popover) return;
    console.log("Привет");

    this.popover = document.createElement("div");
    this.popover.classList.add("popover");

    this.popover.innerHTML = `
      <div class="popover-title">${this.title}</div>
      <div class="popover-content">${this.content}</div>
      <div class="popover-arrow"></div>
    `;

    document.body.appendChild(this.popover);
    this.popover.style.position = "absolute";

    const elementPosition = this.element.getBoundingClientRect();
    const popoverPosition = this.popover.getBoundingClientRect();

    // Позицианируем наш popover
    this.popover.style.top = `${elementPosition.top - popoverPosition.height - 10 + window.scrollY}px`;
    this.popover.style.left = `${elementPosition.left + elementPosition.width / 2 - popoverPosition.width / 2 + window.scrollX}px`;
    console.log(
      elementPosition.left,
      elementPosition.width / 2,
      popoverPosition.width / 2,
      window.scrollX,
    );

    // позиционируем стрелочку
    const arrow = this.popover.querySelector(
      ".popover-arrow",
    ) as HTMLElement | null;
    if (arrow) {
      const arrowLeft =
        elementPosition.left +
        elementPosition.width / 2 -
        (this.popover.getBoundingClientRect().left + 6); // 6px = половина ширины стрелки
      arrow.style.left = `${arrowLeft}px`;
    }
  }

  private hide() {
    if (!this.popover) return;
    console.log("Пока");
    this.popover?.remove();
    this.popover = null;
  }
}
