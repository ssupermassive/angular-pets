import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable} from 'rxjs';
import { CategoriesService } from 'src/app/services/categories';

/**
 * Сервис, осуществляющий предзапрос данных для стартовой страницы
 * @author Серпаков С.А.
 */
@Injectable()
export class HomeResolver implements Resolve<any> {

  constructor(private categoriesService: CategoriesService) { }

  resolve(): Observable<any> {
    return this.categoriesService.getList({itemType: true});
  }
}