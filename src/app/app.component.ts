import {Component, inject} from '@angular/core';
import {AuthService} from './services/auth.service';
import {isActive, Router, RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {MessagesComponent} from './shared/messages/messages.component';
import {LoadingComponent} from './shared/loading/loading.component';
import {ConfirmDialogComponent} from './shared/confirm-dialog/confirm-dialog.component';
import {NgLogoComponent} from './shared/ng-logo/ng-logo.component';
import {DevToolbarComponent} from './shared/dev-toolbar/dev-toolbar.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
  imports: [
    MessagesComponent,
    LoadingComponent,
    ConfirmDialogComponent,
    NgLogoComponent,
    DevToolbarComponent,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
  ],
})
export class AppComponent {
    readonly auth = inject(AuthService);

    onActivate(component: unknown) {
        console.log('[App outlet] activated:', component);
    }

    onDeactivate(component: unknown) {
        console.log('[App outlet] deactivated:', component);
    }

    logout() {
        this.auth.logout();
    }
}
