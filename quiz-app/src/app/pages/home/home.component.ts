import {
  Component,
  OnInit,
  OnDestroy,
  AfterContentInit,
  ElementRef,
  ViewChild,
  HostListener,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { QuizControllerService, LocalStorageService } from 'src/app/core';
import { ICategory } from 'src/app/models/categories';
import { AuthService } from 'src/app/core/auth/auth-service';
import { FileService } from 'src/app/services/file.service';
import {
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/animations';
import { Subscription } from 'rxjs';

const MIN_OFFSET_FOR_SHOW_SHADOW = 10;
const IS_NOT_FIRST_VISIT = 'FT_IS_NOT_FIRST_VISIT';

/**
 * Компонент стартовой страницы
 * @author Серпаков С.А.
 */
@Component({
  selector: 'ft-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('animateTitle', [
      state('hidden', style({
        opacity: 0
      })),
      state('visible', style({
        opacity: 1
      })),
      transition('hidden  => visible', [
        animate('0.5s')
      ])
    ]),
    trigger('animateBeginButton', [
      state('hidden', style({
        opacity: 0
      })),
      state('visible', style({
        opacity: 1
      })),
      transition('hidden  => visible', [
        animate('0.5s 0.5s')
      ])
    ])
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit, AfterContentInit, OnDestroy {

  /**
   * Количество попыток прохождения теста
   */
  attemptsCount: number;

  /**
   * Время, через которое тесты будут снова доступны
   */
  quizWillBeAvailableTime: number;
  /**
   * Список категорий, доступных для выбора
   */
  _categories: ICategory[];

  /**
   * Признак проскроллености контента
   */
  _contentScrolled: boolean = false;

  /**
   * Состояние анимации
   */
  private _animateState: string = 'hidden';
  private _subscription: Subscription = new Subscription();

  @ViewChild('tests') tests: ElementRef;

  get animateState(): string {
    return this._animateState;
  }

  private get _isFirstVisit(): boolean {
    return !this.localStorage.getItem(IS_NOT_FIRST_VISIT);
  }

  private set _isFirstVisit(value: boolean) {
    this.localStorage.setItem(IS_NOT_FIRST_VISIT, !value);
  }

  constructor(
    public authService: AuthService,
    public fileService: FileService,
    private localStorage: LocalStorageService,
    private quizController: QuizControllerService,
    private route: ActivatedRoute,
    private changeDetector: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.updateTestsAvailableState();

    this._updateAnimationState();
    this._subscription.add(
      this.route.data.subscribe((data: Data) => {
        this._categories = data.categories;
      })
    );
  }

  ngAfterContentInit(): void {
    setTimeout(() => {
      this._animateState = 'visible';
      this.changeDetector.markForCheck();
    }, 500);
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  private _updateAnimationState(): void {
    if (this._isFirstVisit) {
      this._animateState = 'hidden';
      this._isFirstVisit = false;
    } else {
      this._animateState = 'visible';
    }
  }

  beginButtonClick(): void {
    this.tests.nativeElement.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }

  /**
   * Начало тестирования
   * @param code - код категории
   */
  _beginTest(item: ICategory): void {
    this.quizController.startTest(item.id, item.name);
  }

  /**
   * Обновляет состояние доступности тестов
   */
  updateTestsAvailableState(): void {
    this.quizController.updateUserQuizState();
    this.attemptsCount = this.quizController.attemptsCount;
    this.quizWillBeAvailableTime = this.quizController.quizWillBeAvailableTime;
  }

  @HostListener('window:scroll')
  scrollHandler(): void {
    this._contentScrolled = pageYOffset > MIN_OFFSET_FOR_SHOW_SHADOW;
  }
}
