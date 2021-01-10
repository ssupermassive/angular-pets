import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Question, IQuestion } from 'src/app/models/questions';
import { IQuestionsQueryFilter } from 'src/app/models/questions/IQuestionsQueryFIlter';
import { QuestionsStorageService } from './questions-storage.service';
import { WITHOUT_SUBCATEGORY_ITEM_KEY } from 'src/app/core/constants';

/**
 * Сервис, отвечающий за работу с вопросами
 * @author Серпаков С.А.
 */
@Injectable()
export class QuestionsService {

  constructor(private storage: QuestionsStorageService) {}

  /**
   * Создание вопроса
   * @param question
   * @param filter
   */
  public create(question: IQuestion): Observable<any> {

    const newQuestion = new Question(question);
    newQuestion.id = Date.now();
    const data = [newQuestion, ...this.storage.data];

    this.storage.updateData(data);

    return of(newQuestion);
  }

  /**
   * Чтение вопроса
   * @param id
   */
  public read(id: number): Observable<Question> {
    return of(new Question(this.storage.data.find((q: IQuestion) => q.id === id)));
  }

  /**
   * Удаление
   * @param id
   */
  public delete(id: number): Observable<boolean> {
    const data = this.storage.data.filter((c: IQuestion) => c.id !== id);
    this.storage.updateData(data);

    return of(true);
  }

  /**
   * Запись/обновление
   * @param question
   */
  public update(question: IQuestion): Observable<any> {
    const data = this.storage.data.map((q: IQuestion) => {
      if (q.id === question.id) {
        return new Question(question);
      }

      return new Question(q);
    });

    this.storage.updateData(data);

    return of(true);
  }

  /**
   * Получение списка категорий для кабинета администратора
   */
  getList(filter: IQuestionsQueryFilter = {}): Observable<Question[]> {
    let data = [...this.storage.data];

    if ('category' in filter && filter.category !== null) {

      if (filter.category === WITHOUT_SUBCATEGORY_ITEM_KEY) {
        data = data.filter(
          (q: IQuestion) => !q.subcategory
        );
      } else {
        data = data.filter(
          (q: IQuestion) => !!(q.category.id === filter.category || q.subcategory?.id === filter.category)
        );
      }
    }

    if ('publish' in filter) {
      data = data.filter(
        (q: IQuestion) => q.publish === filter.publish
      );
    }

    if (filter.random) {
      data = data.sort(() => {
        return Math.random() - Math.random();
      })
    }

    return of(data.map((q: IQuestion) => new Question(q)));
  }

  /**
   * Изменение признака опубликованности
   * @param id
   * @param publish
   */
  public changePublish(id: number, publish: boolean): Observable<boolean> {
    const data = this.storage.data.map((q: IQuestion) => {
      if (q.id === id) {
        q.publish = publish;
      }
      return q;
    });

    this.storage.updateData(data);
    return of(true);
  }

  /**
   * Изменение признака опубликованности
   * @param id
   * @param publish
   */
  changePublishMass(ids: number[], publish: boolean): Observable<boolean> {
    const data = this.storage.data.map((q: IQuestion) => {
      if (ids.includes(q.id)) {
        q.publish = publish;
      }
      return q;
    });

    this.storage.updateData(data);
    return of(true);
  }
}
