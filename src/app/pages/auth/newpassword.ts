import { LandingPassword } from '@/app/layout/components/shared/landingpassword';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PasswordModule } from 'primeng/password';

@Component({
    selector: 'app-new-password',
    standalone: true,
    imports: [FormsModule, RouterModule, PasswordModule, LandingPassword],
    template: `
        <div>
            <h1 class="text-4xl md:text-5xl font-medium text-center mx-auto leading-[125%]">
                Create a <br />
                New Password
            </h1>
            <p class="text-lg text-surface-500 leading-6 mt-6 text-center mx-auto">Please enter your new password</p>
            <form class="max-w-[35rem] mx-auto">
                <div class="space-y-8 mt-8">
                    <landing-password placeholder="Password" />
                    <landing-password placeholder="Repeat Password" />
                    <div class="flex items-center gap-8">
                        <button type="button" class="landing-button-secondary flex-1">Cancel</button>
                        <button type="submit" class="landing-button-primary flex-1">Change</button>
                    </div>
                    <div class="text-surface-500 text-center leading-6">A problem? <a routerLink="/landing/contact" class="underline">Click here</a> and let us help you.</div>
                </div>
            </form>
        </div>
    `
})
export class NewPassword {
    password = signal('');
    confirmPassword = signal('');
}
