import {Component, inject, signal} from '@angular/core';
import {form, FormField, submit, required, email} from '@angular/forms/signals';
import {NgLogoComponent} from '../shared/ng-logo/ng-logo.component';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    imports: [FormField, NgLogoComponent],
})
export class LoginComponent {
    private auth = inject(AuthService);
    private router = inject(Router);

    protected readonly model = signal({
        email: 'test@angular-university.io',
        password: 'Testing123',
    });

    protected readonly loginForm = form(this.model, (s) => {
        required(s.email, {message: 'Email is required'});
        email(s.email, {message: 'Invalid email'});
        required(s.password, {message: 'Password is required'});
    });

    async login() {
        await submit(this.loginForm, async () => {
            await this.auth.login(this.model().email, this.model().password);
            this.router.navigateByUrl('/courses');
        });
    }
}
