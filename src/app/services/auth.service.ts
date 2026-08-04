import {Service, inject, signal, computed} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {firstValueFrom} from 'rxjs';
import {User} from '../model/user';
import {Router} from "@angular/router";

const AUTH_DATA = 'auth_data';

@Service()
export class AuthService {
    private http = inject(HttpClient);
    private router: Router = inject(Router);

    private readonly _user = signal<User | null>(null);

    readonly user = this._user.asReadonly();
    readonly isLoggedIn = computed(() => this._user() !== null);
    readonly isLoggedOut = computed(() => this._user() === null);

    constructor() {
        const stored = localStorage.getItem(AUTH_DATA);
        if (stored) {
            this._user.set(JSON.parse(stored));
        }
    }

    async login(email: string, password: string) {
        const user = await firstValueFrom(
            this.http.post<User>('/api/login', {email, password})
        );
        this._user.set(user);
        localStorage.setItem(AUTH_DATA, JSON.stringify(user));
    }

    async logout() {
        this._user.set(null);
        localStorage.removeItem(AUTH_DATA);
        await this.router.navigateByUrl('/login');
    }
}
