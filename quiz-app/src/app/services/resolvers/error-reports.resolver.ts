import {Injectable} from '@angular/core';
import {Resolve} from '@angular/router';
import {Observable} from 'rxjs';
import { IErrorReport } from 'src/app/models/error_report/IErrorReport';
import { ErrorReportsService } from 'src/app/services/error-reports.service';

/**
 * Резолвер списка сообщений об ошибках
 * @author Серпаков С.А.
 */
@Injectable()
export class ErrorReportsResolver implements Resolve<any> {

  constructor(private errorReportsService: ErrorReportsService){}

  resolve(): Observable<IErrorReport[]> {
    return this.errorReportsService.getList();
  }
}
