import { Injectable } from '@angular/core';

/**
 * Сервис для работы с LocalStorage
 */
@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  setItem(key: string, value: any) {

    const valueAsStr = typeof value === 'string' ? value : JSON.stringify(value);
    window?.localStorage.setItem(key, valueAsStr);
  }

  getItem(key: string): any {
    return JSON.parse(window.localStorage.getItem(key));
  }
}
