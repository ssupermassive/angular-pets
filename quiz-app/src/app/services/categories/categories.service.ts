import { Injectable, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ICategory, ICategoryQueryFilter } from 'src/app/models/categories';
import { LocalStorageService } from 'src/app/core';

const LOCAL_STORAGE_TOKEN = 'FT_CATEGORIES_DATA';

const CATEGORIES = [
  {
    id: 1,
    name: 'JavaScript',
    description: '',
    publish: true,
    itemType: false,
    parent: null,
    service: true,
  }
];

/**
 * Сервис для работы с категориями
 * @author Серпаков С.А.
 */

@Injectable()
export class CategoriesService implements OnInit {

  constructor(private localStorage: LocalStorageService) { }

  private data: ICategory[] = CATEGORIES;

  ngOnInit() {
    const storageData = this.localStorage.getItem(LOCAL_STORAGE_TOKEN);

    if (storageData) {
      this.data = storageData;
      return;
    }

    this.data = CATEGORIES;
  }

  /**
   * Чтения категории по её идентификатору
   * @param id
   */
  public read(id: number): Observable<ICategory> {
    return of(this.data.find((category: ICategory) => category.id === id));
  }

  /**
   * Запись категории
   * @param category
   */
  public update(category: ICategory): Observable<boolean> {

    this.data = this.data.map((c: ICategory) => {
      if (c.id === category.id) {
        return category;
      }

      return c;
    });

    this.localStorage.setItem(LOCAL_STORAGE_TOKEN, this.data);

    return of(true);
  }

  /**
   * Создание категории
   * @param category
   */
  public create(category: ICategory): Observable<ICategory> {

    const c = { ...category };
    c.id = Date.now();
    this.data.push(c);

    this.localStorage.setItem(LOCAL_STORAGE_TOKEN, this.data);

    return of(c);
  }

  /**
   * Удаление категории
   * @param id
   */
  public delete(id: number): Observable<boolean> {
    this.data = this.data.filter((c: ICategory) => c.id !== id);
    this.localStorage.setItem(LOCAL_STORAGE_TOKEN, this.data);

    return of(true);
  }

  /**
   * Получение списка категорий
   * @param filter
   */
  getList(filter: ICategoryQueryFilter = {}): Observable<ICategory[]> {

    let data = this.data;

    if ('itemType' in filter) {
      data = data.filter((c: ICategory) => c.itemType === filter.itemType);
    }

    if ('parent' in filter) {
      data = data.filter((c: ICategory) => c.parent === filter.parent);
    }

    if ('publish' in filter) {
      data = data.filter((c: ICategory) => c.publish === filter.publish);
    }

    if (filter.enableServiceCategory) {
      data = [
        ...[{
          id: null,
          name: 'Все категории',
          parent: null,
          itemType: false
        }],
        ...data,
        ...[{
          id: -1,
          name: 'Без подкатегорий',
          parent: null,
          itemType: false
        }]
      ]
    }

    if (filter.flatList) {
      data = data.map((c: ICategory) => {
        c.parent = null,
        c.itemType = false;
        return c;
      });
    }

    return of(data);
  }

  /**
   * Получение списка категорий для кабинете администратора
   */
  getAdminList(): Observable<ICategory[]> {
    return this.getList({enableServiceCategory: true});
  }

  /**
   * Изменение опубликованности категории
   * @param id
   * @param publish
   */
  changePublish(id: number, publish: boolean): Observable<boolean> {
    this.data = this.data.map((c: ICategory) => {
      if(c.id === id) {
        c.publish = publish;
      }
      return c;
    });

    this.localStorage.setItem(LOCAL_STORAGE_TOKEN, this.data);
    return of(true);
  }

  /**
   * Преобразовывает категорию в узел
   * @param id
   */
  convertToNode(id: number): Observable<void> {
    this.data = this.data.map((c: ICategory) => {
      if(c.id === id) {
        c.itemType = true;
      }
      return c;
    });

    this.localStorage.setItem(LOCAL_STORAGE_TOKEN, this.data);
    return of();
  }

  /**
   * Устанавливает категории нового родителя
   * @param id
   * @param parent
   */
  changeParent(id: number, parent: number): Observable<void> {
    this.data = this.data.map((c: ICategory) => {
      if(c.id === id) {
        c.parent = parent;
      }
      return c;
    });

    this.localStorage.setItem(LOCAL_STORAGE_TOKEN, this.data);
    return of();
  }
}
