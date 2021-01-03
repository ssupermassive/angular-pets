import { Component, Inject, ChangeDetectionStrategy} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IConfirmationData } from './IConfirmationData';

/**
 * Компонент диалога подтверждения/уведомления
 */
@Component({
  selector: 'ft-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmationDialogComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IConfirmationData) { }
}
