import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { AppleLogo } from '@/app/layout/components/icons/applelogo';
import { GoogleLogo } from '@/app/layout/components/icons/googlelogo';
import { CustomersBadge } from '@/app/layout/components/shared/customersbadge';
import { LandingInput } from '@/app/layout/components/shared/landinginput';
import { LandingPassword } from '@/app/layout/components/shared/landingpassword';

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [FormsModule, RouterModule, CheckboxModule, InputTextModule, PasswordModule, AppleLogo, GoogleLogo, CustomersBadge, LandingInput, LandingPassword],
    template: `
        <div>
            <customers-badge [showLabel]="false" />
            <h1 class="text-4xl md:text-5xl font-medium text-center mx-auto leading-[125%]">
                Join Our <br />
                Happy Customers
            </h1>
            <p class="text-lg text-surface-500 leading-6 mt-6 text-center max-w-md mx-auto">Welcome to Avalon, would you like to be one of our happy customers? Please enter your details</p>
            <form class="max-w-[35rem] mx-auto">
                <div class="space-y-4">
                    <div class="mt-12 flex md:flex-row flex-col items-center gap-5">
                        <div class="w-full md:flex-1 p-2 rounded-full bg-surface-50 dark:bg-surface-950 border border-surface-200 dark:border-surface-800">
                            <button
                                type="button"
                                class="px-4 py-2 flex items-center justify-center gap-2 w-full rounded-full bg-surface-0 dark:bg-surface-900 shadow-[0px_42px_12px_0px_rgba(0,0,0,0.00),_0px_27px_11px_0px_rgba(0,0,0,0.01),_0px_15px_9px_0px_rgba(0,0,0,0.02),_0px_7px_7px_0px_rgba(0,0,0,0.03),_0px_2px_4px_0px_rgba(0,0,0,0.04)]"
                            >
                                <google-logo />
                                <span class="font-medium text-surface-700 dark:text-surface-300">Register with Google</span>
                            </button>
                        </div>
                        <div class="w-full md:flex-1 p-2 rounded-full bg-surface-50 dark:bg-surface-950 border border-surface-200 dark:border-surface-800">
                            <button
                                type="button"
                                class="px-4 py-2 flex items-center justify-center gap-2 w-full rounded-full bg-surface-0 dark:bg-surface-900 shadow-[0px_42px_12px_0px_rgba(0,0,0,0.00),_0px_27px_11px_0px_rgba(0,0,0,0.01),_0px_15px_9px_0px_rgba(0,0,0,0.02),_0px_7px_7px_0px_rgba(0,0,0,0.03),_0px_2px_4px_0px_rgba(0,0,0,0.04)]"
                            >
                                <apple-logo />
                                <span class="font-medium text-surface-700 dark:text-surface-300">Register with Apple</span>
                            </button>
                        </div>
                    </div>
                    <div class="flex items-center gap-4">
                        <span class="h-px flex-1 bg-surface-200 dark:bg-surface-800"></span>
                        <span class="text-surface-400 dark:text-surface-600 font-medium text-sm">or</span>
                        <span class="h-px flex-1 bg-surface-200 dark:bg-surface-800"></span>
                    </div>
                    <landing-input placeholder="Username" />
                    <landing-input placeholder="Email Address" />
                    <landing-password placeholder="Password" />
                </div>
                <div class="space-y-8 mt-8">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-2">
                            <p-checkbox [(ngModel)]="agreeTerms" name="agreeTerms" [binary]="true" />
                            <span class="font-medium">I have read the </span>
                            <span class="text-surface-500">Terms and Conditions</span>
                        </div>
                    </div>
                    <button type="submit" class="landing-button-primary w-full">Register</button>
                    <div class="text-surface-500 text-center leading-6">Already have an account? <a routerLink="/auth/login" class="text-primary font-medium hover:opacity-75 transition-all">Login</a></div>
                </div>
            </form>
        </div>
    `
})
export class Register {
    agreeTerms = signal(false);
    password = signal('');
}
