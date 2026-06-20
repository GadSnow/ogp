import { Component, computed, inject } from '@angular/core';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { LayoutService } from 'src/app/layout/service/layout.service';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { ButtonModule } from 'primeng/button';
import { FluidModule } from 'primeng/fluid';
import { AppConfigurator } from 'src/app/layout/components/app.configurator';
import { AuthService } from '@/app/core/services/auth.service';
import { MessageModule } from 'primeng/message';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CheckboxModule, InputTextModule, FormsModule, RouterModule, IconFieldModule, InputIconModule, ButtonModule, FluidModule, AppConfigurator, MessageModule],
    template: `
        <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100 dark:from-surface-900 dark:to-surface-800 py-12 px-4 sm:px-6 lg:px-8">
            <div class="w-full max-w-md space-y-8 bg-white dark:bg-surface-900 p-8 rounded-2xl shadow-xl">

                <!-- Error Message -->
                @if (errorMessage) {
                    <p-message severity="error" textContent="{{errorMessage}}" class="w-full" />
                }

                <!-- Login Form -->
                <form #loginForm="ngForm" (ngSubmit)="onSubmit()" class="mt-8 space-y-6">
                    <div class="space-y-4">
                        <!-- Email Field -->
                        <div>
                            <label for="email" class="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                                Email
                            </label>
                            <p-iconfield class="w-full">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    pInputText
                                    class="w-full"
                                    [(ngModel)]="email"
                                    required
                                    placeholder="Entrez votre email"
                                />
                                <p-inputicon class="pi pi-envelope" />
                            </p-iconfield>
                        </div>

                        <!-- Password Field -->
                        <div>
                            <label for="password" class="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                                Mot de passe
                            </label>
                            <p-iconfield class="w-full">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    pInputText
                                    class="w-full"
                                    [(ngModel)]="password"
                                    required
                                    placeholder="Entrez votre mot de passe"
                                />
                                <p-inputicon class="pi pi-lock" />
                            </p-iconfield>
                        </div>
                    </div>

                    <!-- Submit Button -->
                    <div class="flex justify-center">
                        <div>
                            <p-button
                                type="submit"
                                label="Se connecter"
                                class="w-full"
                                [loading]="loading"
                                [disabled]="loading" />
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <app-configurator simple />
    `
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
            this.errorMessage = 'Veuillez remplir tous les champs.';
            return;
        }

        this.loading = true;
        this.errorMessage = '';

        this.authService.login({ email: this.email, password: this.password }).subscribe({
            next: (user) => {
                this.loading = false;

                // Get returnUrl from query params or default to dashboard
                const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard/e-commerce';
                this.router.navigateByUrl(returnUrl);
            },
            error: (error) => {
                this.loading = false;
                this.errorMessage = error.message || 'Échec de l\'authentification. Veuillez réessayer.';
                console.error('Login error:', error);
            }
        });
    }
}
