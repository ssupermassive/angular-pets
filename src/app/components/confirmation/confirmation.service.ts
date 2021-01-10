import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';

enum CONFIRMATION_TYPE {
  ALERT = 'alert',
  CONFIRM = 'confirm'
}

interface IConfirmationDialogOptions {
  type: string,
  message: string
}

@Injectable()
export class ConfirmationService {

  constructor(private matDialog: MatDialog) { }

  open(options: IConfirmationDialogOptions): Observable<boolean> {
    return Observable.create((observer) => {
      const dialogRef = this.matDialog.open(ConfirmationDialogComponent, {
        width: '300px',
        maxWidth: '300px',
        minHeight: '150px',
        data: options
      });

      const subscription = dialogRef.afterClosed().subscribe((result: boolean) => {
        observer.next(result);
        observer.complete();
        subscription.unsubscribe();
      });
    });
  }
}
