import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, throwError, EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from './auth-service';

const MAX_RECURSIVE_LEVEL = 1;
const UNAUTHORIZED = 401;
const FORBIDDEN = 403;

@Injectable({
  providedIn: 'root'
})
export class AuthErrorInterceptor implements HttpInterceptor {

  private recursiveLevel: number = 0;

  constructor(private authService: AuthService, private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.recursiveRequest(req, next);
  }

  /**
   * В случае, если сервер ответил ошибкой 401, выполняет разлогин и пытается повторить упавший запрос
   * Если повторный (или первоначальный) запрос падает с 403 ошибкой, отправляет юзера на стартовую
   * @param req;
   * @param next;
   */
  private recursiveRequest(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // если глубина рекурсии привысила максимальную, то отправляем юзера на разводящую -
    // уж там то все должно работать и без авторизации
    if (this.recursiveLevel > MAX_RECURSIVE_LEVEL) {
      return this.goHome();
    }

    return next.handle(req).pipe(catchError((err) => {
      if (err.status === UNAUTHORIZED) {
        this.authService.logout();
        ++this.recursiveLevel;
        return this.recursiveRequest(req, next);
      }

      // попадаешь туда, где тебя быть не должно - идёшь домой
      if (err.status === FORBIDDEN) {
        return this.goHome();
      }

      return throwError(err.error.message || err.statusText);
    }));
  }

  /**
   * Отправляем горе - путешественника на стартовую
   */
  private goHome(): Observable<HttpEvent<any>> {
    this.recursiveLevel = 0;
    this.router.navigate(['home']);
    return EMPTY;
  }
}
