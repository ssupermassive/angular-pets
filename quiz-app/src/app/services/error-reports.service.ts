import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IErrorReport } from 'src/app/models/error_report/IErrorReport';

const API_URL = `${location.origin}/api/v1/error_reports/`;

/**
 * Сервис для работы с сообщениями об ошибках
 */
@Injectable()
export class ErrorReportsService {

  constructor(private http: HttpClient) { }

  /**
   * Создает сообщение об ошибке
   * @param report;
   */
  create(report: IErrorReport): Observable<void> {
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
  getList(): Observable<IErrorReport[]> {
    return this.http.get(API_URL).pipe(map((result: IErrorReport[]) => result));
  }
}
