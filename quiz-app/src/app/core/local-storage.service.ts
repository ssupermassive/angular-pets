import { Injectable } from '@angular/core';

/**
 * Сервис для работы с LocalStorage
 */
@Injectable()
export class LocalStorageService {

  constructor() { }

  setItem(key: string, value: any) {
    window.localStorage.setItem(key, value);
  }

  getItem(key: string): any {
    return JSON.parse(window.localStorage.getItem(key));
  }
}
