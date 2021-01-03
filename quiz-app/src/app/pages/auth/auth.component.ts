import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../core/auth/auth-service';

@Component({
  selector: 'ft-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthComponent implements OnInit {

  _form: FormGroup;
  _username: FormControl;
  _password: FormControl;

  constructor(public router: Router, public authService: AuthService) { }

  ngOnInit(): void {
    this.authService.logout();
    this._createForm();
  }

  /**
   * Авторизация
   */
  _auth(): void {
    this.authService.login(this._username.value, this._password.value);
  }

  /**
   * Регистрация нового пользователя
   */
  _register(): void {
    const subscription = this.authService.register(
      this._username.value,
      this._password.value
    ).subscribe(
      () => {
        subscription.unsubscribe();
        this._createForm();
      }
    );
  }

  /**
   * Создание формы регистрации/авторизации
   */
  private _createForm(): void {
    const username = new FormControl('', Validators.required);
    const password = new FormControl('', Validators.required);

    this._password = password;
    this._username = username;

    this._form = new FormGroup({
      username,
      password
    });
  }
}
