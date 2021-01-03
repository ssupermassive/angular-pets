import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable} from 'rxjs';
import { QuizService } from 'src/app/core/quiz/quiz.service';
import { ActivatedRouteSnapshot } from '@angular/router'


/**
 * Сервис, осуществляющий предзапрос данных для кабинете администратора
 * @author Серпаков С.А.
 */
@Injectable()
export class TestingResolver implements Resolve<any> {

  constructor(private quizService: QuizService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    return this.quizService.getQuestionsList(route.params['category']);
  }
}