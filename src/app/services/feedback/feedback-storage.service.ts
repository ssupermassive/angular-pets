import { Injectable } from '@angular/core';
import { DataStorageService } from 'src/app/core';
import { IFeedback } from 'src/app/models/feedback';

@Injectable({
  providedIn: 'root'
})
export class FeedbackStorageService extends DataStorageService<IFeedback> {
  constructor() {
    super([], 'FT_FEEDBACK_DATA');
  }
}
