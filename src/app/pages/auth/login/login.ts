import { Component, computed, inject } from '@angular/core';
import { AppConfigurator } from '@/app/layout/components/app.configurator';
import { Button } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputText } from 'primeng/inputtext';
import { Message } from 'primeng/message';
import { LayoutService } from '@/app/layout/service/layout.service';
import { AuthService } from '@/app/core/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-login',
    imports: [AppConfigurator, Button, FormsModule, IconField, InputIcon, InputText, Message, ReactiveFormsModule],
    templateUrl: './login.html',
    styleUrl: './login.scss'
})
export class Login {

    email: string = '';
    password: string = '';
    rememberMe: boolean = false;
    loading: boolean = false;
    errorMessage: string = '';

    layoutService = inject(LayoutService);
    authService = inject(AuthService);
    route = inject(ActivatedRoute);
    router = inject(Router);

    isDarkTheme = computed(() => this.layoutService.isDarkTheme());

    onSubmit(): void {
        if (!this.email || !this.password) {
            this.errorMessage = 'Please enter both email and password';
            return;
        }

        this.loading = true;
        this.errorMessage = '';

        this.authService.login({ email: this.email, password: this.password }).subscribe({
            next: (user) => {
                this.loading = false;
                console.log('User logged in successfully:', user);

                // Get returnUrl from query params or default to dashboard
                const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard/e-commerce';
                this.router.navigateByUrl(returnUrl);
            },
            error: (error) => {
                this.loading = false;
                this.errorMessage = error.message || 'Authentication failed. Please try again.';
                console.error('Login error:', error);
            }
        });
    }

}
