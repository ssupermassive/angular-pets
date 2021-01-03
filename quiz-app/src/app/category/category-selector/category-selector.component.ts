import {
  Component,
  Output,
  EventEmitter,
  Inject,
  ChangeDetectionStrategy
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ICategory } from 'src/app/models/categories';

/**
 * Диалог выбора категории
 */
@Component({
  selector: 'ft-category-selector',
  templateUrl: './category-selector.component.html',
  styleUrls: ['./category-selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategorySelectorComponent {

  @Output() selectComplete: EventEmitter<ICategory>;

  dataSource: ICategory[];

  constructor(
    public dialogRef: MatDialogRef<CategorySelectorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { dataSource: ICategory[] }
  ) {
    this.selectComplete = new EventEmitter();
  }

  selectCompleteHandler(item: ICategory): void {
    this.selectComplete.emit(item);
  }
}
