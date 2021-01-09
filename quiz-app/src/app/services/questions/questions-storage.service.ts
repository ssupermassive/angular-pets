import { Injectable } from '@angular/core';
import { DataStorageService } from 'src/app/core';
import { IQuestion } from 'src/app/models/questions';

const QUESTIONS: IQuestion[] = [
  {
    id: 1609840155627,
    text: "Какие ключевые слова могут быть использованы для объявления переменной?",
    options: "[{\"text\":\"dim\",\"isRight\":false},{\"text\":\"var\",\"isRight\":true},{\"text\":\"const\",\"isRight\":true},{\"text\":\"let\",\"isRight\":true}]",
    publish: true,
    category: {
      id: 1,
      name: "JavaScript"
    },
    subcategory: {
      id: 11,
      name: "Переменные"
    },
    code: "",
    explanation: ""
  },
  {
    id: 1609840262731,
    text: "Каким будет результат выполнения кода?",
    options: "[{\"text\":\"NaN\",\"isRight\":false},{\"text\":\"1\",\"isRight\":true},{\"text\":\"0\",\"isRight\":false},{\"text\":\"Будет ошибка\",\"isRight\":false}]",
    publish: true,
    category: {
      id: 1,
      name: "JavaScript"
    },
    subcategory: {
      id: 12,
      name: "Приведение типов"
    },
    code: "alert(true + false)",
    explanation: ""
  },
  {
    id: 1609873155491,
    text: "Каким будет результат выполнения кода?",
    options: "[{\"text\":\"true\",\"isRight\":true},{\"text\":\"false\",\"isRight\":false},{\"text\":\"Будет ошибка\",\"isRight\":false}]",
    publish: true,
    category: {
      id: 1,
      name: "JavaScript"
    },
    subcategory: {
      id: 12,
      name: "Приведение типов"
    },
    code: "alert('1' == 1)",
    explanation: ""
  },
  {
    id: 1609873164850,
    text: "Каким будет результат выполнения кода?",
    options: "[{\"text\":\"true\",\"isRight\":false},{\"text\":\"false\",\"isRight\":true},{\"text\":\"Будет ошибка\",\"isRight\":false}]",
    publish: true,
    category: {
      id: 1,
      name: "JavaScript"
    },
    subcategory: {
      id: 12,
      name: "Приведение типов"
    },
    code: "alert('1' === 1)",
    explanation: ""
  },
  {
    id: 1609873510630,
    text: "Каким будет результат выполнения кода?",
    options: "[{\"text\":\"10\",\"isRight\":false},{\"text\":\"null\",\"isRight\":false},{\"text\":\"undefined\",\"isRight\":true},{\"text\":\"Будет ошибка\",\"isRight\":false}]",
    publish: true,
    category: {
      id: 1,
      name: "JavaScript"
    },
    subcategory: {
      id: 13,
      name: "Функции"
    },
    code: "function returnValue() {\n const value = 10;\n return\n value;\n}\n\nalert(returnValue());",
    explanation: ""
  },
  {
    id: 1609873763387,
    text: "Какие из перечисленных типов данных существуют в JavaScript?",
    options: "[{\"text\":\"String\",\"isRight\":true},{\"text\":\"Number\",\"isRight\":true},{\"text\":\"Long\",\"isRight\":false},{\"text\":\"Integer\",\"isRight\":false},{\"text\":\"null\",\"isRight\":true},{\"text\":\"Boolean\",\"isRight\":true},{\"text\":\"Char\",\"isRight\":false}]",
    publish: true,
    category: {
      id: 1,
      name: "JavaScript"
    },
    subcategory: {
      id: 14,
      name: "Типы данных"
    },
    code: "",
    explanation: ""
  },
  {
    id: 1609873858914,
    text: "Какой тип имеет число 4.56?",
    options: "[{\"text\":\"Number\",\"isRight\":true},{\"text\":\"Integer\",\"isRight\":false},{\"text\":\"Long\",\"isRight\":false},{\"text\":\"Double\",\"isRight\":false},{\"text\":\"Ни один из вышеперечисленных\",\"isRight\":false}]",
    publish: true,
    category: {
      id: 1,
      name: "JavaScript"
    },
    subcategory: {
      id: 14,
      name: "Типы данных"
    },
    code: "",
    explanation: ""
  },
  {
    id: 1609873964033,
    text: "Каким будет результат выполнения кода?",
    options: "[{\"text\":\"45\",\"isRight\":false},{\"text\":\"0\",\"isRight\":false},{\"text\":\".45\",\"isRight\":false},{\"text\":\"0.45\",\"isRight\":true},{\"text\":\"Будет ошибка\",\"isRight\":false}]",
    publish: true,
    category: {
      id: 1,
      name: "JavaScript"
    },
    subcategory: {
      id: 14,
      name: "Типы данных"
    },
    code: "alert(.45)",
    explanation: ""
  },
  {
    id: 1609874008608,
    text: "Каким будет результат выполнения кода?",
    options: "[{\"text\":\"45\",\"isRight\":false},{\"text\":\"0\",\"isRight\":false},{\"text\":\".45\",\"isRight\":false},{\"text\":\"0.45\",\"isRight\":false},{\"text\":\"Будет ошибка\",\"isRight\":true}]",
    publish: true,
    category: {
      id: 1,
      name: "JavaScript"
    },
    subcategory: {
      id: 14,
      name: "Типы данных"
    },
    code: "alert(.45)",
    explanation: ""
  },
  {
    id: 1609874086920,
    text: "Каким будет результат выполнения кода?",
    options: "[{\"text\":\"1\",\"isRight\":false},{\"text\":\"2\",\"isRight\":true},{\"text\":\"NaN\",\"isRight\":false},{\"text\":\"Будет ошибка\",\"isRight\":false}]",
    publish: true,
    category: {
      id: 1,
      name: "JavaScript"
    },
    subcategory: {
      id: 11,
      name: "Переменные"
    },
    code: "let a = 1;\na++;\nalert(a)",
    explanation: ""
  },
  {
    id: 1609874174615,
    text: "Каким будет результат выполнения кода?",
    options: "[{\"text\":\"1\",\"isRight\":false},{\"text\":\"2\",\"isRight\":false},{\"text\":\"NaN\",\"isRight\":false},{\"text\":\"Будет ошибка\",\"isRight\":true}]",
    publish: true,
    category: {
      id: 1,
      name: "JavaScript"
    },
    subcategory: {
      id: 11,
      name: "Переменные"
    },
    code: "const a = 1;\na++;\nalert(a)",
    explanation: ""
  },
  {
    id: 1609874458772,
    text: "Каким будет результат выполнения кода?",
    options: "[{\"text\":\"\\\"Hello\\\"\",\"isRight\":true},{\"text\":\"null\",\"isRight\":false},{\"text\":\"undefined\",\"isRight\":false},{\"text\":\"Будет ошибка\",\"isRight\":false}]",
    publish: true,
    category: {
      id: 1,
      name: "JavaScript"
    },
    subcategory: {
      id: 15,
      name: "Замыкание"
    },
    code: "const a = \"Hello\";\n\nfunction alertA() {\n alert(a);\n}\n\nalertA();",
    explanation: ""
  },
  {
    id: 1609874494938,
    text: "Каким будет результат выполнения кода?",
    options: "[{\"text\":\"\\\"Hello\\\"\",\"isRight\":false},{\"text\":\"null\",\"isRight\":false},{\"text\":\"undefined\",\"isRight\":false},{\"text\":\"Будет ошибка\",\"isRight\":true}]",
    publish: true,
    category: {
      id: 1,
      name: "JavaScript"
    },
    subcategory: {
      id: 15,
      name: "Замыкание"
    },
    code: "const a = \"Hello\";\n\nfunction alertA() {\n const a;\n alert(a);\n}\n\nalertA();",
    explanation: ""
  },
  {
    id: 1609874524058,
    text: "Каким будет результат выполнения кода?",
    options: "[{\"text\":\"\\\"Hello\\\"\",\"isRight\":false},{\"text\":\"Hi\",\"isRight\":true},{\"text\":\"null\",\"isRight\":false},{\"text\":\"undefined\",\"isRight\":false},{\"text\":\"Будет ошибка\",\"isRight\":false}]",
    publish: true,
    category: {
      id: 1,
      name: "JavaScript"
    },
    subcategory: {
      id: 15,
      name: "Замыкание"
    },
    code: "const a = \"Hello\";\n\nfunction alertA() {\n const a = \"Hi\";\n alert(a);\n}\n\nalertA();",
    explanation: ""
  },
  {
    id: 1609874558729,
    text: "Каким будет результат выполнения кода?",
    options: "[{\"text\":\"\\\"Hello\\\"\",\"isRight\":false},{\"text\":\"Hi\",\"isRight\":false},{\"text\":\"null\",\"isRight\":false},{\"text\":\"undefined\",\"isRight\":true},{\"text\":\"Будет ошибка\",\"isRight\":false}]",
    publish: true,
    category: {
      id: 1,
      name: "JavaScript"
    },
    subcategory: {
      id: 15,
      name: "Замыкание"
    },
    code: "const a = \"Hello\";\n\nfunction alertA() {\n let a;\n alert(a);\n}\n\nalertA();",
    explanation: ""
  },
  {
    id: 1609875383146,
    text: "Какое значение свойства display имеют блочные элементы?",
    options: "[{\"text\":\"inline\",\"isRight\":false},{\"text\":\"inline-block\",\"isRight\":false},{\"text\":\"flex\",\"isRight\":false},{\"text\":\"block\",\"isRight\":true}]",
    publish: true,
    category: {
      id: 3,
      name: "CSS3"
    },
    subcategory: {
      id: 33,
      name: "Свойство display"
    },
    code: "",
    explanation: ""
  },
  {
    id: 1609875401722,
    text: "Какое значение свойства display имеют строчные элементы?",
    options: "[{\"text\":\"inline\",\"isRight\":true},{\"text\":\"inline-block\",\"isRight\":false},{\"text\":\"flex\",\"isRight\":false},{\"text\":\"block\",\"isRight\":false}]",
    publish: true,
    category: {
      id: 3,
      name: "CSS3"
    },
    subcategory: {
      id: 33,
      name: "Свойство display"
    },
    code: "",
    explanation: ""
  },
  {
    id: 1609875452784,
    text: "Какое значение по умолчанию имеет свойство position?",
    options: "[{\"text\":\"absolute\",\"isRight\":false},{\"text\":\"relative\",\"isRight\":false},{\"text\":\"sticky\",\"isRight\":false},{\"text\":\"static\",\"isRight\":true}]",
    publish: true,
    category: {
      id: 3,
      name: "CSS3"
    },
    subcategory: {
      id: 31,
      name: "Позиционирование"
    },
    code: "",
    explanation: ""
  },
  {
    id: 1609875501704,
    text: "При каком значении свойства position элемент считается позиционированным? Выберите все подходящие варианты",
    options: "[{\"text\":\"absolute\",\"isRight\":true},{\"text\":\"relative\",\"isRight\":true},{\"text\":\"sticky\",\"isRight\":true},{\"text\":\"static\",\"isRight\":false}]",
    publish: true,
    category: {
      id: 3,
      name: "CSS3"
    },
    subcategory: {
      id: 31,
      name: "Позиционирование"
    },
    code: "",
    explanation: ""
  },
  {
    id: 1609875784293,
    text: "Размер одного пикселя равен...",
    options: "[{\"text\":\"1мм\",\"isRight\":false},{\"text\":\"0.33мм\",\"isRight\":false},{\"text\":\"Зависит от параметров экрана\",\"isRight\":true}]",
    publish: true,
    category: {
      id: 3,
      name: "CSS3"
    },
    subcategory: {
      id: 32,
      name: "Единицы измерения"
    },
    code: "",
    explanation: ""
  },
  {
    id: 1609875916883,
    text: "Какая единица измерения задает размер относительно размера шрифта элемента html?",
    options: "[{\"text\":\"px\",\"isRight\":false},{\"text\":\"vh\",\"isRight\":false},{\"text\":\"vw\",\"isRight\":false},{\"text\":\"rem\",\"isRight\":true},{\"text\":\"em\",\"isRight\":false}]",
    publish: true,
    category: {
      id: 3,
      name: "CSS3"
    },
    subcategory: {
      id: 32,
      name: "Единицы измерения"
    },
    code: "",
    explanation: ""
  },
  {
    id: 1609875952427,
    text: "Какое свойство отвечает за внешние отступы элемента?",
    options: "[{\"text\":\"padding\",\"isRight\":false},{\"text\":\"margin\",\"isRight\":true},{\"text\":\"offset\",\"isRight\":false}]",
    publish: true,
    category: {
      id: 3,
      name: "CSS3"
    },
    subcategory: {
      id: 34,
      name: "Отступы"
    },
    code: "",
    explanation: ""
  },
  {
    id: 1609875964610,
    text: "Какое свойство отвечает за внутренние отступы элемента?",
    options: "[{\"text\":\"padding\",\"isRight\":true},{\"text\":\"margin\",\"isRight\":false},{\"text\":\"offset\",\"isRight\":false}]",
    publish: true,
    category: {
      id: 3,
      name: "CSS3"
    },
    subcategory: {
      id: 34,
      name: "Отступы"
    },
    code: "",
    explanation: ""
  },
  {
    id: 1609876048362,
    text: "Какое значение свойства display имеют тег span по умолчанию?",
    options: "[{\"text\":\"inline\",\"isRight\":true},{\"text\":\"inline-block\",\"isRight\":false},{\"text\":\"flex\",\"isRight\":false},{\"text\":\"block\",\"isRight\":false}]",
    publish: true,
    category: {
      id: 3,
      name: "CSS3"
    },
    subcategory: {
      id: 33,
      name: "Свойство display"
    },
    code: "",
    explanation: ""
  },
  {
    id: 1609876060114,
    text: "Какое значение свойства display имеют тег div по умолчанию?",
    options: "[{\"text\":\"inline\",\"isRight\":false},{\"text\":\"inline-block\",\"isRight\":false},{\"text\":\"flex\",\"isRight\":false},{\"text\":\"block\",\"isRight\":true}]",
    publish: true,
    category: {
      id: 3,
      name: "CSS3"
    },
    subcategory: {
      id: 33,
      name: "Свойство display"
    },
    code: "",
    explanation: ""
  },
  {
    id: 1609876092857,
    text: "Какое значение свойства display имеют тег img по умолчанию?",
    options: "[{\"text\":\"inline\",\"isRight\":true},{\"text\":\"inline-block\",\"isRight\":false},{\"text\":\"flex\",\"isRight\":false},{\"text\":\"block\",\"isRight\":false}]",
    publish: true,
    category: {
      id: 3,
      name: "CSS3"
    },
    subcategory: {
      id: 33,
      name: "Свойство display"
    },
    code: "",
    explanation: ""
  },
  {
    id: 1609876145872,
    text: "Какое свойство отвечает за порядок наложения элементов друг на друга?",
    options: "[{\"text\":\"float\",\"isRight\":false},{\"text\":\"z-index\",\"isRight\":true},{\"text\":\"order\",\"isRight\":false},{\"text\":\"z-order\",\"isRight\":false},{\"text\":\"position\",\"isRight\":false}]",
    publish: true,
    category: {
      id: 3,
      name: "CSS3"
    },
    subcategory: {
      id: 36,
      name: "Свойство z - index"
    },
    code: "",
    explanation: ""
  },
  {
    id: 1609876195312,
    text: "Какая единица измерения задает размер относительно размера шрифта родительского элемента?",
    options: "[{\"text\":\"px\",\"isRight\":false},{\"text\":\"vh\",\"isRight\":false},{\"text\":\"vw\",\"isRight\":false},{\"text\":\"rem\",\"isRight\":false},{\"text\":\"em\",\"isRight\":true}]",
    publish: true,
    category: {
      id: 3,
      name: "CSS3"
    },
    subcategory: {
      id: 32,
      name: "Единицы измерения"
    },
    code: "",
    explanation: ""
  },
  {
    id: 1609876236905,
    text: "Какие из перечисленных единиц измерения являются относительными?",
    options: "[{\"text\":\"px\",\"isRight\":false},{\"text\":\"vh\",\"isRight\":true},{\"text\":\"vw\",\"isRight\":true},{\"text\":\"rem\",\"isRight\":true},{\"text\":\"em\",\"isRight\":true}]",
    publish: true,
    category: {
      id: 3,
      name: "CSS3"
    },
    subcategory: {
      id: 32,
      name: "Единицы измерения"
    },
    code: "",
    explanation: ""
  },
  {
    id: 1609876427662,
    text: "Какое свойство отвечает за \"жадность\" flex- элемента?",
    options: "[{\"text\":\"flex-grow\",\"isRight\":true},{\"text\":\"flex-shrink\",\"isRight\":false},{\"text\":\"order\",\"isRight\":false},{\"text\":\"flex-wrap\",\"isRight\":false}]",
    publish: true,
    category: {
      id: 3,
      name: "CSS3"
    },
    subcategory: {
      id: 35,
      name: "Flexbox"
    },
    code: "",
    explanation: ""
  },
  {
    id: 1609877713556,
    text: "Какой тег служит для описания цитаты на веб - странице?",
    options: "[{\"text\":\"<div>\",\"isRight\":false},{\"text\":\"<citate>\",\"isRight\":false},{\"text\":\"<blockquote>\",\"isRight\":true},{\"text\":\"<span>\",\"isRight\":false}]",
    publish: true,
    category: {
      id: 2,
      name: "HTML5"
    },
    subcategory: {
      id: 21,
      name: "Теги"
    },
    code: "",
    explanation: ""
  },
  {
    id: 1609877768360,
    text: "Какой тег служит для создания ссылки?",
    options: "[{\"text\":\"<i>\",\"isRight\":false},{\"text\":\"<link>\",\"isRight\":false},{\"text\":\"<a>\",\"isRight\":true},{\"text\":\"<p>\",\"isRight\":false}]",
    publish: true,
    category: {
      id: 2,
      name: "HTML5"
    },
    subcategory: {
      id: 21,
      name: "Теги"
    },
    code: "",
    explanation: ""
  },
  {
    id: 1609877794640,
    text: "Какой тег служит для описания заголовка веб - страницы?",
    options: "[{\"text\":\"<head>\",\"isRight\":false},{\"text\":\"<title>\",\"isRight\":true},{\"text\":\"<h1>\",\"isRight\":false},{\"text\":\"<header>\",\"isRight\":false}]",
    publish: true,
    category: {
      id: 2,
      name: "HTML5"
    },
    subcategory: {
      id: 21,
      name: "Теги"
    },
    code: "",
    explanation: ""
  },
  {
    id: 1609877818840,
    text: "Какой тег предназначен для обозначения содержимого веб- страницы?",
    options: "[{\"text\":\"<main>\",\"isRight\":false},{\"text\":\"<body>\",\"isRight\":true},{\"text\":\"<html>\",\"isRight\":false},{\"text\":\"<doc>\",\"isRight\":false}]",
    publish: true,
    category: {
      id: 2,
      name: "HTML5"
    },
    subcategory: {
      id: 21,
      name: "Теги"
    },
    code: "",
    explanation: ""
  },
  {
    id: 1609877846087,
    text: "Какой тег является корневым тегом html - страницы?",
    options: "[{\"text\":\"<main>\",\"isRight\":false},{\"text\":\"<body>\",\"isRight\":false},{\"text\":\"<html>\",\"isRight\":true},{\"text\":\"<doc>\",\"isRight\":false}]",
    publish: true,
    category: {
      id: 2,
      name: "HTML5"
    },
    subcategory: {
      id: 21,
      name: "Теги"
    },
    code: "",
    explanation: ""
  },
  {
    id: 1609877870591,
    text: "Какой тег служит для описания столбца таблицы?",
    options: "[{\"text\":\"<td>\",\"isRight\":true},{\"text\":\"<tcol>\",\"isRight\":false},{\"text\":\"<tr>\",\"isRight\":false},{\"text\":\"<trow>\",\"isRight\":false},{\"text\":\"<col>\",\"isRight\":false}]",
    publish: true,
    category: {
      id: 2,
      name: "HTML5"
    },
    subcategory: {
      id: 22,
      name: "Таблицы"
    },
    code: "",
    explanation: ""
  },
  {
    id: 1609877886078,
    text: "Какой тег служит для описания строки таблицы?",
    options: "[{\"text\":\"<td>\",\"isRight\":false},{\"text\":\"<tcol>\",\"isRight\":false},{\"text\":\"<tr>\",\"isRight\":true},{\"text\":\"<trow>\",\"isRight\":false},{\"text\":\"<col>\",\"isRight\":false}]",
    publish: true,
    category: {
      id: 2,
      name: "HTML5"
    },
    subcategory: {
      id: 22,
      name: "Таблицы"
    },
    code: "",
    explanation: ""
  },
  {
    id: 1609877924813,
    text: "Какие из перечисленных тегов используются для описания таблицы?",
    options: "[{\"text\":\"<table>\",\"isRight\":true},{\"text\":\"<grid>\",\"isRight\":false},{\"text\":\"<tr>\",\"isRight\":true},{\"text\":\"<td>\",\"isRight\":true},{\"text\":\"<body>\",\"isRight\":true},{\"text\":\"<div>\",\"isRight\":false}]",
    publish: true,
    category: {
      id: 2,
      name: "HTML5"
    },
    subcategory: {
      id: 22,
      name: "Таблицы"
    },
    code: "",
    explanation: ""
  },
  {
    id: 1609877945125,
    text: "Какой тег используется для определения отдельного элемента списка?",
    options: "[{\"text\":\"<li>\",\"isRight\":true},{\"text\":\"<ol>\",\"isRight\":false},{\"text\":\"<ul>\",\"isRight\":false},{\"text\":\"<listitem>\",\"isRight\":false}]",
    publish: true,
    category: {
      id: 2,
      name: "HTML5"
    },
    subcategory: {
      id: 21,
      name: "Теги"
    },
    code: "",
    explanation: ""
  },
  {
    id: 1609877966173,
    text: "Какой тег используется для создания маркированного списка?",
    options: "[{\"text\":\"<li>\",\"isRight\":false},{\"text\":\"<ol>\",\"isRight\":false},{\"text\":\"<ul>\",\"isRight\":true},{\"text\":\"<list>\",\"isRight\":false}]",
    publish: true,
    category: {
      id: 2,
      name: "HTML5"
    },
    subcategory: {
      id: 21,
      name: "Теги"
    },
    code: "",
    explanation: ""
  },
  {
    id: 1609877992820,
    text: "Какой тег используется для создания нумерованного списка?",
    options: "[{\"text\":\"<li>\",\"isRight\":false},{\"text\":\"<ol>\",\"isRight\":true},{\"text\":\"<ul>\",\"isRight\":false},{\"text\":\"<list>\",\"isRight\":false}]",
    publish: true,
    category: {
      id: 2,
      name: "HTML5"
    },
    subcategory: {
      id: 21,
      name: "Теги"
    },
    code: "",
    explanation: ""
  },
  {
    id: 1609878027292,
    text: "Строчные элементы...",
    options: "[{\"text\":\"Занимают всю доступную ширину\",\"isRight\":false},{\"text\":\"Подстраиваются под размер содержимого\",\"isRight\":true},{\"text\":\"Могут содержать внутри себя только текст и другие строчные элементы\",\"isRight\":true},{\"text\":\"Всегда начинаются с новой строки\",\"isRight\":false}]",
    publish: true,
    category: {
      id: 2,
      name: "HTML5"
    },
    subcategory: {
      id: 23,
      name: "Типы элементов"
    },
    code: "",
    explanation: ""
  },
  {
    id: 1609878053597,
    text: "Блочные элементы:",
    options: "[{\"text\":\"Занимают всю доступную ширину\",\"isRight\":true},{\"text\":\"Подстраиваются под размер содержимого\",\"isRight\":false},{\"text\":\"Могут содержать внутри себя только текст и другие строчные элементы\",\"isRight\":false},{\"text\":\"Всегда начинаются с новой строки\",\"isRight\":true}]",
    publish: true,
    category: {
      id: 2,
      name: "HTML5"
    },
    subcategory: {
      id: 23,
      name: "Типы элементов"
    },
    code: "",
    explanation: ""
  },
  {
    id: 1609878077171,
    text: "Какой тег устанавливает перевод строки?",
    options: "[{\"text\":\"<p>\",\"isRight\":false},{\"text\":\"<br>\",\"isRight\":true},{\"text\":\"<em>\",\"isRight\":false},{\"text\":\"<hr>\",\"isRight\":false}]",
    publish: true,
    category: {
      id: 2,
      name: "HTML5"
    },
    subcategory: {
      id: 23,
      name: "Типы элементов"
    },
    code: "",
    explanation: ""
  },
  {
    id: 1609878100852,
    text: "Какие из перечисленных элементов являются блочными?",
    options: "[{\"text\":\"<div>\",\"isRight\":true},{\"text\":\"<span>\",\"isRight\":false},{\"text\":\"<img>\",\"isRight\":false},{\"text\":\"<h1>\",\"isRight\":true}]",
    publish: true,
    category: {
      id: 2,
      name: "HTML5"
    },
    subcategory: {
      id: 23,
      name: "Типы элементов"
    },
    code: "",
    explanation: ""
  }
]

@Injectable({
  providedIn: 'root'
})
export class QuestionsStorageService extends DataStorageService<IQuestion> {
  constructor() {
    super(QUESTIONS, 'FT_QUESTIONS_DATA')
  }
}
