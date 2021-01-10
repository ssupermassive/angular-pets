import { Input, Output, Component, EventEmitter, TemplateRef, ChangeDetectorRef } from '@angular/core';
import { IRow, IRowAction } from '../interfaces';

@Component({
  template: ''
})
export class BaseRowComponent implements IRow {

  @Input() rowContent: TemplateRef<HTMLElement>;
  @Input() rowActions: IRowAction[];
  @Input() marked: boolean;
  @Input() border: boolean;
  @Input() set data(value: any) {
    this._data = value;
    this.changeDetector.markForCheck();
  }

  @Output() rowClick: EventEmitter<object>;

  _data: any

  constructor(protected changeDetector: ChangeDetectorRef) {
    this.rowClick = new EventEmitter();
  }

  rowClickHandler(): void {
    this.rowClick.emit(this._data);
  }
}
