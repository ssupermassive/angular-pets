import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogOpenerService } from './dialog-opener.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatDialogModule
  ],
  providers: [DialogOpenerService]
})
export class OpenerModule { }
