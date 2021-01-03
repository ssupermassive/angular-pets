import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Question, IQuestion } from 'src/app/models/questions';
import { IQuestionsQueryFilter } from 'src/app/models/questions/IQuestionsQueryFIlter';
import { addParamsToUrl, transformToQuestion } from 'src/app/core/utils';

/**
 * Адресс сервиса БЛ
 */
const QUESTIONS_API_URL = `${location.origin}/api/v1/questions/`;

/**
 * Сервис, отвечающий за работу с вопросами
 * @author Серпаков С.А.
 */
@Injectable()
export class QuestionsService {

  constructor(private http: HttpClient) { }

  /**
   * Создание вопроса
   * @param question
   * @param filter
   */
  public create(question: IQuestion): Observable<any> {
    return this.http.post(QUESTIONS_API_URL, question).pipe(
      map((result) => result));
  }

  /**
   * Чтение вопроса
   * @param id
   */
  public read(id: number): Observable<Question> {
    return this.http.get(`${QUESTIONS_API_URL}/${id}`).pipe(
      map((question: IQuestion) => {
        return transformToQuestion(question);
      }));
  }

  /**
   * Удаление
   * @param id
   */
  public delete(id: number): Observable<boolean> {
    return this.http.delete(`${QUESTIONS_API_URL}/${id}`).pipe(
      map((result: boolean) => result)
    );
  }

  /**
   * Запись/обновление
   * @param question
   */
  public update(question: IQuestion): Observable<any> {
    return this.http.put(QUESTIONS_API_URL, question).pipe(
      map((result) => result));
  }

  /**
   * Получение списка категорий для кабинета администратора
   */
  getAdminList(filter: IQuestionsQueryFilter = {}): Observable<object[]> {

    const url = new URL(`${QUESTIONS_API_URL}admin`);
    addParamsToUrl(url, filter);

    return this.http.get(url.href).pipe(
      map((questions: object[]) => questions)
    );
  }

  /**
   * Изменение признака опубликованности
   * @param id
   * @param publish
   */
  public changePublish(id: number, publish: boolean): Observable<boolean> {
    return this.http.put(`${QUESTIONS_API_URL}changepublish`, { id, publish }).pipe(
      map((result: boolean) => result));
  }

  /**
   * Изменение признака опубликованности
   * @param id
   * @param publish
   */
  changePublishMass(ids: number[], publish: boolean): Observable<boolean> {
    return this.http.put(`${QUESTIONS_API_URL}changepublish`, { ids, publish }).pipe(
      map((result: boolean) => result));
  }

  /**
   * Массовое изменение категории вопросов
   * @param ids;
   * @param categoryId;
   */
  changeCategoryMass(ids: number[], category: number): Observable<boolean> {
    return this.http.put(`${QUESTIONS_API_URL}changecategory`, { ids, category }).pipe(
      map((result: boolean) => result));
  }

  resetImage(id: number): Observable<void> {
    return this.http.put(`${QUESTIONS_API_URL}resetimage`, {id}).pipe(map(() => undefined));
  }
}

