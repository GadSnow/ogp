import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomCard } from '@/app/layout/components/ui/customcard';
import { BarChart, BarChartDataset } from '@/app/layout/components/ui/charts/barchart';
import { ChartUp, ChartDown } from '@/app/layout/components/icons';
import { Select } from 'primeng/select';
import { Tag } from 'primeng/tag';

interface LegendItem {
    label: string;
    value: number;
    increase: boolean;
    percent: number;
    iconClass: string;
}

interface PeriodOption {
    name: string;
    code: string;
}

@Component({
    selector: '[sales-data]',
    standalone: true,
    imports: [CommonModule, FormsModule, CustomCard, BarChart, ChartUp, ChartDown, Select, Tag],
    template: `
        <div custom-card>
            <h3 card-title>Sales Data</h3>
            <div card-action>
                <p-select [(ngModel)]="selectedPeriod" [options]="periods()" optionLabel="name" placeholder="Select a Period" class="w-full md:w-40" />
            </div>
            <div class="flex flex-col">
                <div class="p-5 flex gap-10 border-b md:flex-row flex-col">
                    @for (item of chartLegend(); track item.label; let i = $index; let last = $last) {
                        <div class="flex-1 flex items-center gap-3">
                            <div class="w-12 h-12 flex items-center justify-center rounded-xl shadow-stroke" [ngClass]="item.iconClass">
                                @if (i === 0) {
                                    <chart-up />
                                } @else {
                                    <chart-down />
                                }
                            </div>
                            <div class="flex-1 flex flex-col">
                                <span class="text-surface-500 text-sm">{{ item.label }}</span>
                                <div class="mt-1 flex items-center gap-1">
                                    <span class="text-xl font-medium">{{ formatCurrency(item.value) }}</span>
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
                    <div bar-chart styleClass="min-h-80" [yStepSize]="300000" [datasets]="chartData()" [valueFormatter]="valueFormatter" [yLabelFormatter]="yLabelFormatter" [showYGrid]="true" [showXGrid]="true" [beginAtZero]="true"></div>
                </div>
            </div>
        </div>
    `,
    host: {
        class: 'col-span-12 xl:col-span-6'
    }
})
export class SalesData {
    chartData = signal<BarChartDataset[]>([
        {
            label: 'Income',
            data: [
                { x: '2024-01-01', y: 674320 },
                { x: '2024-02-01', y: 421890 },
                { x: '2024-03-01', y: 789010 },
                { x: '2024-04-01', y: 234560 },
                { x: '2024-05-01', y: 567890 },
                { x: '2024-06-01', y: 345670 },
                { x: '2024-07-01', y: 890120 },
                { x: '2024-08-01', y: 123450 },
                { x: '2024-09-01', y: 456780 },
                { x: '2024-10-01', y: 789010 },
                { x: '2024-11-01', y: 234560 },
                { x: '2024-12-01', y: 678900 }
            ]
        },
        {
            label: 'Expenses',
            data: [
                { x: '2024-01-01', y: -543210 },
                { x: '2024-02-01', y: -876540 },
                { x: '2024-03-01', y: -321090 },
                { x: '2024-04-01', y: -654320 },
                { x: '2024-05-01', y: -210980 },
                { x: '2024-06-01', y: -765430 },
                { x: '2024-07-01', y: -432100 },
                { x: '2024-08-01', y: -876540 },
                { x: '2024-09-01', y: -109870 },
                { x: '2024-10-01', y: -543210 },
                { x: '2024-11-01', y: -890760 },
                { x: '2024-12-01', y: -321090 }
            ],
            backgroundColor: 'red-600'
        }
    ]);

    chartLegend = signal<LegendItem[]>([
        {
            label: 'Income',
            value: 1248583,
            increase: true,
            percent: 18,
            iconClass: '[&_svg]:fill-primary'
        },
        {
            label: 'Expenses',
            value: 782812,
            increase: false,
            percent: 12,
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

    formatCurrency(value: number): string {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);
    }

    valueFormatter = (value: any) => `$${value.toLocaleString()}`;
    yLabelFormatter = (value: any) => (value >= 1000 ? `${Math.round(value / 1000)}K` : value);
}
