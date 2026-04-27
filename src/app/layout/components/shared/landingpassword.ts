import { Component, input, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';

@Component({
    selector: 'landing-password',
    standalone: true,
    imports: [FormsModule, PasswordModule],
    template: `
        <div class="p-2 rounded-full bg-surface-50 dark:bg-surface-950 border w-full">
            <p-password
                [(ngModel)]="value"
                [placeholder]="placeholder()"
                [feedback]="false"
                [toggleMask]="toggleMask()"
                styleClass="!w-full"
                inputStyleClass="!w-full !px-4 !py-2 !border-none !text-base !rounded-full !outline-none placeholder:!text-surface-500 !bg-surface-0 dark:!bg-surface-900 !shadow-[0px_42px_12px_0px_rgba(0,0,0,0.00),_0px_27px_11px_0px_rgba(0,0,0,0.01),_0px_15px_9px_0px_rgba(0,0,0,0.02),_0px_7px_7px_0px_rgba(0,0,0,0.03),_0px_2px_4px_0px_rgba(0,0,0,0.04)]"
            />
        </div>
    `,
    host: {
        class: 'flex'
    }
})
export class LandingPassword {
    placeholder = input<string>('');
    toggleMask = input<boolean>(true);
    value = model<string>('');
}
