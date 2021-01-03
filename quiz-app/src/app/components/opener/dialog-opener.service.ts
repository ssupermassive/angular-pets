import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, forkJoin } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { IDialogOptions, IPreloadConfig } from './interfaces';

/**
 * Сервис, позволяющий открыть диалоговое окно.
 */
@Injectable({
  providedIn: 'root'
})
export class DialogOpenerService<T> {

  constructor(private matDialog: MatDialog) { }

  /**
   * Открывает диалоговое окно
   * @param dialogOptions - настройки диалога
   */
  openDialog(dialogOptions: IDialogOptions): Observable<T> {
    const { template, ...options } = dialogOptions;

    // если задан preloadConfig, то перед открытием диалог нужно запросить данные для него
    if (dialogOptions.preloadConfig && dialogOptions.preloadConfig.length) {
      return forkJoin(dialogOptions.preloadConfig.map((config: IPreloadConfig) => {
        return config.service[config.methodName].apply(config.service, config.methodParams);
      })).pipe(mergeMap((preloadResults: any[]) => {
        const data = {};
        preloadResults.forEach((value: any, index: number) => {
          data[dialogOptions.preloadConfig[index].resultFieldName] = value;
        });

        const optionsWithPreloadData = { ...options };
        optionsWithPreloadData.data = {...optionsWithPreloadData.data, ...data};
        return this._open(template, optionsWithPreloadData);
      }));
    }

    return this._open(template, options);
  }

  /**
   * Открытие диалога
   * @param template - шаблон диалога
   * @param options - настройки и данные диалога
   */
  private _open(template: any, options: object): Observable<T> {
    return this.matDialog.open(template, {
      ...options
    }).afterClosed();
  }
}
