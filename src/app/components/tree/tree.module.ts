import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeComponent } from './tree.component';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { ListBaseModule } from '../list-base';

@NgModule({
  declarations: [TreeComponent],
  imports: [
    CommonModule,
    MatTreeModule,
    MatIconModule,
    ListBaseModule
  ],
  exports: [TreeComponent]
})
export class TreeModule { }
