import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { HomeResolver } from './home-resolver';
import { CategoriesService } from 'src/app/services/categories';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { TileViewModule } from 'src/app/components/tile-view';
import { PageModule } from 'src/app/components/page';
import { GridModule } from 'src/app/components/grid';
import { TimerModule } from 'src/app/components/timer';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    resolve: { categories: HomeResolver },
  }
]

/**
 * Модуль стартовой страницы
 * @author Серпаков С.А.
 */
@NgModule({
  declarations: [HomeComponent],
  providers: [
    HomeResolver,
    CategoriesService
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    TileViewModule,
    PageModule,
    RouterModule.forChild(routes),
    GridModule,
    MatButtonModule,
    TimerModule
  ]
})
export class HomeModule { }
