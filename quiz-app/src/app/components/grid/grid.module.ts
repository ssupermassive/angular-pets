import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridComponent, GridColumn } from './grid.component';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [GridComponent, GridColumn],
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatCheckboxModule,
    MatPaginatorModule
  ],
  exports: [GridComponent, GridColumn]
})
export class GridModule { }
