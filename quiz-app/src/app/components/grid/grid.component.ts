import {
  Component,
  OnInit,
  Directive,
  ContentChildren,
  Input,
  Output,
  ViewChild,
  EventEmitter,
  QueryList,
  TemplateRef,
  AfterContentInit,
  OnChanges,
  SimpleChanges,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  AfterViewInit
} from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

interface ISelectColumnsStyles {
  width: string;
  maxWidth: string;
  minWidth: string;
}

const SELECT_COLUMN_STYLES: ISelectColumnsStyles = {
  width: '50px',
  maxWidth: '50px',
  minWidth: '50px',
};

enum COLUMN_VALIGN {
  center = 'center',
  top = 'top'
}

export interface IColumn {
  /**
   * Название колонки
   */
  name: string;

  /**
   * Шаблон отображения колонки
   */
  template: TemplateRef<any>;

  /**
   * Текст в заголовке колонки
   */
  headerCaption?: string;

  /**
   * Шаблон заголовка колонки
   */
  headerTemplate?: TemplateRef<any>;

  /**
   * Ширина колонки
   */
  width?: string;
}

export interface IPaging {
  pageSize: number[];
}

export interface IItemAction {
  icon: string;
  iconStyle?: string;
  title: string;
  handler: Function;
  visibilityCallback?: Function;
}

@Directive({ selector: 'gridColumn' })
export class GridColumn {

  @Input() name: string;
  @Input() template: TemplateRef<any>;
  @Input() headerCaption?: string;
  @Input() width?: string;
}

