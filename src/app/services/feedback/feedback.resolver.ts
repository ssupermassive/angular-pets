import {Injectable} from '@angular/core';
import {Resolve} from '@angular/router';
import {Observable} from 'rxjs';
import { IFeedback } from 'src/app/models/feedback/IFeedback.model';
import { FeedbackService } from './feedback.service';

/**
 * Резолвер списка сообщений об ошибках
 * @author Серпаков С.А.
 */
@Injectable()
export class FeedbackResolver implements Resolve<any> {

  constructor(private feedbackService: FeedbackService){}

  resolve(): Observable<IFeedback[]> {
    return this.feedbackService.getList();
  }
}
