import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

const API_URL = `${location.origin}/api/v1/auth/`;
const TOKEN_PROP = 'ft_token';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {

  private token: string;
  private _subscription: Subscription = new Subscription();

  get logIn(): boolean {
    return !!this.token;
  }

  constructor(private http: HttpClient, private router: Router) {
    this.token = localStorage.getItem(TOKEN_PROP);
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  /**
   * Аутентификация
   * @param username - логин
   * @param password - пароль
   */
  login(username: string, password: string): void {
    this._subscription.add(
      this.http.post(`${API_URL}login`, {
        username,
        password
      }).subscribe((response: { token: string }) => {
        this.token = response.token;
        localStorage.setItem(TOKEN_PROP, response.token);
        this.router.navigate(['admin']);
      })
    );
  }

  /**
   * Регистрирует нового пользователя
   * @param username - логин
   * @param password - пароль
   */
  register(username: string, password: string): Observable<null> {
    return this.http.post(`${API_URL}register`, {
      username,
      password
    }).pipe(map(() => null));
  }

  /**
   * Завершение сеанса пользователя
   */
  logout(): void {
    localStorage.removeItem(TOKEN_PROP);
    this.token = null;
  }

  /**
   * Возвращает текущий JWT - токен пользователя
   */
  getToken(): string {
    return this.token;
  }
}
