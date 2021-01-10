import { Injectable } from '@angular/core';
import { QUIZ_STATE } from './QuizState.enum';
import { Question } from 'src/app/models/questions';
import { Router } from '@angular/router';
import { LocalStorageService } from '../local-storage.service';

enum RESULT_COLORS {
  BAD = 'red',
  NORMAL = 'orange',
  GOOD = 'green'
}

enum RESULT {
  NORMAL = 50,
  GOOD = 75
}

const FIRST_TEST_STARTED_TIME = 'FIRST_TEST_STARTED_TIME';
const STARTED_TEST_COUNT = 'STARTED_TEST_COUNT'
const MAX_STARTED_TEST_COUNT = 5;
const MS_IN_ONE_DAY = 86400000;

/**
 * Время на один вопрос
 */
const ANSWER_TIME = 120000;

/**
 * Максимальное время тестирования
 */
const MAX_TESTING_TIME = 3600000;

/**
 * Сервис, контролирующий состояние прохождения теста
 */

@Injectable({
  providedIn: 'root'
})
export class QuizControllerService {

  /**
   * Текущее состояние тестирования
   */
  private _state: number = QUIZ_STATE.NOT_STARTED;

  /**
   * Идентификатор теста
   */
  private _key: number;

  /**
   * Вопросы для тестирования
   */
  private _questions: Question[];

  /**
   * Название теста
   */
  private _name: string;

  /**
   * Результат прохождения тестирования
   */
  private _result: number = null;

  /**
   * Количество правильных ответов
   */
  private _correctAnswersCount: number;

  /**
   * Время тестирования
   */
  private _time: number;

  /**
   * Количество запущенных тестов
   */
  private _startedCount: number = 0;


  /**
   * Время запуска первого теста за день
   */
  private _firstTestStartedTime: number;

  constructor(
    private router: Router,
    private localStorageService: LocalStorageService
  ) { }

  /**
   * Название теста
   */
  get testName(): string {
    return this._name;
  }

  /**
   * Время тестирования
   */
  get testingTime(): number {
    return this._time;
  }

  /**
   * Тест начат
   */
  get isStarted(): boolean {
    return this._state === QUIZ_STATE.STARTED;
  }

  /**
   * Тест успешно завершен
   */
  get isCompleted(): boolean {
    return this._state === QUIZ_STATE.COMPLETED;
  }

  /**
   * Тест завершился по истечению времени
   */
  get isOutOfTime(): boolean {
    return this._state === QUIZ_STATE.TIME_IS_OVER;
  }

  /**
   * В тесте нет вопросов
   */
  get isEmpty(): boolean {
    return this._state === QUIZ_STATE.EMPTY;
  }

  /**
   * Тест был завершен
   */
  get isFinished(): boolean {
    return this.isCompleted || this._state === QUIZ_STATE.TIME_IS_OVER;
  }

  /**
   * Возвращает результаты тестирования
   */
  get result(): string {
    return String(this._result);
  }

  get resultColor(): RESULT_COLORS {
    if (this._result < RESULT.GOOD) {
      return this._result < RESULT.NORMAL ? RESULT_COLORS.BAD : RESULT_COLORS.NORMAL;
    }

    return RESULT_COLORS.GOOD;
  }

  /**
   * Возвращает количество вопросов, на которые был дан правильный ответ
   */
  get correctAnswersCount(): number {
    return this._correctAnswersCount;
  }

  get questions(): Question[] {
    return this._questions;
  }
  /**
   * Устанавливает вопросы для тестирования
   * @param questions;
   */
  set questions(questions: Question[]) {
    if (!questions || !questions.length) {
      this._state = QUIZ_STATE.EMPTY;
      return;
    }

    this._questions = questions;

    // вычисление времени тестирования
    const testingTime = this._questions.length * ANSWER_TIME;
    this._time = testingTime > MAX_TESTING_TIME ? MAX_TESTING_TIME : testingTime;

    this._questions = questions;
  }

  get canStartTest(): boolean {
    return this._startedCount !== MAX_STARTED_TEST_COUNT;
  }

  get attemptsCount(): number {
    return MAX_STARTED_TEST_COUNT - this._startedCount;
  }

  get quizWillBeAvailableTime(): number {
    const tzOffset = Math.abs(new Date().getTimezoneOffset()) * 60 * 1000;
    return MS_IN_ONE_DAY - (Date.now() - this._firstTestStartedTime) - tzOffset;
  }

  /**
   * Начать тест
   * @param key;
   * @param name;
   */
  startTest(key: number, name: string): void {
    if (this.canStartTest) {
      this._incrementStartedCount();
      this._updateFirstTestStartedTime();
      this._key = key;
      this._name = name;
      this._state = QUIZ_STATE.STARTED;
      this.router.navigate(['test', key]);
    }
  }

  /**
   * Завершает тест
   * @param timeIsOver Закончить тест
   */
  endTest(timeIsOver?: boolean): void {

    // если вышло время, ничего считать не надо
    if (timeIsOver) {
      this._state = QUIZ_STATE.TIME_IS_OVER;
      this.router.navigate(['results']);
      return;
    }

    let totals = 0;
    this._questions.forEach((item: Question) => {
      if (item.isCorrectly) {
        totals++;
      }
    });

    this._result = Math.round(100 * totals / this._questions.length);
    this._correctAnswersCount = totals;
    this._state = QUIZ_STATE.COMPLETED;
    this.router.navigate(['results']);
  }

  /**
   * Повторить последний тест
   */
  repeatLastTest(): void {
    this.startTest(this._key, this._name);
  }

  /**
   * Очищает всю информацию о последнем тестировании
   */
  clear(): void {
    this.router.navigate(['home']);
    this._correctAnswersCount = null;
    this._key = null;
    this._name = null;
    this._questions = null;
    this._result = null;
    this._time = null;
    this._state = QUIZ_STATE.NOT_STARTED;
  }

  updateUserQuizState(): void {
    const startedCount = this.localStorageService.getItem(STARTED_TEST_COUNT);
    const startedTime = this.localStorageService.getItem(FIRST_TEST_STARTED_TIME);

    // если ещё ни одного теста не было запущенно, обновлять нечего
    if (!startedCount) {
      return;
    }

    // если уже прошли сутки, то сбрасываем значения в сторадже
    if (this._canResetStartedTime(startedTime)) {
      this.localStorageService.setItem(STARTED_TEST_COUNT, 0);
      this.localStorageService.setItem(FIRST_TEST_STARTED_TIME, null);
      this._startedCount = 0;
      this._firstTestStartedTime = null;
      return;
    }

    this._startedCount = startedCount || 0;
    this._firstTestStartedTime = startedTime || null;
  }

  /**
   * Проверяет, можно ли сбросить время начала первого теста за сутки
   * @param startedTime;
   */
  private _canResetStartedTime(startedTime: number): boolean {
    return Date.now() - MS_IN_ONE_DAY > startedTime;
  }

  /**
   * Увеличивает количество запущенных тестов
   */
  private _incrementStartedCount(): void {
    ++this._startedCount;
    this.localStorageService.setItem(STARTED_TEST_COUNT, this._startedCount);
  }

  /**
   * Обновляет время запуска первого теста
   */
  private _updateFirstTestStartedTime(): void {
    if (!this._firstTestStartedTime) {
      this._firstTestStartedTime = Date.now();
      this.localStorageService.setItem(
        FIRST_TEST_STARTED_TIME,
        this._firstTestStartedTime
      );
    }
  }
}
