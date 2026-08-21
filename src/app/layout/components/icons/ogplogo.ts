import { Component, input } from '@angular/core';

/**
 * Monogramme OGP. `variant="mark"` n'affiche que le sigle ;
 * `variant="full"` y adjoint le nom complet de l'organisme.
 */
@Component({
    selector: 'ogp-logo',
    standalone: true,
    template: `
        <span class="inline-flex items-center gap-2.5" [class]="styleClass()">
            <img src="layout/images/ogp/logo-ogp.png" alt="Office Guinéen de Publicité" class="w-auto shrink-0" [style.height.px]="size()" />
            @if (variant() === 'full') {
                <span class="flex flex-col leading-tight">
                    <span class="font-bold tracking-[0.03em] text-[0.78rem] text-white">BACK-OFFICE</span>
                </span>
            }
        </span>
    `
})
export class OgpLogo {
    styleClass = input<string>('', { alias: 'class' });
    size = input<number>(28);
    variant = input<'mark' | 'full'>('mark');
}
