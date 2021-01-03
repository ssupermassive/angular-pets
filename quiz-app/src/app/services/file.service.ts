import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const API_URL = `${location.origin}/api/v1/files/`;

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private http: HttpClient) { }

  /**
   * Загрузка файла
   * @param file;
   * @param folder;
   */
  upload(file: File, folder: string): Observable<number> {
    const fd = new FormData();
    fd.append('file', file);

    return this.http.post(`${API_URL}${folder}`, fd).pipe(map((result: number) => result));
  }

  /**
   * Удаление файла по ключу
   * @param key;
   */
  delete(key: number): Observable<any> {
    return this.http.delete(`${API_URL}${key}`);
  }

  /**
   * Получение ссылки на файл по идентификатору
   * @param id;
   */
  getFileLink(key: number): string {
    if (key) {
      return `${API_URL}${key}`;
    }
    return null;
  }
}