@Component({
  selector: 'ft-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GridComponent implements OnInit, AfterContentInit, OnChanges, AfterViewInit {

  /**
   * Набор операция над записью
   */
  @Input() itemActions: IItemAction[];

  /**
   * Данные для отображения
   */
  @Input() dataSource: MatTableDataSource<any[]>;

  @Input() paging: IPaging;

  /**
   * Название поля, в котором наодится идентификатор записи
   */
  @Input() keyProperty: string;

  /**
   * Показать шапку
   */
  @Input() showHeader: boolean = true;

  /**
   * Идентификатор выбранной записи
   */
  @Input() selectedKey: string | number;

  /**
   * Функция, которая вернёт объект с классами для строки таблицы
   * Для работы нужно выставить у передающего компонента ViewEncapsulation.None
   */
  @Input() getRowClasses: (row: object) => object;

  /**
   * Режим множественного выбора
   */
  @Input() multiselect: boolean;

  /**
   * Выравнивание значения в колонках
   */
  @Input() columnVAlign: COLUMN_VALIGN = COLUMN_VALIGN.center;

  @Output() itemClick: EventEmitter<any>;
  @Output() selectionChanged: EventEmitter<any>;

  @ContentChildren(GridColumn) gridColumns !: QueryList<GridColumn>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  _dataSource: MatTableDataSource<any[]>;
  _selectedKey: string | number;
  _columns: IColumn[];
  _columnsNames: string[];
  _selectionModel: SelectionModel<any>;
  _selectColumnStyles: ISelectColumnsStyles = SELECT_COLUMN_STYLES;

  constructor(private changeDetector: ChangeDetectorRef) {
    this.itemClick = new EventEmitter();
    this.selectionChanged = new EventEmitter();
  }

  ngOnInit(): void {
    this.selectedKey = this.selectedKey;
  }

  ngOnChanges(changes: SimpleChanges): void {

    const { multiselect, dataSource } = changes;

    if (multiselect && !multiselect.firstChange &&
      multiselect.currentValue !== multiselect.previousValue) {
      this._setMultiSelect(multiselect.currentValue); {
      }
    }

    // сравнение по ссылке допустимо, т.к. с верху всегда приходит новый объект (по крайней мере пока что)
    if (dataSource && dataSource.currentValue !== dataSource.previousValue) {
      this._setDataSource(dataSource.currentValue);
    }
  }

  ngAfterContentInit(): void {

    if (this.gridColumns.length) {
      const columns = [];
      const columnsNames = [];
      this.gridColumns.forEach((item: GridColumn) => {
        columns.push({ ...item });
        columnsNames.push(item.name);
      });

      this._columns = columns;
      this._columnsNames = columnsNames;
      this._setMultiSelect(this.multiselect);
    }

    this._setDataSource(this.dataSource);
  }

  ngAfterViewInit(): void {
    this._bindPaginator();
  }

  /**
   * Обработчик клика по записи строке
   * @param row;
   */
  _rowClick(row: object): void {
    this._selectedKey = row[this.keyProperty];
    this.itemClick.emit(row);
  }

  /**
   * Вычисляет классы, которые нужно повесить на операцию над записью
   * @param action;
   * @param item;
   */
  _getActionClasses(action: IItemAction, item: object): object {

    const result = {};

    if (action.iconStyle) {
      result[`ft-${action.iconStyle}`] = true;
    }

    if (action.visibilityCallback) {
      result['ft-Grid__itemActions-action-hidden'] = !action.visibilityCallback(item);
    }

    return result;
  }

  /**
   * Вызывает обработчик клика по операции над записью
   */
  _rowActionHandler(event: Event, action: IItemAction, item: object): void {

    // гасим событие, что бы при клике на операцию не срабатывал
    // клик по записи
    event.stopPropagation();

    action.handler(item);
  }

  /**
   * Включает выключает режим множественного выбора записей
   * @param multiselect;
   */
  private _setMultiSelect(multiselect: boolean): void {

    if (multiselect) {
      this._selectionModel = new SelectionModel(true, []);
      this._columnsNames = ['select', ...this._columnsNames];
      return;
    }
    this._selectionModel = null;
    const columnsNames = [];
    this.gridColumns.forEach((item: GridColumn) => {
      columnsNames.push(item.name);
    });
    this._columnsNames = columnsNames;
  }

  /**
   * Обновление выбранныз записей из актуального источника данных
   * @param dataSource;
   */
  private _updateSelectionFromData(dataSource: object[]): void {

    // проверяем, если выбранные записи
    if (this._selectionModel?.selected?.length) {

      // если источник пустой, то обновлять нечего
      if (!dataSource || !dataSource.length) {
        this._selectionModel.clear();
        return;
      }

      // получаем текущие выбранные ключи, ищем по ним записи в переданном наборе и добавляем их в выбранные. 
      const keys = this._selectionModel.selected.map((item: object) => item[this.keyProperty]);
      this._selectionModel.clear();
      dataSource.forEach((item: object) => {
        if (keys.includes(item[this.keyProperty])) {
          this._selectionModel.select(item);
        }
      });
    }
  }

  /**
   * Установка источника для списка
   * @param dataSource;
   */
  private _setDataSource(dataSource: MatTableDataSource<any[]> | any[]): void {
    const dataSourceIsArray = dataSource instanceof Array;
    this._dataSource = (
      dataSourceIsArray ? new MatTableDataSource(dataSource as any[]) : dataSource
    ) as MatTableDataSource<any[]>;
    this._bindPaginator();

    // после обновления источника нужно обновить выбранные записи.
    // SelectionModel работает по ссылкам и если не положить в неё новые элементы,
    // то слетит выделение с чекбоксов
    this._updateSelectionFromData(
      (dataSourceIsArray ? dataSource : this._dataSource.data) as object[]
    );
  }

  /**
   * Обработчик клика на чек-бокс "Выделить всё"
   */
  _masterToggleHandlers(): void {
    this._isAllSelected() ?
      this._selectionModel.clear() :
      this._dataSource.data.forEach(row => this._selectionModel.select(row));
    this.selectionChanged.emit(this._selectionModel.selected);
  }

  /**
   * Меняет состояние выбранности чек - бокса
   * @param item;
   */
  _toggleCheckbox(item: object): void {
    this._selectionModel.toggle(item);
    this.selectionChanged.emit(this._selectionModel.selected);
  }

  /**
   * Проверяет, все ли записи выбранны
   */
  _isAllSelected(): boolean {
    return this._selectionModel.selected.length === this._dataSource.data.length;
  }

  /**
   * Проверяет наличие источника данных
   */
  _hasDataSource(): boolean {
    if (!this._dataSource) {
      return false;
    }

    return this._dataSource instanceof Array ? !!this._dataSource.length : !!this._dataSource.data.length;
  }

  /**
   * Привязывает пагинатор к источнику
   */
  private _bindPaginator(): void {
    if (this._dataSource) {
      this._dataSource.paginator = this.paginator;
    }
  }
}
