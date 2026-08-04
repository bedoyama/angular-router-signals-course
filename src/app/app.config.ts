import {ApplicationConfig, inject, provideZonelessChangeDetection} from '@angular/core';
import {
  NavigationError,
  provideRouter,
  RedirectCommand,
  Router,
  withComponentInputBinding, withDebugTracing,
  withInMemoryScrolling,
  withNavigationErrorHandler,
  withPreloading,
  withRouterConfig,
  withViewTransitions,
} from '@angular/router';
import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {routes} from './app.routes';
import {CustomPreloadingStrategy} from './services/custom-preloading.strategy';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withComponentInputBinding()
      // withDebugTracing()
    ),
    provideZonelessChangeDetection(),
    provideHttpClient(withInterceptorsFromDi()),
  ]
};
