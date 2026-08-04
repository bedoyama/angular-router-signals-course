import {inject} from '@angular/core';
import {CanActivateFn, CanActivateChildFn, RedirectCommand, Router, Routes} from '@angular/router';
import {AuthService} from './auth.service';

const checkAuthenticated = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  if (auth.isLoggedIn()) return true;
  return router.parseUrl('/login');
}

export const authGuard: CanActivateFn = () => checkAuthenticated();
export const authGuardChild: CanActivateChildFn = () => checkAuthenticated();
