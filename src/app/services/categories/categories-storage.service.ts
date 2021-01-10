import { Injectable, Inject } from '@angular/core';
import { DataStorageService } from 'src/app/core';
import { ICategory } from 'src/app/models/categories';
import { IEnvironment, ENV_TOKEN } from 'src/environments';

function getData(imagesPath: string) {
  return [
    {
      id: 1,
      name: 'JavaScript',
      description: 'JavaScript — мультипарадигменный язык программирования. Поддерживает объектно-ориентированный, императивный и функциональный стили. Является реализацией стандарта ECMAScript',
      publish: true,
      itemType: true,
      parent: null,
      service: true,
      image: `${imagesPath}/js.jpeg`
    },
    {
      id: 11,
      name: 'Переменные',
      description: '',
      publish: true,
      itemType: false,
      parent: 1,
      service: true,
    },
    {
      id: 12,
      name: 'Приведение типов',
      description: '',
      publish: true,
      itemType: false,
      parent: 1,
      service: true,
    },
    {
      id: 13,
      name: 'Функции',
      description: '',
      publish: true,
      itemType: false,
      parent: 1,
      service: true,
    },
    {
      id: 14,
      name: 'Типы данных',
      description: '',
      publish: true,
      itemType: false,
      parent: 1,
      service: true,
    },
    {
      id: 15,
      name: 'Замыкание',
      description: '',
      publish: true,
      itemType: false,
      parent: 1,
      service: true,
    },
    {
      id: 2,
      name: 'HTML5',
      description: 'HTML (HyperText Markup Language, язык разметки гипертекста) — это система верстки, которая определяет, как и какие элементы должны располагаться на веб-странице. Информация на сайте, способ ее представления и оформления зависят исключительно от разработчика и тех целей, которые он перед собой ставит.',
      publish: true,
      itemType: true,
      parent: null,
      service: true,
      image: `${imagesPath}/html.jpg`
    },
    {
      id: 21,
      name: 'Теги',
      description: '',
      publish: true,
      itemType: false,
      parent: 2,
      service: true,
    },
    {
      id: 22,
      name: 'Таблицы',
      description: '',
      publish: true,
      itemType: false,
      parent: 2,
      service: true,
    },
    {
      id: 23,
      name: 'Типы элементов',
      description: '',
      publish: true,
      itemType: false,
      parent: 2,
      service: true,
    },
    {
      id: 3,
      name: 'CSS3',
      description: 'Стилем или CSS (Cascading Style Sheets, каскадные таблицы стилей) называется набор параметров форматирования, который применяется к элементам документа, чтобы изменить их внешний вид',
      publish: true,
      itemType: true,
      parent: null,
      service: true,
      image: `${imagesPath}/css.jpg`
    },
    {
      id: 31,
      name: 'Позиционирование',
      description: '',
      publish: true,
      itemType: false,
      parent: 3,
      service: true,
    },
    {
      id: 32,
      name: 'Единицы измерения',
      description: '',
      publish: true,
      itemType: false,
      parent: 3,
      service: true,
    },
    {
      id: 33,
      name: 'Свойство display',
      description: '',
      publish: true,
      itemType: false,
      parent: 3,
      service: true,
    },
    {
      id: 34,
      name: 'Отступы',
      description: '',
      publish: true,
      itemType: false,
      parent: 3,
      service: true,
    },
    {
      id: 35,
      name: 'Flexbox',
      description: '',
      publish: true,
      itemType: false,
      parent: 3,
      service: true,
    },
    {
      id: 36,
      name: 'Свойство z - index',
      description: '',
      publish: true,
      itemType: false,
      parent: 3,
      service: true,
    }
  ]
};

@Injectable({
  providedIn: 'root'
})
export class CategoriesStorageService extends DataStorageService<ICategory> {
  constructor(@Inject(ENV_TOKEN) private environment: IEnvironment ) {
    super(getData(environment.imagesPath), 'FT_CATEGORIES_DATA');
  }
}
