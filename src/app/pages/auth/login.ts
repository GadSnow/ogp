import { Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { LayoutService } from '@/app/layout/service/layout.service';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { ButtonModule } from 'primeng/button';
import { AppConfigurator } from '@/app/layout/components/app.configurator';
import { AuthService } from '@/app/core/services/auth.service';
import { MessageModule } from 'primeng/message';
import { finalize } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [InputTextModule, FormsModule, RouterModule, IconFieldModule, InputIconModule, ButtonModule, AppConfigurator, MessageModule],
    template: `
        <div class="min-h-screen grid lg:grid-cols-[minmax(0,38%)_1fr] bg-surface-0 dark:bg-surface-900">
            <!-- Panneau de marque -->
            <div class="relative hidden lg:flex flex-col justify-between p-10 overflow-hidden bg-gradient-to-b from-primary-950 to-primary-900">
                <svg class="absolute -top-24 -right-32 opacity-35 pointer-events-none" width="420" height="420" viewBox="0 0 420 420" aria-hidden="true">
                    <circle cx="180" cy="210" r="150" fill="none" stroke="var(--ogp-accent)" stroke-width="2" />
                    <circle cx="260" cy="150" r="150" fill="none" stroke="var(--p-primary-400)" stroke-width="2" />
                </svg>

                <div class="relative z-10 text-[0.7rem] font-semibold tracking-[0.12em] text-surface-300">OFFICE GUINÉEN DE PUBLICITÉ</div>

                <div class="relative z-10 flex flex-col items-start gap-5">
                    <img src="layout/images/ogp/logo-ogp.png" alt="Office Guinéen de Publicité" class="h-32 w-auto" />
                    <p class="max-w-[22rem] text-sm leading-relaxed text-surface-200">Back-office de gestion du parc publicitaire — panneaux, campagnes, devis et facturation.</p>
                </div>

                <div class="relative z-10 text-xs text-surface-400">© 2026 OGP · Conakry, République de Guinée</div>
            </div>

            <!-- Formulaire -->
            <div class="flex items-center justify-center p-8 sm:p-12">
                <form (ngSubmit)="onSubmit()" class="w-full max-w-[22rem] flex flex-col gap-6">
                    <div class="flex flex-col gap-1">
                        <img src="layout/images/ogp/logo-ogp.png" alt="OGP" class="h-12 w-auto mb-4 lg:hidden" />
                        <h1 class="text-2xl font-bold tracking-tight text-surface-900 dark:text-surface-0">Connexion</h1>
                        <p class="text-surface-500 dark:text-surface-400">Accédez à votre espace de travail.</p>
                    </div>

                    @if (errorMessage()) {
                        <p-message severity="error" [text]="errorMessage()" styleClass="w-full" />
                    }

                    <div class="flex flex-col gap-4">
                        <div class="flex flex-col gap-1.5">
                            <label for="email" class="font-medium text-surface-600 dark:text-surface-300">Identifiant</label>
                            <p-iconfield class="w-full">
                                <input id="email" name="email" type="email" pInputText class="w-full" autocomplete="username" placeholder="ex : a.diallo@ogp.gn" [ngModel]="email()" (ngModelChange)="email.set($event)" required />
                                <p-inputicon class="pi pi-envelope" />
                            </p-iconfield>
                        </div>

                        <div class="flex flex-col gap-1.5">
                            <label for="password" class="font-medium text-surface-600 dark:text-surface-300">Mot de passe</label>
                            <p-iconfield class="w-full">
                                <input id="password" name="password" type="password" pInputText class="w-full" autocomplete="current-password" placeholder="••••••••" [ngModel]="password()" (ngModelChange)="password.set($event)" required />
                                <p-inputicon class="pi pi-lock" />
                            </p-iconfield>
                        </div>

                       
                    </div>

                    <p-button type="submit" label="Se connecter" styleClass="w-full" [loading]="loading()" [disabled]="loading()" />

                    <p class="border-t border-surface pt-4 text-center text-xs leading-relaxed text-surface-500">Besoin d'aide ? Contactez l'administrateur système.</p>
                </form>
            </div>
        </div>
        <app-configurator simple />
    `
})
export class Login {
    email = signal<string>('');
    password = signal<string>('');
    loading = signal<boolean>(false);
    errorMessage = signal<string>('');

    private layoutService = inject(LayoutService);
    private authService = inject(AuthService);
    private route = inject(ActivatedRoute);
    private router = inject(Router);
    private destroyRef = inject(DestroyRef);

    isDarkTheme = computed(() => this.layoutService.isDarkTheme());

    onSubmit(): void {
        if (!this.email() || !this.password()) {
            this.errorMessage.set('Veuillez remplir tous les champs.');
            return;
        }

        this.loading.set(true);
        this.errorMessage.set('');

        this.authService
            .login({ email: this.email(), password: this.password() })
            .pipe(
                finalize(() => this.loading.set(false)),
                takeUntilDestroyed(this.destroyRef)
            )
            .subscribe({
                next: () => {
                    const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/ogp/dashboard';
                    this.router.navigateByUrl(returnUrl);
                },
                error: (error: Error) => {
                    this.errorMessage.set(error.message || "Échec de l'authentification. Veuillez réessayer.");
                }
            });
    }
}
