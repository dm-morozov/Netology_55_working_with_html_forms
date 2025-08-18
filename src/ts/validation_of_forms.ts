// Кастомные сообщения для каждого поля
const errors: {
  [inputName: string]: { [key in keyof ValidityState]?: string };
} = {
  login: {
    valueMissing: "Введите свое имя",
  },
  email: {
    valueMissing: "Введите свой email",
    typeMismatch: "Введите корректный email",
  },
  "credit-card": {
    valueMissing: "Нужно ввести свою банковскую карту",
    patternMismatch: "Номер карты должен состоять из 16 цифр",
  },
};

const form = document.querySelector(".form") as HTMLFormElement | null;

form?.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!form) return;

  let formIsValid = true;

  Array.from(form.elements).forEach((el) => {
    if ("validity" in el && (el as HTMLInputElement).name) {
      const input = el as HTMLInputElement;
      const validity: ValidityState = input.validity;

      // Сбрасываем старые сообщения
      input.setCustomValidity("");

      // Перечисляем ключи ValidityState
      const validityKeys: (keyof ValidityState)[] = [
        "badInput",
        "customError",
        "patternMismatch",
        "rangeOverflow",
        "rangeUnderflow",
        "stepMismatch",
        "tooLong",
        "tooShort",
        "typeMismatch",
        "valueMissing",
      ];

      for (const key of validityKeys) {
        if (validity[key]) {
          const msg = errors[input.name]?.[key];
          if (msg) {
            input.setCustomValidity(msg);
            formIsValid = false;
            break;
          }
        }
      }
    }
  });

  if (formIsValid) {
    console.log("Форма валидна, отправляем данные");
  } else {
    form.reportValidity(); // Покажет кастомные сообщения
  }
});
