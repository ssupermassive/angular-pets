import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { QuestionDialogOpenerService } from 'src/app/questions';
import { ErrorReportsService } from 'src/app/services/error-reports.service';
import { IErrorReport } from 'src/app/models/error_report/IErrorReport';
import { Subscription } from 'rxjs';

/**
 * Список сообщений об ошибках
 */
@Component({
  selector: 'ft-error-reports',
  templateUrl: './error-reports.component.html',
  styleUrls: ['./error-reports.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ErrorReportsComponent implements OnInit, OnDestroy {

  _source: IErrorReport[];
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
    private errorReportsService: ErrorReportsService,
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
  _itemClick(item: IErrorReport): void {
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
  private _delete(item: IErrorReport): void {
    this._subscription.add(
      this.errorReportsService.remove(item.id).subscribe(() => {
        this._reload();
      })
    );
  }

  /**
   * Перезагрузка списка
   */
  private _reload(): void {
    this._subscription.add(
      this.errorReportsService.getList().subscribe((data: IErrorReport[]) => {
        this._source = data;
        this.changeDetector.markForCheck();
      })
    );
  }
}
