import { Component, computed, inject, input } from '@angular/core';
import { UIChart } from 'primeng/chart';
import { LayoutService } from '@/app/layout/service/layout.service';

export interface DonutSlice {
    label: string;
    value: number;
}

/**
 * Palettes catégorielles validées (skill dataviz, scripts/validate_palette.js) :
 * bande de luminosité, plancher de chroma, séparation daltonisme, plancher vision
 * normale et contraste sur surface. L'ordre est fixe et ne doit pas être permuté —
 * l'or s'intercale entre vert et rouge, la paire deutan la plus fragile.
 * Le pas or clair (#cc9900) sort à 2,58:1 : la légende porte nom + valeur, qui est
 * le relief exigé par ce warning.
 */
export const DONUT_PALETTE_LIGHT = ['#3063cf', '#2c9664', '#cc9900', '#c1252a', '#2280c3'];
export const DONUT_PALETTE_DARK = ['#5f8ee0', '#2fa06f', '#b58600', '#cf4348', '#3a8fc6'];

@Component({
    selector: '[donut-chart]',
    standalone: true,
    imports: [UIChart],
    template: `
        <div class="flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:gap-6">
            <div class="relative shrink-0" [style.width.px]="size()" [style.height.px]="size()">
                <p-chart type="doughnut" [data]="chartData()" [options]="chartOptions()" [style]="{ width: size() + 'px', height: size() + 'px' }" />
                @if (centerValue()) {
                    <div class="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                        <span class="text-2xl font-bold tabular text-surface-900 dark:text-surface-0">{{ centerValue() }}</span>
                        @if (centerLabel()) {
                            <span class="text-xs text-surface-500">{{ centerLabel() }}</span>
                        }
                    </div>
                }
            </div>

            <!-- Légende : identité jamais portée par la couleur seule. -->
            <ul class="flex min-w-0 flex-1 flex-col gap-2">
                @for (slice of slices(); track slice.label; let i = $index) {
                    <li class="flex items-center gap-2.5">
                        <span class="size-2.5 shrink-0 rounded-sm" [style.background]="colorAt(i)"></span>
                        <span class="min-w-0 flex-1 truncate text-surface-600 dark:text-surface-300">{{ slice.label }}</span>
                        <span class="tabular font-semibold text-surface-900 dark:text-surface-0">{{ formatter()(slice.value) }}</span>
                        <span class="tabular w-11 text-right text-xs text-surface-500">{{ percent(slice.value) }}</span>
                    </li>
                }
            </ul>
        </div>
    `
})
export class DonutChart {
    private layoutService = inject(LayoutService);

    slices = input<DonutSlice[]>([]);
    size = input<number>(168);
    centerValue = input<string>('');
    centerLabel = input<string>('');
    formatter = input<(value: number) => string>((value) => `${value}`);

    private isDark = computed(() => this.layoutService.layoutConfig().darkTheme);
    private palette = computed(() => (this.isDark() ? DONUT_PALETTE_DARK : DONUT_PALETTE_LIGHT));

    private total = computed(() => this.slices().reduce((sum, s) => sum + s.value, 0));

    colorAt(index: number): string {
        const palette = this.palette();
        return palette[index % palette.length];
    }

    percent(value: number): string {
        const total = this.total();
        if (!total) return '0 %';
        return `${Math.round((value / total) * 100)} %`;
    }

    chartData = computed(() => {
        const slices = this.slices();
        // Anneau de la couleur de surface : le séparateur de 2px entre segments.
        const gap = this.isDark() ? '#22242b' : '#ffffff';
        return {
            labels: slices.map((s) => s.label),
            datasets: [
                {
                    data: slices.map((s) => s.value),
                    backgroundColor: slices.map((_, i) => this.colorAt(i)),
                    borderColor: gap,
                    borderWidth: 2,
                    hoverOffset: 4
                }
            ]
        };
    });

    chartOptions = computed(() => {
        const isDark = this.isDark();
        const format = this.formatter();
        const total = this.total();
        return {
            cutout: '68%',
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: isDark ? '#31353f' : '#22242b',
                    padding: 10,
                    cornerRadius: 6,
                    displayColors: true,
                    callbacks: {
                        label: (ctx: any) => {
                            const value = ctx.parsed ?? 0;
                            const share = total ? Math.round((value / total) * 100) : 0;
                            return ` ${ctx.label} — ${format(value)} (${share} %)`;
                        }
                    }
                }
            }
        };
    });
}
