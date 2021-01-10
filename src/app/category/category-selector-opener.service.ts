import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { DialogOpenerService } from '../components/opener';
import { CategoriesService } from 'src/app/services/categories';
import { ICategory } from 'src/app/models/categories';
import { CategorySelectorComponent } from './category-selector/category-selector.component';

@Injectable()
export class CategorySelectorOpenerService {

  constructor(
    private dialogOpener: DialogOpenerService<ICategory>,
    private categoryService: CategoriesService) {}

  open(filter?: object): Observable<ICategory> {
    return this.dialogOpener.openDialog({
      template: CategorySelectorComponent,
      preloadConfig: [
        {
          service: this.categoryService,
          methodName: 'getList',
          methodParams: [filter],
          resultFieldName: 'dataSource'
        }
      ],
      minWidth: '300px'
    });
  }
}
