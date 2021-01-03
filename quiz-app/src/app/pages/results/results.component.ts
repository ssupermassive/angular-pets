import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { QuizControllerService } from 'src/app/core';
import { Question } from 'src/app/models/questions';

/**
 * Страница результатов тестирования
 * @author Серпаков С.А.
 */
@Component({
  selector: 'ft-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResultsComponent implements OnInit {

  _isCompleted: boolean;
  _questions: Question[];
  protected count: number;
  protected resultColor: string;
  protected result: string;
  testName: string;
  canStartTest: boolean;

  constructor(
    public quizController: QuizControllerService
  ) {}

  ngOnInit(): void {
    // перекладываю всё на стейт, что бы страница не лдергалась при переходах
    this._isCompleted = this.quizController.isCompleted;
    this._questions = this.quizController.questions;
    this.count = this.quizController.correctAnswersCount;
    this.result = this.quizController.result;
    this.testName = this.quizController.testName;
    this.resultColor = this.quizController.resultColor;
    this.canStartTest = this.quizController.canStartTest;
  }
}
