import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

/**
 * Компонент содержащий типовой шаблон страницы сервиса
 */
@Component({
  selector: 'ft-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageComponent {

  /**
   * Настройки шапки
   */
  @Input() headerButtonsConfig: object = {};

  /**
   * Включает скролл в области контента
   */
  @Input() scrolledContent: boolean = true;

  /**
   * Отвечает за отображение футера
   */
  @Input() showFooter: boolean = true;

  constructor() { }

}
