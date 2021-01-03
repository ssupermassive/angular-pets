import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Data, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { QuizControllerService } from 'src/app/core';
import { Question } from 'src/app/models/questions';
import { CanComponentDeactivate } from 'src/app/core/guards/CanComponentDeactivate';
import { ConfirmationService } from 'src/app/components/confirmation';
import { ErrorReportsService } from 'src/app/services/error-reports.service';
import { Observable, Subscription } from 'rxjs';

/**
 * Страница тестирования
 * @author Серпаков С.А.
 */
@Component({
  selector: 'ft-test',
  templateUrl: './testing.component.html',
  styleUrls: ['./testing.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TestingComponent implements OnInit, OnDestroy, CanComponentDeactivate {

  /**
   * Вопросы для тестирования
   */
  _questions: Question[];

  protected testName: string;

  /**
   * Текущий вопрос
   */
  protected currentQuestion: Question;

  /**
   * Номер текущего вопроса
   */
  protected currentQuestionIndex: number = 0;

  /**
   * Отвечает за отображение поля обратной связи
   */
  protected _showFeedback: boolean = false;

  protected _feedbackText: string;

  private _subscription: Subscription = new Subscription();

  constructor(
    private errorReportsService: ErrorReportsService,
    private quizController: QuizControllerService,
    private route: ActivatedRoute,
    private confirmation: ConfirmationService,
    private changeDetector: ChangeDetectorRef
  ) { }

  ngOnInit(): void {

    this._subscription.add(
      this.route.data.subscribe((data: Data) => {
        this._questions = data.questions;
        this.quizController.questions = data.questions;

        if (this.quizController.isEmpty) {
          return;
        }

        const [currentQuestion] = this._questions;
        this.currentQuestion = currentQuestion;
      })
    );
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  /**
   * Изменить текущий вопрос
   * @param id;
   */
  _changeCurrentQuestion(id: number): void {

    if (this.currentQuestion.id === id) {
      return;
    }

    for (let i = 0; i < this._questions.length; i++) {
      if (this._questions[i].id === id) {
        this.currentQuestion = this._questions[i];
        this.currentQuestionIndex = i;
        break;
      }
    }
  }

  /**
   * Обработчик получения ответа на вопрос
   * @param isCorrect;
   */
  _answerReceived(isCorrect: boolean): void {

    this._toggleFeedbackField(false);
    this._feedbackText = '';

    // ищем следующий вопрос, на который ещё не был дан ответ
    for (let i = this.currentQuestionIndex + 1; i < this._questions.length; i++) {
      if (!this._questions[i].answered) {
        this.currentQuestion = this._questions[i];
        this.currentQuestionIndex = i;
        return;
      }
    }

    // если не нашли следующий вопрос, ищем предыдущий
    for (let i = 0; i < this.currentQuestionIndex; i++) {
      if (!this._questions[i].answered) {
        this.currentQuestion = this._questions[i];
        this.currentQuestionIndex = i;
        return;
      }
    }

    this.quizController.endTest();
  }

  /**
   * Обработчик окончания времени тестирования
   * Перебрасывает на страницу результатов
   */
  protected _timeIsOver(): void {
    this.quizController.endTest(true);
  }

  /**
   * Показывает / скрывает поле обратной связи
   * @param value
   */
  protected _toggleFeedbackField(value: boolean): void {
    this._showFeedback = value;
  }

  /**
   * Отправка сообщения об ошибке.
   */
  protected _sendFeedback(): void {
    if (this._feedbackText) {
      this._subscription.add(
        this.errorReportsService.create({
          text: this._feedbackText,
          questionId: this.currentQuestion.id
        }).subscribe(() => {
          this._toggleFeedbackField(false);
          this._feedbackText = '';
          this.changeDetector.markForCheck();
        })
      );
    }
  }

  canDeactivate(
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState: RouterStateSnapshot): boolean | Observable<boolean> {
    if (this.quizController.isStarted && nextState.url !== '/results') {
      return this.confirmation.open({
        type: 'confirm',
        message: 'Прогресс текущего тестирования будет потерян. Завершить тестирование?'
      });
    }

    return true;
  }
}
