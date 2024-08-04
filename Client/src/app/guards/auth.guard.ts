import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {

  const matSnackBar = inject(MatSnackBar);
  if (inject(AuthService).isLoggedIn()) {
    return true;
  }
  matSnackBar.open('You Must Logged in To View This Page', 'OK', {
    duration: 7000
  })
  inject(Router).navigate(['/']);
  return false;
};
