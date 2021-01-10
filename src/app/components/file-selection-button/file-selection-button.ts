import { Component, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'ft-file-selection-button',
  templateUrl: './file-selection-button.html',
  styleUrls: ['./file-selection-button.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileSelectionButtonComponent {

  /**
   * События завершения выбора файлов
   */
  @Output() fileChoosed: EventEmitter<any>;

  constructor() {
    this.fileChoosed = new EventEmitter();
  }

  /**
   * Обработчик завершения выбора файла
   * @param files;
   */
  _fileChoosedHandler(files: FileList): void {
    const file = files[0];
    this.fileChoosed.emit({file});
  }
}
