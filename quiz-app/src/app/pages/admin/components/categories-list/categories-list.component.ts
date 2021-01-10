import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';
import { CategoriesService } from 'src/app/services/categories';
import { ICategory } from 'src/app/models/categories';
import {
  CategoryDialogComponent
} from 'src/app/category';
import { ConfirmationService } from 'src/app/components/confirmation';
import { DialogOpenerService } from 'src/app/components/opener';
import { Subscription } from 'rxjs';
import { CategorySelectorOpenerService } from 'src/app/category';


@Component({
  selector: 'ft-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoriesListComponent implements OnInit, OnDestroy {

  /**
   * Источник данных списка
   */
  @Input() dataSource: ICategory[];

  /**
   * События клика по строке таблицы
   */
  @Output() itemClick: EventEmitter<ICategory>;

  /**
   * Событие изменения категорий
   */
  @Output() categoryChanged: EventEmitter<void>;

  markedKey: number = null;

  _dataSource: ICategory[];

  _itemActions: any[] = [
    {
      icon: 'add_circle',
      title: 'Добавить подкатегорию',
      iconStyle: 'primary',
      handler: this._addSubcategory.bind(this),
      isVisible: (item: ICategory) => {
        return item.itemType && !item.service;
      }
    },
    {
      icon: 'folder',
      title: 'Преобразовать в группу',
      iconStyle: 'primary',
      handler: this.convertToGroup.bind(this),
      isVisible: (item: ICategory) => {
        return !item.itemType && !item.parent && !item.service;
      }
    },
    {
      icon: 'move_to_inbox',
      title: 'Переместить',
      iconStyle: 'primary',
      handler: this.changeParent.bind(this),
      isVisible: (item: ICategory) => {
        return !item.itemType && !item.service;
      }
    },
    {
      icon: 'published_with_changes',
      iconStyle: 'secondary',
      title: 'Опубликовать',
      handler: this._publishChange.bind(this, true),
      isVisible: (item: ICategory) => {
        return !item.publish && !item.service;
      }
    },
    {
      icon: 'unpublished',
      iconStyle: 'success',
      title: 'Снять с публикации',
      handler: this._publishChange.bind(this, false),
      isVisible: (item: ICategory) => {
        return item.publish && !item.service;
      }
    },
    {
      icon: 'create',
      iconStyle: 'primary',
      title: 'Редактировать',
      handler: this._editCategory.bind(this),
      isVisible: (item: ICategory) => {
        return !item.service;
      }
    },
    {
      icon: 'close',
      iconStyle: 'warning',
      title: 'Удалить',
      handler: this._delete.bind(this),
      isVisible: (item: ICategory) => {
        return !item.service;
      }
    }
  ];

  private _subscription: Subscription = new Subscription();

  constructor(
    private categoriesService: CategoriesService,
    private dialogService: DialogOpenerService<ICategory>,
    private confirmation: ConfirmationService,
    private changeDetector: ChangeDetectorRef,
    private categorySelectorOpener: CategorySelectorOpenerService
  ) {
    this.itemClick = new EventEmitter();
    this.categoryChanged = new EventEmitter(); 
  }

  ngOnInit(): void {
    this._dataSource = this.dataSource;
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  /**
   * Обработчик клика по категории
   * @param item;
   */
  _itemClickHandler(item: ICategory): void {

    const category = { ...item };

    if (category.parent) {
      const parent = this._dataSource.find((dataItem: ICategory) => {
        return category.parent === dataItem.id;
      });

      if (parent) {
        category.parentModel = parent;
      }
    }

    this.itemClick.emit(category);
  }

  /**
   * Открытие диалога редактирования категории
   * @param item;
   */
  _editCategory(item?: ICategory): void {

    if (item) {
      this._subscription.add(
        this.categoriesService.read(item.id).subscribe((category: ICategory) => {
          this._openCategoryDialog(category);
        })
      );
      return;
    }

    this._openCategoryDialog();
  }

  /**
   * Открытие диалога редактирования категории
   * @param category;
   */
  _openCategoryDialog(category?: ICategory): void {
    this._subscription.add(
      this.dialogService.openDialog({
        template: CategoryDialogComponent,
        width: '600px',
        data: { category }
      }).subscribe((item: ICategory | null) => {
        if (item?.id) {

          let merged = false;
          this._dataSource = this._dataSource.map((sourceItem: ICategory) => {
            if (sourceItem.id === item.id) {
              merged = true;
              return {
                ...sourceItem,
                ...item
              };
            }
            return sourceItem;
          });

          if (merged) {
            this.changeDetector.markForCheck();
            return;
          }
        }

        this.reload();
      })
    );
  }

  /**
   * Операция изменения опубликованности категорий
   * @param category;
   * @param publish;
   */
  _publishChange(publish: boolean, item: ICategory): void {
    this._subscription.add(
      this.categoriesService.changePublish(item.id, publish).subscribe(() => {
        this._dataSource = this._dataSource.map((sourceItem: ICategory) => {
          if (sourceItem.id === item.id) {
            sourceItem.publish = publish;
          }
          return sourceItem;
        });
        this.changeDetector.markForCheck();
      })
    );
  }

  /**
   * Операция удаления категории
   * @param event;
   * @param category;
   */
  _delete(item: ICategory): void {
    this._subscription.add(
      this.categoriesService.delete(item.id).subscribe(
        () => {
          this._dataSource = this._dataSource.filter((c: ICategory) => {
            return c.id !== item.id;
          });
          this.changeDetector.markForCheck();
        },
        (message: string) => {
          this.confirmation.open({ type: 'alert', message }).subscribe();
        })
    );
  }

  /* *
   * Смена родительской категории
   */
  changeParent(item: ICategory): void {
    this._subscription.add(
      this.categorySelectorOpener.open({ itemType: true, flatList: true }).subscribe((selected: ICategory) => {
        this.categoriesService.changeParent(item.id, selected.id).subscribe(() => {
          this.reload();
          this.categoryChanged.emit();
        });
      })
    );
  }

  reload(): void {
    this._subscription.add(
      this.categoriesService.getAdminList().subscribe((result) => {
        this._dataSource = result;
        this.changeDetector.markForCheck();
      })
    );
  }

  /**
   * Добавление категории
   */
  addCategory(): void {
    this._editCategory();
  }

  /**
   * Операция добавления подкатегории
   * @param parent;
   */
  private _addSubcategory(item: ICategory): void {
    this._openCategoryDialog({ parent: item.id } as ICategory);
  }

  /**
   * Преобразование категории в группу категорий
   * @param item;
   */
  convertToGroup(item: ICategory): void {
    this._subscription.add(
      this.categoriesService.convertToNode(item.id).subscribe(() => {
        this.reload();
      })
    );
  }

  private _findItem(id: number): { index: number, item: ICategory } {
    if (this.dataSource && this.dataSource.length) {
      for (let i = 0; i < this.dataSource.length; i++) {
        if (this.dataSource[i].id === id) {
          return {
            index: i,
            item: this.dataSource[i]
          }
        }
      }
    }
    return null;
  }
}
