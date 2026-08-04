import {Routes} from '@angular/router';
import {authGuard} from './services/auth.guard';
import {confirmExitGuard} from './services/confirm-exit.guard';
import {LoginComponent} from "./login/login.component";
import {AboutComponent} from "./about/about.component";

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/courses',
    pathMatch: 'full',
  },
  {
    path: 'login',
    // component: LoginComponent,
    loadComponent: () => import('./login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'about',
    // component: AboutComponent,
    loadComponent: () => import('./about/about.component').then(m => m.AboutComponent)
  },
  {
    path: 'courses',
    loadChildren: () => import('./courses/courses.routes').then(m => m.coursesRoutes)
  },
  {
    path: '**',
    loadComponent: () => import('./page-not-found/page-not-found.component').then(m => m.PageNotFoundComponent)
  }
];
