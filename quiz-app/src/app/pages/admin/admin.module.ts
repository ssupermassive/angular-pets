import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatSelectModule} from '@angular/material/select';
import { FilterLineComponent } from './components/filter-line/filter-line.component';
import { CategoriesListComponent } from './components/categories-list/categories-list.component';
import { QuestionsListComponent } from './components/questions-list/questions-list.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {CategoriesResolver} from 'src/app/services/categories';
import {QuestionsModule} from 'src/app/questions';
import {ConfirmationModule} from 'src/app/components/confirmation';
import { OpenerModule } from 'src/app/components/opener';
import { GridModule } from 'src/app/components/grid';
import { TreeModule } from 'src/app/components/tree';
import { PageModule } from 'src/app/components/page';
import { ScrollContainerModule } from 'src/app/components/scroll-container';
import { CategoriesComponent } from './tabs/categories/categories.component';
import { FeedbackComponent } from './tabs/feedback/feedback.component';
import { MatTabsModule } from '@angular/material/tabs';
import { FeedbackResolver, FeedbackService } from 'src/app/services/feedback';
import { AdminService } from './services/admin.service';
import { AdminResolver } from './services/admin.resolver';
import { CategoryModule } from 'src/app/category';
import { CategoriesService } from 'src/app/services/categories';
import { QuestionsService } from 'src/app/services/questions';

const routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: '/admin/categories',
        pathMatch: 'full',
      },
      {
        path: 'categories',
        component: CategoriesComponent,
        resolve: {
          adminData: AdminResolver
        },
        data: {
          categoriesFilter: {
            enableServiceCategory: true
          }
        }
      },
      {
        path: 'feedback',
        component: FeedbackComponent,
        resolve: {
          feedback: FeedbackResolver
        }
      }
    ]
  }
];

/**
 * Модуль страницы Администратора
 * @author Серпаков С.А.
 */
@NgModule({
  declarations: [
    AdminComponent,
    FilterLineComponent,
    CategoriesListComponent,
    QuestionsListComponent,
    CategoriesComponent,
    FeedbackComponent
  ],
  providers: [
    CategoriesResolver,
    FeedbackResolver,
    FeedbackService,
    CategoriesService,
    QuestionsService,
    AdminService,
    AdminResolver
  ],
  imports: [
    MatTableModule,
    MatIconModule,
    MatSidenavModule,
    MatSelectModule,
    MatDialogModule,
    CommonModule,
    MatButtonModule,
    RouterModule.forChild(routes),
    QuestionsModule,
    GridModule,
    TreeModule,
    PageModule,
    ConfirmationModule,
    OpenerModule,
    MatTabsModule,
    CategoryModule,
    ScrollContainerModule
  ],
  exports: [
    RouterModule
  ]
})
export class AdminModule { }
