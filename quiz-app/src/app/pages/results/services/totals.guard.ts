import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { QuizControllerService, TESTING_STATE } from 'src/app/core';

/**
 * Гард, определяющий, может ли юзер попасть на страницу с итогами тестирования
 * @author Серпаков С.А.
 */
@Injectable()
export class TotalsGuard implements CanActivate {

  constructor(private quizController: QuizControllerService, private router: Router) { }

  canActivate() {

    if (this.quizController.isFinished) {
      return true;
    }

    this.router.navigate(['home']);
    return false;
  }
}
