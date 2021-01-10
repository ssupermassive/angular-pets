import { 
  Component, 
  ViewEncapsulation, 
  Output, 
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';
import { MatSelectChange } from '@angular/material/select';

/**
 * Интерфейс, описывающий фильтры панели
 */
interface IFilter {
  text?: string;
  publish?: boolean;
}

/**
 * Состояния фильтра по опубликованным
 */
enum PUBLISH_FILTER_ITEMS {
  ALL,
  PUBLISHED,
  UNPUBLISHED
}

/**
 * Компонент строки фильтров для админки
 * @author Серпаков С.А.
 */
@Component({
  selector: 'ft-filter-line',
  templateUrl: './filter-line.component.html',
  styleUrls: ['./filter-line.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterLineComponent {

  /**
   * Текущее состояние фильтра по опубликованности
   */
  _publishFilter: number = 0;

  /**
   * Текущий фильтр
   */
  protected _filter: IFilter = {};

  /**
   * Событие изменения значения фильтрации
   */
  @Output() filterChanged: EventEmitter<IFilter>;

  constructor() {
     this.filterChanged = new EventEmitter();
   }

   /**
    * Обработчик изменения фильтра по опубликованности
    * @param {value: number}
    */
  _onPublishFilterChangedHandler({ value }: MatSelectChange): void {
    const filter = { ...this._filter };

    switch (value) {
      case PUBLISH_FILTER_ITEMS.ALL:
        delete filter.publish;
        break;
      case PUBLISH_FILTER_ITEMS.PUBLISHED:
        filter.publish = true;
        break;
      case PUBLISH_FILTER_ITEMS.UNPUBLISHED:
        filter.publish = false;
        break;
    }

    this._filter = filter;
    this.filterChanged.emit(this._filter);
  }
}
