import {
  Component,
  ContentChild,
  Input,
  AfterContentInit,
  ChangeDetectionStrategy
} from '@angular/core';

import { MatDialogRef } from '@angular/material/dialog';
import {SelectorListDirective} from '../selector-list.directive';

@Component({
  selector: 'ft-selector-dialog',
  templateUrl: './selector-dialog.component.html',
  styleUrls: ['./selector-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectorDialogComponent implements AfterContentInit {

  @Input() dialogTitle: string;
  @Input() dialogRef: MatDialogRef<any>;
  @ContentChild(SelectorListDirective) selector: SelectorListDirective;

  ngAfterContentInit() {
    if (this.selector) {
      this.selector.selectComplete = this.selectComplete.bind(this);
    }
  }

  closeButtonClick(): void {
    this.dialogRef.close();
  }

  selectComplete(selectResult: any): void {
    this.dialogRef.close(selectResult);
  }
}
