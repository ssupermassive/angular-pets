import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common';
import { TestingFormComponent } from './testing-form.component';
import { ImageSelectorModule } from 'src/app/components/image-selector'
import { HighlightModule } from 'ngx-highlightjs';
import { MatIconModule } from '@angular/material/icon';

/**
 * Модуль, содержащий компонент формы тестирования
 * @author Серпаков С.А.
 */
@NgModule({
  declarations: [TestingFormComponent],
  imports: [
    CommonModule,
    ImageSelectorModule,
    ReactiveFormsModule,
    HighlightModule,
    MatIconModule
  ],
  exports: [TestingFormComponent]

})
export class TestingFormModule { }
