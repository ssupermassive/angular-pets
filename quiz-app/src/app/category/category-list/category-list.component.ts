import {
  Component,
  TemplateRef,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';
import { ICategory } from 'src/app/models/categories';
import { IRowAction } from '../../components/list-base';

/**
 * Список категорий
 */
@Component({
  selector: 'ft-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryListComponent {

  @Input() rowTemplate: TemplateRef<HTMLElement>;
  @Input() rowActions: IRowAction[];
  @Input() dataSource: ICategory[];
  @Input() markedKey: number;
  @Output() itemClick: EventEmitter<ICategory>;

  constructor() {
    this.itemClick = new EventEmitter();
  }

  itemClickHandler(data: ICategory): void {
    this.itemClick.emit(data);
  }
}
