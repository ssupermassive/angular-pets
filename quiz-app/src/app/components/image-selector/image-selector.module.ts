import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageSelectorComponent } from './image-selector.component';
import { MatIconModule} from '@angular/material/icon';
import { FileSelectionButtonModule } from 'src/app/components/file-selection-button'

@NgModule({
  declarations: [ImageSelectorComponent],
  imports: [
    CommonModule,
    FileSelectionButtonModule,
    MatIconModule
  ],
  exports: [
    ImageSelectorComponent
  ]
})
export class ImageSelectorModule { }
