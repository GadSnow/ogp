import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomCard } from '@/app/layout/components/ui/customcard';
import { BarChart, BarChartDataset } from '@/app/layout/components/ui/charts/barchart';
import { Select } from 'primeng/select';

interface LegendItem {
    label: string;
    backgroundColorClass: string;
}

interface PeriodOption {
    name: string;
    code: string;
}

@Component({
    selector: '[overall-performance-summary]',
    standalone: true,
    imports: [CommonModule, FormsModule, CustomCard, BarChart, Select],
    template: `
        <div custom-card headerStyleClass="!max-h-none xl:flex-row flex-col !items-start xl:!items-center" actionStyleClass="w-full xl:w-auto justify-between">
            <h3 card-title>Overall Performance Summary</h3>
            <div card-action class="w-full xl:w-auto flex items-center justify-between gap-4">
                <div class="flex items-center gap-6">
                    @for (item of legendData(); track item.label) {
                        <div class="flex items-center gap-2">
                            <div class="w-3 h-3 rounded-[4px]" [ngClass]="item.backgroundColorClass"></div>
                            <span class="text-sm font-medium">{{ item.label }}</span>
                        </div>
                    }
                </div>
                <p-select [(ngModel)]="selectedPeriod" [options]="periods()" optionLabel="name" placeholder="Select a Period" class="w-full md:w-40" />
            </div>
            <div class="p-4 w-full">
                <div bar-chart styleClass="!min-w-[720px]" [datasets]="chartData()" [categoryPercentage]="0.6" [valueFormatter]="valueFormatter" [yLabelFormatter]="yLabelFormatter" [showYGrid]="true" [stacked]="false"></div>
            </div>
        </div>
    `,
    host: {
        class: 'col-span-12'
    }
})
export class OverallPerformanceSummary {
    chartData = signal<BarChartDataset[]>([
        {
            label: 'Income',
            data: [
                { x: '2024-01-01', y: 67432 },
                { x: '2024-02-01', y: 42189 },
                { x: '2024-03-01', y: 78901 },
                { x: '2024-04-01', y: 23456 },
                { x: '2024-05-01', y: 56789 },
                { x: '2024-06-01', y: 34567 },
                { x: '2024-07-01', y: 89012 },
                { x: '2024-08-01', y: 12345 },
                { x: '2024-09-01', y: 45678 },
                { x: '2024-10-01', y: 78901 },
                { x: '2024-11-01', y: 23456 },
                { x: '2024-12-01', y: 67890 }
            ]
        },
        {
            label: 'Expenses',
            data: [
                { x: '2024-01-01', y: 54321 },
                { x: '2024-02-01', y: 87654 },
                { x: '2024-03-01', y: 32109 },
                { x: '2024-04-01', y: 65432 },
                { x: '2024-05-01', y: 21098 },
                { x: '2024-06-01', y: 76543 },
                { x: '2024-07-01', y: 43210 },
                { x: '2024-08-01', y: 87654 },
                { x: '2024-09-01', y: 10987 },
                { x: '2024-10-01', y: 54321 },
                { x: '2024-11-01', y: 89076 },
                { x: '2024-12-01', y: 32109 }
            ],
            backgroundColor: 'violet-500'
        }
    ]);

    legendData = signal<LegendItem[]>([
        { label: 'Income', backgroundColorClass: 'bg-primary' },
        { label: 'Expenses', backgroundColorClass: 'bg-violet-500' }
    ]);

    selectedPeriod: PeriodOption = { name: 'Yearly', code: 'yearly' };
    periods = signal<PeriodOption[]>([
        { name: 'Yearly', code: 'yearly' },
        { name: 'Monthly', code: 'monthly' },
        { name: 'Weekly', code: 'weekly' },
        { name: 'Daily', code: 'daily' }
    ]);

    valueFormatter = (value: any) => `$${value.toLocaleString()}`;
    yLabelFormatter = (value: any) => (value >= 1000 ? `${Math.round(value / 1000)}K` : value);
}
