import { Injectable } from '@angular/core';
import { DataStorageService } from 'src/app/core';
import { ICategory } from 'src/app/models/categories';

const CATEGORIES = [
  {
    id: 1,
    name: 'JavaScript',
    description: '',
    publish: true,
    itemType: true,
    parent: null,
    service: true,
    image: '../images/js.jpeg'
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
    description: '',
    publish: true,
    itemType: true,
    parent: null,
    service: true,
    image: '../images/html.jpg'
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
    description: '',
    publish: true,
    itemType: true,
    parent: null,
    service: true,
    image: '../images/css.jpg'
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
];

@Injectable({
  providedIn: 'root'
})
export class CategoriesStorageService extends DataStorageService<ICategory> {
  constructor() {
    super(CATEGORIES, 'FT_CATEGORIES_DATA');
  }
}
