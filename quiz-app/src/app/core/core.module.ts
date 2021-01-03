import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { LocalStorageService } from './local-storage.service';

@NgModule({
  imports: [
    HttpClientModule,
    CommonModule
  ],
  providers: [
    LocalStorageService
  ]
})
export class CoreModule { }
