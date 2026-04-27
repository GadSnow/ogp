import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomCard } from '@/app/layout/components/ui/customcard';
import { LineChart, LineChartDataset } from '@/app/layout/components/ui/charts/linechart';
import { Key, Payment } from '@/app/layout/components/icons';
import { Select } from 'primeng/select';
import { Tag } from 'primeng/tag';

interface LegendItem {
    label: string;
    color: string;
    value: number;
    percent: number;
    increase: boolean;
    icon: any;
    iconClass: string;
}

interface PeriodOption {
    name: string;
    code: string;
}

@Component({
    selector: '[seo-performance]',
    standalone: true,
    imports: [CommonModule, FormsModule, CustomCard, LineChart, Key, Payment, Select, Tag],
    template: `
        <div custom-card>
            <h3 card-title>SEO Performance</h3>
            <div card-action>
                <p-select [(ngModel)]="selectedPeriod" [options]="periods()" optionLabel="name" placeholder="Select a Period" class="w-full md:w-40" />
            </div>
            <div class="flex flex-col">
                <div class="p-5 flex gap-10 border-b md:flex-row flex-col">
                    @for (item of chartLegend(); track item.label; let i = $index; let last = $last) {
                        <div class="flex-1 flex items-center gap-3">
                            <div class="w-12 h-12 flex items-center justify-center rounded-xl shadow-stroke" [ngClass]="item.iconClass">
                                @if (i === 0) {
                                    <payment />
                                } @else {
                                    <key />
                                }
                            </div>
                            <div class="flex-1 flex flex-col">
                                <span class="text-surface-500 text-sm">{{ item.label }}</span>
                                <div class="mt-1 flex items-center gap-1">
                                    <span class="text-xl font-medium">{{ item.value.toLocaleString() }}</span>
                                    <p-tag [severity]="item.increase ? 'success' : 'danger'" [value]="item.percent + '%'" />
                                </div>
                            </div>
                        </div>
                        @if (!last) {
                            <div class="md:w-px w-full md:h-full h-px bg-surface-200 dark:bg-surface-800"></div>
                        }
                    }
                </div>
                <div class="flex-1 p-4">
                    <div
                        line-chart
                        styleClass="min-h-72"
                        [datasets]="chartData()"
                        [tension]="0.4"
                        [maxY]="500000"
                        [yStepSize]="100000"
                        [showXBorder]="false"
                        [minY]="2000"
                        [area]="true"
                        [showXGrid]="true"
                        [showYGrid]="true"
                        [showYAxis]="true"
                        [yLabelFormatter]="yLabelFormatter"
                    ></div>
                </div>
            </div>
        </div>
    `,
    host: {
        class: 'col-span-12 xl:col-span-6'
    }
})
export class SeoPerformance {
    chartData = signal<LineChartDataset[]>([
        {
            label: 'Traffic sources',
            data: [
                { x: '2024-01-01', y: 245670 },
                { x: '2024-02-01', y: 197890 },
                { x: '2024-03-01', y: 289450 },
                { x: '2024-04-01', y: 312340 },
                { x: '2024-05-01', y: 274560 },
                { x: '2024-06-01', y: 456780 }
            ],
            borderColor: 'primary',
            backgroundColor: [
                { color: 'primary', opacity: 0.15 },
                { color: 'primary', opacity: 0 }
            ]
        },
        {
            label: 'Keyword rankings',
            data: [
                { x: '2024-01-01', y: 89450 },
                { x: '2024-02-01', y: 112340 },
                { x: '2024-03-01', y: 234560 },
                { x: '2024-04-01', y: 156780 },
                { x: '2024-05-01', y: 378900 },
                { x: '2024-06-01', y: 291230 }
            ],
            borderColor: 'red-600',
            backgroundColor: [
                { color: 'red-600', opacity: 0.15 },
                { color: 'red-600', opacity: 0 }
            ]
        }
    ]);

    chartLegend = signal<LegendItem[]>([
        {
            label: 'Traffic sources',
            color: 'primary',
            value: 327812,
            percent: 32,
            increase: true,
            icon: 'payment',
            iconClass: '[&_svg]:fill-primary'
        },
        {
            label: 'Keyword rankings',
            color: 'red-600',
            value: 384162,
            percent: 5,
            increase: true,
            icon: 'key',
            iconClass: '[&_svg]:fill-red-600'
        }
    ]);

    selectedPeriod: PeriodOption = { name: 'Yearly', code: 'yearly' };
    periods = signal<PeriodOption[]>([
        { name: 'Yearly', code: 'yearly' },
        { name: 'Monthly', code: 'monthly' },
        { name: 'Weekly', code: 'weekly' },
        { name: 'Daily', code: 'daily' }
    ]);

    yLabelFormatter = (value: any) => (value >= 1000 ? `${Math.round(value / 1000)}K` : value);
}
