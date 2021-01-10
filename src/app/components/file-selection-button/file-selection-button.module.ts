import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule} from '@angular/material/icon';
import { FileSelectionButtonComponent } from './file-selection-button'

@NgModule({
  declarations: [
    FileSelectionButtonComponent
  ],
  imports: [
    CommonModule,
    MatIconModule
  ], 
  exports: [
    FileSelectionButtonComponent
  ]
})
export class FileSelectionButtonModule { }
