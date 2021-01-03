import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { AdminService } from './admin.service';


/**
 * Сервис, осуществляющий предзапрос данных для кабинете администратора
 * @author Серпаков С.А.
 */
@Injectable()
export class AdminResolver implements Resolve<any> {

  constructor(private adminService: AdminService) { }

  resolve(): Observable<any> {
    return forkJoin([
      this.adminService.getCategories(),
      this.adminService.getQuestions()]).pipe(
        map((result) => {
          const [categories, questions] = result;
          return { categories, questions };
        })
      );
  }
}
