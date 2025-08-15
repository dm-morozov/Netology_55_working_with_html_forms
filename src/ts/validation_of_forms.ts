// Кастомные сообщения для каждого поля
const errors: { [inputName: string]: { [key: string]: string } } = {
  login: {
    valueMissing: "Введите свое имя"
  },
  email: {
    valueMissing: "Введите свой email",
    typeMismatch: "Введите корректный email"
  },
  "credit-card": {
    valueMissing: "Нужно ввести свою банковскую карту",
    patternMismatch: "Номер карты должен состоять из 16 цифр"
  }
};

const form = document.querySelector(".form") as HTMLFormElement | null;

form?.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!form) return;

  let formIsValid = true;

  // Перебираем все элементы формы
  Array.from(form.elements).forEach((el) => {
    if ("validity" in el && (el as HTMLInputElement).name) {
      const input = el as HTMLInputElement;
      const validity = input.validity;

      // Сбрасываем старые сообщения
      input.setCustomValidity("");

      // Проверяем каждое свойство validity
      for (const key in validity) {
        if (key === "valid") continue;
        if ((validity as any)[key]) {
          const msg = errors[input.name]?.[key];
          if (msg) {
            input.setCustomValidity(msg);
            formIsValid = false;
            break; // Выходим, если нашли ошибку
          }
        }
      }
    }
  });

  if (formIsValid) {
    console.log("Форма валидна, отправляем данные");
    // Здесь можно отправить fetch(...)
  } else {
    form.reportValidity(); // Покажет наши кастомные сообщения
  }
});
