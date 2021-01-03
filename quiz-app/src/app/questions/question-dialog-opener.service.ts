import { Injectable } from '@angular/core';
import { QuestionsService } from 'src/app/services/questions';
import { QuestionDialogComponent } from './question-dialog/question-dialog.component';
import { Observable, of } from 'rxjs';
import { DialogOpenerService } from 'src/app/components/opener';
import {IDialogOptions, IQuestionEditResult} from './interfaces';
import {Question} from 'src/app/models/questions/Question';

/**
 * Сервис, предназначенный для открытия диалога редактирования вопроса
 * и получения результатов из него
 * @author Серпаков С.А.
 */
@Injectable()
export class QuestionDialogOpenerService {

  constructor(
    private questionsService: QuestionsService,
    private dialogOpener: DialogOpenerService<IQuestionEditResult>
  ) { }

  open(options: IDialogOptions): Observable<IQuestionEditResult> {

    const data = {
      feedback: options.feedback,
      selectedCategory: options.selectedCategory,
      addCompleteTemplate: options.addCompleteTemplate,
    };

    // фейковый сервис для вычитки вопроса
    const fakeService = {
      service: this.questionsService,
      key: options.key,
      question: options.question,

      readQuestion(): Observable<Question> {
        if (this.key) {
          return this.service.read(this.key);
        }
        return of(this.question || null);
      }
    };

    return this.dialogOpener.openDialog({
      template: QuestionDialogComponent,
      preloadConfig: [
        {
          service: fakeService,
          methodName: 'readQuestion',
          resultFieldName: 'question'
        }
      ],
      height: '100%',
      minWidth: '750px',
      data: options
    });
  }
}
