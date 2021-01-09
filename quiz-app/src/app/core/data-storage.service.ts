import { inject } from '@angular/core';
import { LocalStorageService } from './local-storage.service';

/**
 * Абстрактный класс хранилища данных.
 * Содержит логику получения и сохранения данных по токену
 */
export abstract class DataStorageService<T> {

  private localStorage: LocalStorageService;

  constructor(public data: T[], protected token: string) {

    const localStorage = inject(LocalStorageService);

    if (localStorage) {

      this.localStorage = localStorage;
      const storageData = this.localStorage.getItem(this.token);

      if (storageData) {
        this.data = [...storageData];
      }
    }
  }

  updateData(data: T[]): void {
    this.localStorage.setItem(this.token, data)
    this.data = data;
  }
}
