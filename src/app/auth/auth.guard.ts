import { AuthService } from 'src/app/services/auth.service';
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  const authService = inject(AuthService);
  if(authService.isAuthenticated){
  return true;
  }
  else {
    return router.navigate(['/login']);
  }
};
