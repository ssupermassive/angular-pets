import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewEncapsulation,
  SimpleChanges,
  OnChanges,
  OnDestroy,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';
import {Subscription} from 'rxjs';
import {
  QuestionDialogOpenerService,
  IQuestionEditResult
} from 'src/app/questions';
import {
  Question,
  IQuestionOption,
  IQuestionsQueryFilter
} from 'src/app/models/questions';
import { QuestionsService } from 'src/app/services/questions';
import { ICategory } from 'src/app/models/categories';

@Component({
  selector: 'ft-questions-list',
  templateUrl: './questions-list.component.html',
  styleUrls: ['./questions-list.component.scss'],
  encapsulation: ViewEncapsulation.None, // Для того что бы работали переданные в grid классы
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuestionsListComponent implements OnInit, OnChanges, OnDestroy {

  @Input() dataSource: Question[];
  @Input() filter: IQuestionsQueryFilter;
  @Input() currentCategory: ICategory;
  @Output() selectionChanged: EventEmitter<Question[]> = new EventEmitter();

  protected _selectedItems: Question[];

  _multiselect: boolean = true;
  _dataSource: Question[];
  _itemActions: any[] = [
    {
      icon: 'file_copy',
      iconStyle: 'primary',
      title: 'Создать на основе',
      handler: this._createBased.bind(this),
      visibilityCallback: (item: Question) => {
        return !item.service;
      }
    },
    {
      icon: 'check_circle_outline',
      iconStyle: 'secondary',
      title: 'Опубликовать',
      handler: this._publishChange.bind(this, true),
      visibilityCallback: (item: Question) => {
        return !item.publish;
      }
    },
    {
      icon: 'check_circle',
      iconStyle: 'success',
      title: 'Снять с публикации',
      handler: this._publishChange.bind(this, false),
      visibilityCallback: (item: Question) => {
        return item.publish;
      }
    },
    {
      icon: 'close',
      iconStyle: 'warning',
      title: 'Удалить',
      handler: this._delete.bind(this),
      visibilityCallback: (item: Question) => {
        return !item.service;
      }
    }
  ];

  private _subscription: Subscription = new Subscription();

  constructor(
    private questionsService: QuestionsService,
    private questionDialog: QuestionDialogOpenerService,
    private changeDetector: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this._dataSource = this.dataSource;
  }

  ngOnChanges(changes: SimpleChanges): void {

    const { filter } = changes;

    if (filter && !filter.firstChange && filter.currentValue) {
      this.reload(changes.filter.currentValue);
    }
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  /**
   * Операция изменений опубликованности вопроса
   * @param question;
   * @param publish;
   */
  _publishChange(publish: boolean, item: Question): void {
    this._subscription.add(
      this.questionsService.changePublish(item.id, publish).subscribe(() => {
        this._dataSource = this._dataSource.map((sourceItem: Question) => {
          if (sourceItem.id === item.id) {
            return {
              ...sourceItem,
              ...{ publish }
            } as Question;
          }
          return sourceItem;
        });
        this.changeDetector.markForCheck();
      })
    );
  }

  /**
   * Операция удаления вопроса
   * @param question;
   */
  _delete(item: Question): void {
    this._subscription.add(
      this.questionsService.delete(item.id).subscribe(() => {
        this.reload();
      })
    );
  }

  /**
   * Операция создания вопроса на основе другого
   * @param item;
   */
  _createBased(item: Question): void {
    this._subscription.add(
      this.questionsService.read(item.id).subscribe((question: Question) => {
        const opts = [...question.opts];

        opts.forEach((opt: IQuestionOption) => {
          opt.isRight = false;
        });

        question.options = JSON.stringify(opts);
        question.id = null;

        this.addQuestion(question);
      })
    );
  }

  /**
   * Обработчик клика по записи
   * @param item;
   */
  _itemClick(item: Question): void {
    this._subscription.add(
      this.questionDialog.open({ key: item.id}).subscribe((result: IQuestionEditResult) => {
        this.reload();
      })
    );
  }

  /**
   * Открытие диалога добавления вопроса
   */
  addQuestion(question?: Question): void {

    const selectedCategory = this.currentCategory && this.currentCategory.id ? this.currentCategory : null;

    this._subscription.add(
      this.questionDialog.open({
        question,
        selectedCategory
      }).subscribe(() => {
        this.reload();
      })
    );
  }

  /**
   * Возвращает классы для строки списка
   */
  _getGridRowClasses(item: Question): object {
    return {
      'ft-QuestionsList__item-unpublish': !item.publish
    };
  }

  /**
   * Получение списка вопросов
   */
  reload(filter?: IQuestionsQueryFilter): void {
    this._subscription.add(
      this.questionsService.getList(filter || this.filter).subscribe((result: Question[]) => {
        this._dataSource = result;
        this.changeDetector.markForCheck();
      })
    );
  }

  /**
   * Меняет режим множественного выбора
   */
  _toggleMultiselect(): void {
    this._multiselect = !this._multiselect;
  }

  /**
   * Обработчик события изменения количества выбранных записей
   * @param selection;
   */
  _selectionChanged(selection: Question[]): void {
    this._selectedItems = selection;
    this.selectionChanged.emit(selection);
  }

  /**
   * Массовая публикация вопросов
   * @param publish;
   */
  tooglePublishMass(publish: boolean): void {

    const keys = (this._selectedItems.map((item: Question) => item.id));

    this._subscription.add(
      this.questionsService.changePublishMass(keys, publish).subscribe(
        () => {
          this.reload();
        })
    );
  }
}
