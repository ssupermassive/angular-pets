import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TileViewComponent } from './tile-view.component'

@NgModule({
  declarations: [TileViewComponent],
  imports: [
    CommonModule
  ],
  exports: [
    TileViewComponent
  ]
})
export class TileViewModule { }
