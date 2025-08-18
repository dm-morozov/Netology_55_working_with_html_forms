console.log("LocalStorage.ts запущен");

const formForStorage = document.querySelector(
  ".form",
) as HTMLFormElement | null;

const STORAGE_KEY = "formData";

// Загружаем данные из localStorage
function loadFormData() {
  if (!formForStorage) return;

  const savedData = localStorage.getItem(STORAGE_KEY);
  if (!savedData) return;

  try {
    const formData = JSON.parse(savedData);
    Array.from(formForStorage.elements).forEach((el) => {
      if ("name" in el && (el as HTMLInputElement).name) {
        const input = el as HTMLInputElement;
        if (formData[input.name] !== undefined) {
          input.value = formData[input.name];
        }
      }
    });
  } catch (err) {
    console.error("Ошибка чтения данных из localStorage:", err);
  }
}

// Сохраняем данные в localStorage
function saveFormData() {
  if (!formForStorage) return;

  const formData: Record<string, string> = {};

  Array.from(formForStorage.elements).forEach((el) => {
    if ("name" in el && (el as HTMLInputElement).name) {
      const input = el as HTMLInputElement;
      formData[input.name] = input.value;
    }
  });

  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

// Загружаем при старте
loadFormData();

// Сохраняем при каждом вводе
formForStorage?.addEventListener("input", saveFormData);

// Очищаем localStorage при сбросе формы
formForStorage?.addEventListener("reset", () => {
  localStorage.removeItem(STORAGE_KEY);
  console.log("Все данные формы удалены из localStorage");
});
