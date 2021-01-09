import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ICategory, ICategoryQueryFilter } from 'src/app/models/categories';
import { CategoriesStorageService } from './categories-storage.service';
import { clone } from 'src/app/core/utils';

/**
 * Сервис для работы с категориями
 * @author Серпаков С.А.
 */

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private storage: CategoriesStorageService) {}

  /**
   * Чтения категории по её идентификатору
   * @param id
   */
  public read(id: number): Observable<ICategory> {
    return of(this.storage.data.find((category: ICategory) => category.id === id));
  }

  /**
   * Запись категории
   * @param category
   */
  public update(category: ICategory): Observable<boolean> {

    const data = this.storage.data.map((c: ICategory) => {
      if (c.id === category.id) {
        return category;
      }

      return c;
    });

    this.storage.updateData(data);

    return of(true);
  }

  /**
   * Создание категории
   * @param category
   */
  public create(category: ICategory): Observable<ICategory> {
    const newCategory = { ...category };
    newCategory.id = Date.now();
    const data = [ newCategory, ...this.storage.data];

    this.storage.updateData(data);

    return of(newCategory);
  }

  /**
   * Удаление категории
   * @param id
   */
  public delete(id: number): Observable<boolean> {
    const data = this.storage.data.filter((c: ICategory) => c.id !== id);
    this.storage.updateData(data);

    return of(true);
  }

  /**
   * Получение списка категорий
   * @param filter
   */
  getList(filter: ICategoryQueryFilter = {}): Observable<ICategory[]> {

    // ToDo тут нужно глубокое копирование
    let data = clone(this.storage.data, true);

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
          itemType: false,
          service: true
        }],
        ...data,
        ...[{
          id: -1,
          name: 'Без подкатегорий',
          parent: null,
          itemType: false,
          service: true
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
    const data = this.storage.data.map((c: ICategory) => {
      if(c.id === id) {
        c.publish = publish;
      }
      return c;
    });

    this.storage.updateData(data);
    return of(true);
  }

  /**
   * Преобразовывает категорию в узел
   * @param id
   */
  convertToNode(id: number): Observable<void> {
    const data = this.storage.data.map((c: ICategory) => {
      if(c.id === id) {
        c.itemType = true;
      }
      return c;
    });

    this.storage.updateData(data);
    return of();
  }

  /**
   * Устанавливает категории нового родителя
   * @param id
   * @param parent
   */
  changeParent(id: number, parent: number): Observable<void> {
    const data = this.storage.data.map((c: ICategory) => {
      if(c.id === id) {
        c.parent = parent;
      }
      return c;
    });

    this.storage.updateData(data);
    return of();
  }
}
