import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ResultsComponent } from './results.component';
import { ResultListComponent } from './components/result-list/result-list.component'
import { TotalsGuard } from './services/totals.guard';
import { TestingFormModule } from 'src/app/components/testing-form'
import { ScrollContainerModule } from 'src/app/components/scroll-container';
import { PageModule } from '../../components/page';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';

const routes = [
  {
    path: '',
    pathMatch: 'full',
    component: ResultsComponent,
    canActivate: [TotalsGuard]
  }
]

/**
 * Модуль старницы результатов тестирования
 * @author Серпаков С.А.
 */
@NgModule({
  declarations: [ResultsComponent, ResultListComponent],
  providers: [TotalsGuard],
  imports: [
    CommonModule,
    TestingFormModule,
    PageModule,
    MatTabsModule,
    MatIconModule,
    ScrollContainerModule,
    RouterModule.forChild(routes)
  ]
})
export class ResultsModule { }
