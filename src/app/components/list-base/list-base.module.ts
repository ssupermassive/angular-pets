import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTreeModule } from '@angular/material/tree';
import { TreeRowComponent } from './tree-row/tree-row.component';
import { BaseRowComponent } from './base-row/base-row.component';
import { RowComponent } from './row/row.component';

@NgModule({
  declarations: [
    BaseRowComponent,
    TreeRowComponent,
    RowComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatTreeModule
  ],
  exports: [
    BaseRowComponent,
    RowComponent,
    TreeRowComponent]
})
export class ListBaseModule { }
