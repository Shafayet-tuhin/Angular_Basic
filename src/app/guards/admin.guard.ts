import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);

  const isLoggedIn = authService.isAuthenticated();
  const isAdmin = authService.hasRole('admin');

  if (!isLoggedIn || !isAdmin) {
     authService.navigateByUrl('/login');
      authService.logOut();
      alert('You do not have permission to access this page. Please contact your administrator.');
     return false;
  }

  return true;
};
