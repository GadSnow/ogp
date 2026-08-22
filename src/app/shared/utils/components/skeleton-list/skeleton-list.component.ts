import { Component, input } from '@angular/core';
import { Skeleton } from 'primeng/skeleton';

/** Squelette des listes de mouvements : pastille, deux lignes, montant à droite. */
@Component({
    selector: 'app-skeleton-list',
    standalone: true,
    imports: [Skeleton],
    template: `
        <ul class="divide-y">
            @for (ligne of lignes(); track $index) {
                <li class="flex items-center gap-3 px-5 py-3">
                    <p-skeleton shape="circle" size="32px" styleClass="shrink-0" />
                    <div class="flex min-w-0 flex-1 flex-col gap-1.5">
                        <p-skeleton height="13px" width="60%" />
                        <p-skeleton height="11px" width="40%" />
                    </div>
                    <p-skeleton height="13px" width="88px" />
                </li>
            }
        </ul>
    `
})
export class SkeletonListComponent {
    rows = input<number>(5);

    lignes = () => Array.from({ length: this.rows() });
}
