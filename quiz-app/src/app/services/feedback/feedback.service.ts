import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IFeedback } from 'src/app/models/feedback/IFeedback.model';

const API_URL = `${location.origin}/api/v1/error_reports/`;

/**
 * Сервис для работы с обратной связью
 */
@Injectable()
export class FeedbackService {

  constructor(private http: HttpClient) { }

  /**
   * Создает сообщение об ошибке
   * @param report;
   */
  create(report: IFeedback): Observable<void> {
    return this.http.post(API_URL, report).pipe(map(() => undefined));
  }

  /**
   * Удаляет сообщение об ошибке
   * @param id;
   */
  remove(id: number): Observable<void> {
    return this.http.delete(`${API_URL}${id}`).pipe(map(() => undefined));
  }

  /**
   * Получения списка сообщений об ошибках
   */
  getList(): Observable<IFeedback[]> {
    return this.http.get(API_URL).pipe(map((result: IFeedback[]) => result));
  }
}
