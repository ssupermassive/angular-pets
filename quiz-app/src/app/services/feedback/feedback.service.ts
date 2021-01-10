import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IFeedback } from 'src/app/models/feedback/IFeedback.model';
import { FeedbackStorageService } from './feedback-storage.service';

/**
 * Сервис для работы с обратной связью
 */
@Injectable()
export class FeedbackService {

  constructor(private storage: FeedbackStorageService) { }

  /**
   * Создает сообщение об ошибке
   * @param report;
   */
  create(feedback: IFeedback): Observable<IFeedback> {

    const newFeedback = { ...feedback };
    newFeedback.id = Date.now();
    const data = [newFeedback, ...this.storage.data]

    this.storage.updateData(data);
    return of(newFeedback);
  }

  /**
   * Удаляет сообщение об ошибке
   * @param id;
   */
  remove(id: number): Observable<boolean> {
    const data = this.storage.data.filter((item: IFeedback) => {
      return item.id !== id;
    });

    this.storage.updateData(data);
    return of(true);
  }

  /**
   * Получения списка сообщений об ошибках
   */
  getList(): Observable<IFeedback[]> {
    return of(this.storage.data);
  }
}
