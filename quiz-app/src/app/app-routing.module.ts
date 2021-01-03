import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/home'
  },
  {
    path: 'home',
    loadChildren: () => import('src/app/pages/home').then(
      (m) => {
        return m.HomeModule
      })
  },
  {
    path: 'test/:category',
    loadChildren: () => import('src/app/pages/testing').then(m => m.TestingModule)
  },
  {
    path: 'results',
    loadChildren: () => import('src/app/pages/results').then(m => m.ResultsModule)
  },
  {
    path:'admin',
    loadChildren: () => import('src/app/pages/admin').then(m => m.AdminModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
