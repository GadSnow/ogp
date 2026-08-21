import { Component, input } from '@angular/core';

/**
 * État vide unifié — charte OGP, artboard « Style guide ».
 * Les deux cercles entrelacés reprennent le motif du monogramme.
 */
@Component({
    selector: 'app-empty-state',
    standalone: true,
    template: `
        <div class="flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed px-6 py-12 text-center">
            <svg width="56" height="56" viewBox="0 0 56 56" aria-hidden="true">
                <circle cx="22" cy="28" r="18" fill="none" stroke="var(--p-primary-300)" stroke-width="2.5" />
                <circle cx="34" cy="28" r="18" fill="none" stroke="var(--ogp-accent-strong)" stroke-width="2.5" />
            </svg>
            <p class="font-medium text-surface-900 dark:text-surface-0">{{ message() }}</p>
            @if (hint()) {
                <p class="max-w-[16rem] text-surface-500">{{ hint() }}</p>
            }
            <ng-content />
        </div>
    `
})
export class EmptyStateComponent {
    message = input<string>('Aucune donnée pour le moment');
    hint = input<string>('');
}
