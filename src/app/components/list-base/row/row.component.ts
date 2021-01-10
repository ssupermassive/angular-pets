import {
  Component,
  Input,
  TemplateRef,
  ElementRef,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';

import { FlatTreeControl } from '@angular/cdk/tree';
import { IRowAction } from '../interfaces';
import { BaseRowComponent } from '../base-row/base-row.component';

@Component({
  selector: 'ft-row',
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RowComponent extends BaseRowComponent {

  @Input() selectorTemplate: TemplateRef<HTMLElement>;
  @Input() expanderTemplate: TemplateRef<HTMLElement>;
  @Input() expanderData: object;
  @Input() treeControl: FlatTreeControl<any>;

  @Output() rowClick: EventEmitter<object>;

  constructor(
    private hostElement: ElementRef<HTMLElement>,
    protected changeDetector: ChangeDetectorRef
  ) {
    super(changeDetector);
  }

  actionsShowed: boolean = false;

  toggleRowActions(state?: boolean): void {
    this.actionsShowed = !!state;
  }

  mouseOutHandler(event: MouseEvent): void {
    if (!(this.hostElement.nativeElement.contains(event.relatedTarget as HTMLElement))) {
      this.toggleRowActions();
    }
  }

  rowActionClickHandler(event: Event, action: IRowAction): void {
    event.stopPropagation();
    action.handler(this._data);
    this.changeDetector.markForCheck();
  }

  getIconClass(action: IRowAction): string {
    return `ft-${action.iconStyle}`;
  }
}
