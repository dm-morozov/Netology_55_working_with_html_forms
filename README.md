# Работа с HTML-формами и Popover на чистом JS

[![Build status](https://ci.appveyor.com/api/projects/status/awc042krfial5vnh?svg=true)](https://ci.appveyor.com/project/dm-morozov/netology-55-working-with-html-forms)
![CI](https://github.com/dm-morozov/Netology_55_working_with_html_forms/actions/workflows/web.yaml/badge.svg)
![Netology](https://img.shields.io/badge/TypeScript-JavaScript-blue)

Демонстрация работы с HTML-формами, валидации, кешированием данных через LocalStorage и реализацией виджета Popover без использования jQuery или Bootstrap.  

Проект собран с использованием Webpack и полностью готов к публикации на GitHub Pages.  

---

## ⚡ Функционал

1. **Валидация формы**  
   - Кастомные сообщения для каждого поля (`login`, `email`, `credit-card`).  
   - Проверка `required`, `typeMismatch` и `patternMismatch`.

2. **LocalStorage**  
   - Автоматическое сохранение введённых данных при вводе.  
   - При перезагрузке страницы данные остаются в полях.  
   - При сбросе формы данные очищаются из LocalStorage.

3. **Popover на чистом JS**  
   - Появляется при клике на кнопку.  
   - Заголовок и текст.  
   - Маленькая стрелка указывает на кнопку.  
   - Скрывается при повторном клике.  
   - Позиционируется по центру кнопки.

4. **Тестирование**  
   - Автотесты написаны на Jest с использованием `jsdom`.  
   - Проверка появления и скрытия Popover.  
   - Покрыты защитные условия `if (this.popover)` и `if (!this.popover)`.

---

## 🚀 Запуск проекта

1. Клонируйте репозиторий:

```bash
git clone https://github.com/<твое_имя_пользователя>/<название_репозитория>.git
cd <название_репозитория>
````

2. Установите зависимости:

```bash
yarn install
```

3. Сборка проекта:

```bash
yarn build
```

4. Локальный запуск для разработки:

```bash
yarn dev
```

5. Запуск тестов:

```bash
yarn test
```

---

## 🌐 Ссылка на GitHub Pages

[Попробовать демо](https://dm-morozov.github.io/Netology_55_working_with_html_forms/)

---

## 📧 Контакты

Если возникнут вопросы, пишите:

* ![LinkedIn](./svg/linkedin-icon.svg) [LinkedIn](https://www.linkedin.com/in/dm-morozov/)
* ![Telegram](./svg/telegram.svg) [Telegram](https://t.me/dem2014)
* ![GitHub](./svg/github-icon.svg) [GitHub](https://github.com/dm-morozov/)

---

## 📝 Примечания

* Все стили написаны вручную, без использования Bootstrap.
* Popover реализован полностью на чистом JS.
* Проект использует TypeScript и Webpack.
