import { LandingInput } from '@/app/layout/components/shared/landinginput';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';

@Component({
    selector: 'app-forgot-password',
    standalone: true,
    imports: [RouterModule, InputTextModule, LandingInput],
    template: `
        <div>
            <h1 class="text-4xl md:text-5xl font-medium text-center mx-auto leading-[125%]">
                Forgot <br />
                Password
            </h1>
            <p class="text-lg text-surface-500 leading-6 mt-6 text-center mx-auto">Enter your email to reset your password</p>
            <form class="max-w-[35rem] mx-auto">
                <div class="space-y-8 mt-8">
                    <landing-input type="email" placeholder="Email Address" />
                    <div class="flex items-center gap-8">
                        <button type="button" class="landing-button-secondary flex-1">Cancel</button>
                        <button type="submit" class="landing-button-primary flex-1">Submit</button>
                    </div>
                    <div class="text-surface-500 text-center leading-6">Not registered? <a routerLink="/auth/register" class="text-primary font-medium hover:opacity-75 transition-all">Create an Account</a></div>
                </div>
            </form>
        </div>
    `
})
export class ForgotPassword {}
