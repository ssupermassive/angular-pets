import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { QuestionDialogOpenerService } from 'src/app/questions';
import { FeedbackService } from 'src/app/services/feedback';
import { IFeedback } from 'src/app/models/feedback/IFeedback.model';
import { Subscription } from 'rxjs';

/**
 * Список сообщений об ошибках
 */
@Component({
  selector: 'ft-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeedbackComponent implements OnInit, OnDestroy {

  _source: IFeedback[];
  _itemActions: any[] = [
    {
      icon: 'close',
      iconStyle: 'warning',
      title: 'Удалить',
      handler: this._delete.bind(this)
    }
  ];

  private _subscription: Subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private questionDialog: QuestionDialogOpenerService,
    private feedbackService: FeedbackService,
    private changeDetector: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this._subscription.add(
      this.route.data.subscribe((data: Data) => {
        this._source = data.feedback;
      })
    );
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  /**
   * Обработка клика по записи
   * @param item;
   */
  _itemClick(item: IFeedback): void {
    this._subscription.add(
      this.questionDialog.open({
        feedback: item.text,
        key: item.questionId
      }).subscribe()
    );
  }

  /**
   * Операция удаления записи
   * @param item;
   */
  private _delete(item: IFeedback): void {
    this._subscription.add(
      this.feedbackService.remove(item.id).subscribe(() => {
        this._reload();
      })
    );
  }

  /**
   * Перезагрузка списка
   */
  private _reload(): void {
    this._subscription.add(
      this.feedbackService.getList().subscribe((data: IFeedback[]) => {
        this._source = data;
        this.changeDetector.markForCheck();
      })
    );
  }
}
