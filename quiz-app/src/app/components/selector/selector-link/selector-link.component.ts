import {
  Component,
  Input,
  Output,
  EventEmitter,
  forwardRef,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';

import { DialogOpenerService, IDialogOptions } from '../../opener';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

/**
 * Компонент - ссылка для выбора записей из справочника
 */
@Component({
  selector: 'ft-selector-link',
  templateUrl: './selector-link.component.html',
  styleUrls: ['./selector-link.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SelectorLinkComponent),
    multi: true,
  }],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectorLinkComponent implements ControlValueAccessor  {

  private _selectedItem: object;
  private _onChanged(value: object): void {}

  @Input() emptyText: string;
  @Input() displayProperty: string;
  @Input() selectorConfig: IDialogOptions;

  @Input() set value(value: object) {
    this._selectedItem = value;
    this._onChanged(this._selectedItem);
  }

  get value(): object {
    return this._selectedItem;
  }

  @Output() itemChanged: EventEmitter<object>;


  constructor(
    private opener: DialogOpenerService<any>,
    private changeDetector: ChangeDetectorRef
    ) {
    this.itemChanged = new EventEmitter();
  }

  /**
   * Открывает диалог выбора
   */
  openSelector(): void {
    if (this.selectorConfig) {
      const subscription = this.opener.openDialog(
        this.selectorConfig
      ).subscribe((selected?: object) => {
        if (selected) {
          this._updateItem(selected);
          subscription.unsubscribe();
        }
      });
    }
  }

  writeValue(value: object): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this._onChanged = fn;
  }
  
  registerOnTouched(fn: any): void {
    // ToDo 3.9
  }

  /**
   * Сбрасывает текущую выбранную запись
   */
  resetItem(event: Event): void {
    event.stopPropagation();
    this._updateItem(null);
  }

  private _updateItem(newItem: object): void {
    this.value =  newItem;
    this.itemChanged.emit(this.value);
    this.changeDetector.markForCheck();
  }
}
