import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { QuizControllerService } from 'src/app/core';

/**
 * Гард, запрещающий прямой переход на страницу с тестом до начала тестирования
 * @author Серпаков С.А.
 */
@Injectable()
export class TestingStartGuard implements CanActivate {

  constructor(private quizController: QuizControllerService, private router: Router) { }

  canActivate(): boolean {

    const result = this.quizController.isStarted;

    if (!result) {
      this.router.navigate(['home']);
    }

    return this.quizController.isStarted;
  }
}
