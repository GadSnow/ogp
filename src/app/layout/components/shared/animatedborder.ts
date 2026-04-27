import { Component, input } from '@angular/core';

@Component({
    selector: 'animated-border',
    standalone: true,
    template: `
        @for (i of items; track i) {
            <div class="absolute inset-0 rounded-3xl border animate-pulse-border opacity-0" [style.animation-delay]="i * 0.2 + 's'"></div>
        }
    `,
    styles: [
        `
            @keyframes pulse-border {
                0% {
                    inset: 0px;
                    opacity: 0;
                    border-radius: 16px;
                }
                5% {
                    opacity: 0.5;
                    border-radius: 20px;
                }
                10% {
                    opacity: 1;
                }
                30% {
                    inset: -14px;
                    opacity: 1;
                    border-radius: 30px;
                }
                31% {
                    inset: -14px;
                    opacity: 0.8;
                    border-radius: 30px;
                }
                100% {
                    inset: -14px;
                    opacity: 0.25;
                    border-radius: 30px;
                }
            }

            .animate-pulse-border {
                animation: pulse-border 2.25s infinite ease-out;
            }
        `
    ]
})
export class AnimatedBorder {
    count = input<number>(8);

    get items(): number[] {
        return Array.from({ length: this.count() }, (_, i) => i + 1);
    }
}
