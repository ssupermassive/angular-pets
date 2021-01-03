import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

import {OpenerModule} from '../opener';

import { SelectorLinkComponent } from './selector-link/selector-link.component';
import { SelectorDialogComponent } from './selector-dialog/selector-dialog.component';
import { SelectorListDirective } from './selector-list.directive';

@NgModule({
  declarations: [
    SelectorLinkComponent,
    SelectorDialogComponent,
    SelectorListDirective
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatIconModule,
    OpenerModule
  ],
  exports: [
    SelectorLinkComponent,
    SelectorDialogComponent,
    SelectorListDirective
  ]
})
export class SelectorModule { }
