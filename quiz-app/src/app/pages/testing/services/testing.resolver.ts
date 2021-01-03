import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable} from 'rxjs';
import { ActivatedRouteSnapshot } from '@angular/router'
import { QuestionsService } from 'src/app/services/questions';

/**
 * Сервис, осуществляющий предзапрос данных для кабинете администратора
 * @author Серпаков С.А.
 */
@Injectable()
export class TestingResolver implements Resolve<any> {

  constructor(private questionsService: QuestionsService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    return this.questionsService.getList({
      publish: true,
      random: true,
      category: Number(route.params['category'])
    });
  }
}