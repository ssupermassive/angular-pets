import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {TimerModule} from 'src/app/components/timer';
import {TestingFormModule} from 'src/app/components/testing-form';
import {TestingComponent} from './testing.component';
import {QuestionSelectorComponent } from './components/question-selector/question-selector.component';
import {TestingStartGuard} from './services/testing-start.guard';
import {TestingResolver} from './services/testing.resolver';
import {ConfirmationModule} from 'src/app/components/confirmation';
import {CanDeactivateGuard} from 'src/app/core/guards/can-deactivate.guard';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input' ;
import {TextFieldModule} from '@angular/cdk/text-field';
import {PageModule} from 'src/app/components/page';
import {ErrorReportsService} from 'src/app/services/error-reports.service';
import {ScrollContainerModule} from 'src/app/components/scroll-container'

const routes = [
  {
    path: '',
    pathMatch: 'full',
    component: TestingComponent,
    resolve: {questions: TestingResolver},
    canActivate: [TestingStartGuard],
    canDeactivate: [CanDeactivateGuard],
  }
]

/**
 * Модуль страницы тестирования
 * @author Серпаков С.А.
 */
@NgModule({
  declarations: [TestingComponent, QuestionSelectorComponent],
  imports: [
    TestingFormModule,
    TimerModule,
    CommonModule,
    ConfirmationModule,
    MatButtonModule,
    MatInputModule,
    TextFieldModule,
    FormsModule,
    PageModule,
    ScrollContainerModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    TestingResolver,
    TestingStartGuard,
    CanDeactivateGuard,
    ErrorReportsService
  ]
})
export class TestingModule { }
