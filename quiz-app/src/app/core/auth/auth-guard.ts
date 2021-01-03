import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth-service';

/**
 * Гард, запрещающий прямой переход на страницу в случае, если пользователь не авторизован
 * @author Серпаков С.А.
 */
@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}
  
  canActivate(): boolean {
    
    if (!this.authService.logIn) {
      this.router.navigate(['home']);
      return false;
    }

    return true;
  }
}
