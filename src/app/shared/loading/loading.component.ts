import {Component, effect, inject, input} from '@angular/core';
import {toSignal} from '@angular/core/rxjs-interop';
import {filter} from 'rxjs';
import {LoadingService} from './loading.service';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  RouteConfigLoadEnd,
  RouteConfigLoadStart,
  Router,
} from '@angular/router';

@Component({
  selector: 'loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css'],
  imports: [],
})
export class LoadingComponent {
  private loadingService = inject(LoadingService);

  readonly detectRoutingOngoing = input(false);
  readonly loading = this.loadingService.loading;
  readonly router = inject(Router);

  private readonly navStart = toSignal(
    this.router.events.pipe(
      filter(event => [NavigationStart, RouteConfigLoadStart].some(T => event instanceof T))
    )
  );

  private readonly navEnd = toSignal(
    this.router.events.pipe(
      filter(event => [NavigationEnd, NavigationCancel, NavigationError, RouteConfigLoadEnd].some(T => event instanceof T))
    )
  );

  constructor() {
    effect(() => {
      const start = this.navStart();
      const detect = this.detectRoutingOngoing();
      if (!start || !detect) return;
      this.loadingService.loadingOn();
    });

    effect(() => {
      const end = this.navEnd();
      const detect = this.detectRoutingOngoing();
      if (!end || !detect) return;
      this.loadingService.loadingOff();
    });
  }
}
