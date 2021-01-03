import { Component, OnInit, Input, ViewChild, TemplateRef, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth-service';

interface IHeaderButtonConfig {
  userButton?: boolean;
  addQuestion?: boolean;
}

const DEFAULT_BUTTONS_CONFIG: IHeaderButtonConfig = {
  userButton: true,
  addQuestion: true
};

@Component({
  selector: 'ft-page-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {

  /**
   * Шаблон сообщения, которое будет показано в случае успешного добавления вопроса
   */
  @ViewChild('addCompleteTemplate') addCompleteTemplate: TemplateRef<any>;

  @Input() buttonsConfig: IHeaderButtonConfig = {};
  _headerButtonsConfig: IHeaderButtonConfig;

  constructor(
    public router: Router,
    protected authService: AuthService
  ) { }

  ngOnInit(): void {
    this._headerButtonsConfig = { ...DEFAULT_BUTTONS_CONFIG, ...this.buttonsConfig }
  }

  /**
   * Обработка клика на кнопку "Выйти"
   */
  _logout(): void {
    this.authService.logout();
    location.reload();
  }
}
