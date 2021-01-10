import {
  Component,
  Input,
  Output,
  EventEmitter,
  TemplateRef,
  ChangeDetectionStrategy
} from '@angular/core';

@Component({
  selector: 'ft-tile-view',
  templateUrl: './tile-view.component.html',
  styleUrls: ['./tile-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TileViewComponent {

  /**
   * Ширина тайла в пикселях
   */
  @Input() tileWidth: string = '320px';

  /**
   * Шаблон тайла
   */
  @Input() tileTemplate: TemplateRef<HTMLElement>;

  /**
   * Набор данных для отображения
   */
  @Input() items: object[];

  /**
   * Текст, который будет отображаться если значения отсутствуют
   */
  @Input() emptyText: string = 'Нет данных :(';

  @Input() tileHovered: boolean = true;


  @Output() tileClick: EventEmitter<object>;

  constructor() {
    this.tileClick = new EventEmitter();
  }

  protected _tileClick(item: object): void {
    this.tileClick.emit(item);
  }
}
