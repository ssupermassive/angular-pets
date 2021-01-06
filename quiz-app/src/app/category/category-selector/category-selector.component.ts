import {
  Component,
  Output,
  EventEmitter,
  Inject,
  ChangeDetectionStrategy,
  OnDestroy
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ICategory } from 'src/app/models/categories';
import { CategoriesService } from 'src/app/services/categories';
import { Subscription } from 'rxjs';
/**
 * Диалог выбора категории
 */
@Component({
  selector: 'ft-category-selector',
  templateUrl: './category-selector.component.html',
  styleUrls: ['./category-selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategorySelectorComponent implements OnDestroy {

  @Output() selectComplete: EventEmitter<ICategory>;

  dataSource: ICategory[];
  private _subscription: Subscription = new Subscription();

  constructor(
    private categoriesService: CategoriesService,
    public dialogRef: MatDialogRef<CategorySelectorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { dataSource: ICategory[] }
  ) {
    this.selectComplete = new EventEmitter();
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

  selectCompleteHandler(item: ICategory): void {
    this._subscription.add(
      this.categoriesService.read(item.id).subscribe(
        (category: ICategory) => {
          this.selectComplete.emit(category);
        }
      )
    );
  }
}
