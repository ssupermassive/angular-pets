import { Component, OnInit, OnDestroy, Inject, ChangeDetectionStrategy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ICategory } from 'src/app/models/categories/ICategory.model';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService } from 'src/app/components/confirmation';
import { Subscription } from 'rxjs'

/**
 * Компонент диалога редактирования категории
 * @author Серпаков С.А.
 */
@Component({
  selector: 'ft-category-dialog',
  templateUrl: './category-dialog.component.html',
  styleUrls: ['./category-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryDialogComponent implements OnInit {

  /**
   * Экземпляр формы
   * @type {FormGroup}
   */
  _form: FormGroup;

  /**
   * Идентификатор родительской категории
   */
  parentCategoryKey: number = null;

  /**
   * Заголовок диалогового окна
   */
  dialogTitle: string;

  private _subscription: Subscription = new Subscription();

  constructor(
    public dialogRef: MatDialogRef<CategoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { category: ICategory },
    private categoriesService: CategoriesService,
    private confirmation: ConfirmationService) { }

  ngOnInit(): void {
    const category = this.data.category;

    const name = category ? category.name : '';
    const description = category ? category.description : '';
    this.parentCategoryKey = category ? category.parent : null;

    this.dialogTitle = !!this.parentCategoryKey ? 'Категория' : 'Группа категорий';

    this._form = new FormGroup({
      name: new FormControl(name, Validators.required),
      description: new FormControl(description)
    });
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  /**
   * Обработчик события отправки формы
   */
  _submitHandler(): void {
    if (this._form.valid) {
      const category = this.data.category;
      const name = this._form.get('name').value;
      const description = this._form.get('description').value;

      // если это редактирование, то попадем сюда
      if (category?.id) {
        category.name = name;
        category.description = description;
        this._subscription.add(
          this.categoriesService.update(category).subscribe(() => {
            this.dialogRef.close(category);
          })
        );
        return;
      }

      const newCategory = {
        id: null,
        name,
        description,
        itemType: !this.parentCategoryKey,
        parent: this.parentCategoryKey
      };

      this._subscription.add(
        this.categoriesService.create(newCategory).subscribe(() => {
          this.dialogRef.close(category);
        })
      );
      return;
    }

    this._subscription.add(
      this.confirmation.open({
        type: 'alert',
        message: 'Необходимо заполнить обязательные поля'
      }).subscribe()
    );
  }

  /**
   * Обработчик клика на крестик закрытия
   */
  _close(): void {
    if (this._form.dirty) {
      this._subscription.add(
        this.confirmation.open({
          type: 'confirm',
          message: 'Сохранить изменения?'
        }).subscribe((result: boolean) => {
          if (result) {
            this._submitHandler();
            return;
          }
          this.dialogRef.close();
        })
      );
      return;
    }
    this.dialogRef.close();
  }
}
