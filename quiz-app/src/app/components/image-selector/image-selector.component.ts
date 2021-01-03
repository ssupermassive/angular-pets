import {
  Component,
  Input,
  OnInit,
  OnChanges,
  OnDestroy,
  Output,
  EventEmitter,
  TemplateRef,
  SimpleChanges,
  ChangeDetectionStrategy
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { FileService } from 'src/app/services/file.service';

interface IImageData {
  src: string;
  width: number;
  height: number;
}

// ToDo Переименовать в ImageSelector
@Component({
  selector: 'ft-image-selector',
  templateUrl: './image-selector.component.html',
  styleUrls: ['./image-selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImageSelectorComponent implements OnInit, OnChanges, OnDestroy {

  @Input() key: number;
  @Input() folder: string;
  @Input() width: number = 150;
  @Input() height: number = 150;
  @Input() emptyTemplate: TemplateRef<any>;

  @Output() imageChanged: EventEmitter<number>;

  _showDeleteButton: boolean;
  _imageData: IImageData;

  private _subscription: Subscription = new Subscription();

  constructor(protected domSanitizer: DomSanitizer, private fileService: FileService) {
    this.imageChanged = new EventEmitter();
  }

  ngOnInit(): void {
    this.updateState({
      key: this.key,
      width: this.width,
      height: this.height
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { key } = changes;

    if (key && !key.firstChange &&
      key.currentValue !== key.previousValue) {
      this.updateState({
        key: key.currentValue,
        width: this.width,
        height: this.height
      });
    }
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  /**
   * Обновляет состояние компонента
   * @param data;
   */
  private updateState(data: { key: number, width: number, height: number }): void {
    const { key, width, height } = data;

    this._showDeleteButton = !!key;
    this._imageData = {
      src: this.fileService.getFileLink(key),
      width,
      height
    };
  }

  /**
   * Обработчик события выбора файла
   * @param data;
   */
  _fileChoosedHandler(data: { file: File }): void {
    this._subscription.add(
      this.fileService.upload(data.file, this.folder).subscribe((key: number) => {
        this.imageChanged.emit(key);
      })
    );
  }

  /**
   * Обработчик события клика по кнопке удалить
   */
  _deleteHandler(): void {
    this._subscription.add(
      this.fileService.delete(this.key).subscribe(() => {
        this.imageChanged.emit(null);
      })
    );
  }
}
