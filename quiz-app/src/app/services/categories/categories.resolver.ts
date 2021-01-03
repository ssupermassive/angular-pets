import {Injectable} from '@angular/core';
import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import { Observable} from 'rxjs';
import {CategoriesService} from './categories.service';
import {ICategory} from 'src/app/models/categories/ICategory';

/**
 * Сервис, осуществляющий предзапрос списка категорий
 * @author Серпаков С.А.
 */
@Injectable()
export class CategoriesResolver implements Resolve<any> {

  constructor(private categoryService: CategoriesService){}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<ICategory[]> {
    return this.categoryService.getList(route.data.categoriesFilter || {});
  }
}