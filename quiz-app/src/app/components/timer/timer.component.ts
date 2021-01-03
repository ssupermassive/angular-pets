import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  HostListener
} from '@angular/core';

/** Шаг таймера */
const TIMER_STEP = 1000;

/**
 * Состояния таймера
 * Обозначают количество оставшегося времени
 */
enum TIME_STATE {
  MANY = 'many',
  NORMAL = 'normal',
  LOW = 'low'
}

enum STATE_DIRECTION {
  POSITIVE = 'positive',
  NEGATIVE = 'negative'
}

/**
 * Компонент таймера обратного отсчётв для тестирования
 * @author Серпаков С.А.
 */
@Component({
  selector: 'ft-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimerComponent implements OnInit {

  /**
   * Время, с которого начинается обратный отсчёт
   */
  @Input() set time(value: number) {
    this._time = value;
    this._currentTime = value;
    this._startTimer();
  };

  get time(): number {
    return this._time;
  }

  /**
   * Маска, по которой будет отображаться время
   */
  @Input() timeMask: string = 'mm:ss';

  /**
   * Использовать цветовые состояния при работе таймера в зависимости от оставшегося времени
   */
  @Input() useColorState: boolean = true;

  /**
   * Меняет порядок состояний таймера на противоположный
   */
  @Input() reversedState: boolean = false;

  @Input() fontSize: string = '20px';

  /**
   * Событие, уведомляющее о том, что время истекло
   */
  @Output() timeIsOver: EventEmitter<any>;

  /**
   * Время, с которого начинается обратный отсчёт
   * Нужно для внутренней логики компонента
   */
  _currentTime: number;

  /**
   * Текущее состояние таймера
   */
  _state: string;

  private _timerStartedTime: number;
  private _time: number;

  constructor(private changeDetector: ChangeDetectorRef) {
    this.timeIsOver = new EventEmitter();
  }

  ngOnInit(): void {
    this._state = this.reversedState ? TIME_STATE.LOW : TIME_STATE.MANY;
  }

  /**
   * Запускает обратный отсчет
   */
  private _startTimer(): void {
    this._timerStartedTime = Date.now();

    const manyTime = this._currentTime;
    const normalTime = manyTime / 2;
    const lowTime = normalTime / 2;

    const run = () => {
      this._currentTime -= TIMER_STEP;

      if (this.useColorState) {
        this._setState(normalTime, lowTime);
      }
      this.changeDetector.markForCheck();

      if (this._currentTime) {
        setTimeout(run, 1000);
        return;
      }
      this.timeIsOver.emit();
      return;
    };

    run();
  }

  /**
   * Изменение состояния таймера
   * При изменении состояния меняется и цвет цифр
   * @param normal;
   * @param low;
   */
  private _setState(normal: number, low: number): void {

    if (this._currentTime < low) {
      this._state = this.reversedState ? TIME_STATE.MANY : TIME_STATE.LOW;
      return;
    }

    if (this._currentTime < normal) {
      this._state = TIME_STATE.NORMAL;
      return;
    }
  }

  /**
   * Обработчик события изменения видимости документа
   * Используется что бы актуализировать таймер,
   * т.к. при переключении вкладок браузер замедляет таймеры
   */
  @HostListener('document:visibilitychange')
  private _onVisibilityChangedHandler(): void {
    const diff = Date.now() - this._timerStartedTime;
    const currentTime = this.time - diff;
    if (currentTime <= 0) {
      this.timeIsOver.emit();
      return;
    }

    this._currentTime = currentTime;
    this.changeDetector.markForCheck();
  }
}
