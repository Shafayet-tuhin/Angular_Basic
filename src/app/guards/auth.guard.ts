import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

export const authGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService)

  const isLoggedIn = authService.isAuthenticated();

  if (!isLoggedIn){
    authService.navigateByUrl('/login');

    return false;
  }

  return true;
};

