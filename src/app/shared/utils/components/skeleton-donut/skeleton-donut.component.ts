import { Component, input } from '@angular/core';
import { Skeleton } from 'primeng/skeleton';

/** Squelette calqué sur DonutChart : anneau à gauche, légende à droite. */
@Component({
    selector: 'app-skeleton-donut',
    standalone: true,
    imports: [Skeleton],
    template: `
        <div class="flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
            <p-skeleton shape="circle" [size]="size() + 'px'" styleClass="shrink-0" />
            <ul class="flex min-w-0 flex-1 flex-col gap-2">
                @for (ligne of lignes(); track $index) {
                    <li class="flex items-center gap-2.5">
                        <p-skeleton width="10px" height="10px" styleClass="shrink-0 rounded-sm" />
                        <p-skeleton height="12px" styleClass="flex-1" />
                        <p-skeleton width="56px" height="12px" />
                    </li>
                }
            </ul>
        </div>
    `
})
export class SkeletonDonutComponent {
    size = input<number>(168);
    rows = input<number>(3);

    lignes = () => Array.from({ length: this.rows() });
}
