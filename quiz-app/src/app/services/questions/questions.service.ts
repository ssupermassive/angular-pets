import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Question, IQuestion } from 'src/app/models/questions';
import { IQuestionsQueryFilter } from 'src/app/models/questions/IQuestionsQueryFIlter';
import { LocalStorageService } from 'src/app/core';

const LOCAL_STORAGE_TOKEN = 'FT_QUESTIONS_DATA';
const QUESTIONS: IQuestion[] = [];

/**
 * Сервис, отвечающий за работу с вопросами
 * @author Серпаков С.А.
 */
@Injectable()
export class QuestionsService {

  constructor(private localStorage: LocalStorageService) { 
    const storageData = this.localStorage.getItem(LOCAL_STORAGE_TOKEN);

    if (storageData) {
      this.data = storageData;
      return;
    }

    this.data = QUESTIONS;
  }

  private data: IQuestion[];

  /**
   * Создание вопроса
   * @param question
   * @param filter
   */
  public create(question: IQuestion): Observable<any> {

    const q = new Question(question);
    q.id = Date.now();
    this.data.push(q);

    this.localStorage.setItem(LOCAL_STORAGE_TOKEN, this.data);

    return of(q);
  }

  /**
   * Чтение вопроса
   * @param id
   */
  public read(id: number): Observable<Question> {
    return of(new Question(this.data.find((q: IQuestion) => q.id === id)));
  }

  /**
   * Удаление
   * @param id
   */
  public delete(id: number): Observable<boolean> {
    this.data = this.data.filter((c: IQuestion) => c.id !== id);
    this.localStorage.setItem(LOCAL_STORAGE_TOKEN, this.data);

    return of(true);
  }

  /**
   * Запись/обновление
   * @param question
   */
  public update(question: IQuestion): Observable<any> {
    this.data = this.data.map((q: IQuestion) => {
      if (q.id === question.id) {
        return new Question(question);
      }

      return new Question(q);
    });

    this.localStorage.setItem(LOCAL_STORAGE_TOKEN, this.data);

    return of(true);
  }

  /**
   * Получение списка категорий для кабинета администратора
   */
  getList(filter: IQuestionsQueryFilter = {}): Observable<Question[]> {
    let data = this.data;

    if ('category' in filter) {
      data = data.filter(
        (q: IQuestion) => !!(q.category.id === filter.category || q.subcategory?.id === filter.category)
      );
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
    this.data = this.data.map((q: IQuestion) => {
      if(q.id === id) {
        q.publish = publish;
      }
      return q;
    });

    this.localStorage.setItem(LOCAL_STORAGE_TOKEN, this.data);
    return of(true);
  }

  /**
   * Изменение признака опубликованности
   * @param id
   * @param publish
   */
  changePublishMass(ids: number[], publish: boolean): Observable<boolean> {
    this.data = this.data.map((q: IQuestion) => {
      if(ids.includes(q.id)) {
        q.publish = publish;
      }
      return q;
    });

    this.localStorage.setItem(LOCAL_STORAGE_TOKEN, this.data);
    return of(true);
  }
}

