import { Component, input, output, model } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'landing-input',
    standalone: true,
    imports: [FormsModule],
    template: `
        <div class="p-2 rounded-full bg-surface-50 dark:bg-surface-950 border w-full">
            <input
                [type]="type()"
                [placeholder]="placeholder()"
                [value]="value()"
                (input)="onInput($event)"
                class="w-full px-4 py-2 !text-base rounded-full outline-none placeholder:!text-surface-500 bg-surface-0 dark:bg-surface-900 shadow-[0px_42px_12px_0px_rgba(0,0,0,0.00),_0px_27px_11px_0px_rgba(0,0,0,0.01),_0px_15px_9px_0px_rgba(0,0,0,0.02),_0px_7px_7px_0px_rgba(0,0,0,0.03),_0px_2px_4px_0px_rgba(0,0,0,0.04)]"
            />
        </div>
    `,
    host: {
        class: 'flex'
    }
})
export class LandingInput {
    type = input<string>('text');
    placeholder = input<string>('');
    value = model<string>('');

    onInput(event: Event) {
        const target = event.target as HTMLInputElement;
        this.value.set(target.value);
    }
}
