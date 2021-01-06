import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';

/**
 * Абсрактный сервис хранилища
 * Содержит логику получения и сохранения данных по токену
 */
@Injectable()
export abstract class DataStorageService<T> {

  /**
   * Токен для получения/сохранения данных
   */
  protected token: string;

  /**
   * Данные
   */
  data: T[];

  constructor(private localStorage: LocalStorageService) {

    const storageData = this.localStorage.getItem(this.token);

    if (storageData) {
      this.data = storageData;
    }
  }

  updateData(data: T[]): void {
    this.localStorage.setItem(this.token, data)
    this.data = data;
  }
}
