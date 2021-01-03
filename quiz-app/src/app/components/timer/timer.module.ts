import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimerComponent } from './timer.component'

/**
 * Модуль, содержащий компонент таймера для тестирования
 * @author Серпаков С.А.
 */
@NgModule({
  declarations: [TimerComponent],
  imports: [
    CommonModule
  ],
  exports: [
    TimerComponent
  ]
})
export class TimerModule { }
