import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';
import { ConfirmationService } from './confirmation.service'

@NgModule({
  declarations: [ConfirmationDialogComponent],
  imports: [
    CommonModule,
    MatDialogModule
  ],
  entryComponents: [ConfirmationDialogComponent],
  providers: [ConfirmationService]
})
export class ConfirmationModule { }
