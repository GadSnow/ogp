import { LandingInput } from '@/app/layout/components/shared/landinginput';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PasswordModule } from 'primeng/password';

@Component({
    selector: 'app-verification',
    standalone: true,
    imports: [FormsModule, RouterModule, PasswordModule, LandingInput],
    template: `
        <div>
            <h1 class="text-5xl font-medium text-center mx-auto leading-[125%]">Verification</h1>
            <p class="text-lg text-surface-500 leading-6 mt-6 text-center mx-auto">We have send code to your email: <span class="font-medium text-primary">ava******lon&#64;gmail.com</span></p>
            <form class="max-w-[35rem] mx-auto">
                <div class="space-y-8 mt-8">
                    <landing-input placeholder="Verification Code" />
                    <div class="flex items-center gap-8 mt-8">
                        <button type="button" class="landing-button-secondary w-full">Cancel</button>
                        <button type="submit" class="landing-button-primary w-full">Verify</button>
                    </div>
                    <div class="text-surface-500 text-center leading-6">Already have an account? <a routerLink="/auth/login" class="text-primary font-medium hover:opacity-75 transition-all">Login</a></div>
                </div>
            </form>
        </div>
    `
})
export class Verification {
    code = signal('');
}
