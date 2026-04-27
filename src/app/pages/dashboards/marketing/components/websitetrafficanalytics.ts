import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomCard } from '@/app/layout/components/ui/customcard';
import { LineChart, LineChartDataset } from '@/app/layout/components/ui/charts/linechart';
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
    selector: '[website-traffic-analytics]',
    standalone: true,
    imports: [CommonModule, FormsModule, CustomCard, LineChart, Select],
    template: `
        <div custom-card headerStyleClass="!max-h-none xl:flex-row flex-col !items-start xl:!items-center" actionStyleClass="justify-between w-full xl:w-auto">
            <h3 card-title>Website Traffic Analytics</h3>
            <div card-action class="w-full xl:w-auto flex items-center justify-between gap-4">
                <div class="flex items-center gap-4">
                    @for (item of chartLegend(); track item.label) {
                        <div class="flex items-center gap-1.5">
                            <div class="w-3 h-3 rounded-[4px]" [ngClass]="item.backgroundColorClass"></div>
                            <span class="text-sm font-medium">{{ item.label }}</span>
                        </div>
                    }
                </div>
                <p-select [(ngModel)]="selectedPeriod" [options]="periods()" optionLabel="name" placeholder="Select a Period" class="w-full md:w-40" />
            </div>
            <div class="p-4 w-full">
                <div line-chart styleClass="min-h-72" [datasets]="chartData()" [tension]="0.1" [showPoints]="true" [showXBorder]="true" [minY]="2000"></div>
            </div>
        </div>
    `,
    host: {
        class: 'col-span-12 xl:col-span-6'
    }
})
export class WebsiteTrafficAnalytics {
    chartData = signal<LineChartDataset[]>([
        {
            label: 'Google',
            data: [
                { x: '2024-01-01', y: 6743 },
                { x: '2024-02-01', y: 8218 },
                { x: '2024-03-01', y: 7890 },
                { x: '2024-04-01', y: 7345 },
                { x: '2024-05-01', y: 8678 },
                { x: '2024-06-01', y: 8457 },
                { x: '2024-07-01', y: 8901 },
                { x: '2024-08-01', y: 8234 },
                { x: '2024-09-01', y: 7567 },
                { x: '2024-10-01', y: 8890 },
                { x: '2024-11-01', y: 8345 },
                { x: '2024-12-01', y: 8789 }
            ],
            borderColor: 'primary'
        },
        {
            label: 'Social Media',
            data: [
                { x: '2024-01-01', y: 5432 },
                { x: '2024-02-01', y: 4765 },
                { x: '2024-03-01', y: 5210 },
                { x: '2024-04-01', y: 4543 },
                { x: '2024-05-01', y: 5109 },
                { x: '2024-06-01', y: 4654 },
                { x: '2024-07-01', y: 4321 },
                { x: '2024-08-01', y: 4765 },
                { x: '2024-09-01', y: 5098 },
                { x: '2024-10-01', y: 4432 },
                { x: '2024-11-01', y: 4907 },
                { x: '2024-12-01', y: 5210 }
            ],
            borderColor: 'orange-600'
        }
    ]);

    chartLegend = signal<LegendItem[]>([
        { label: 'Google', backgroundColorClass: 'bg-primary' },
        { label: 'Social', backgroundColorClass: 'bg-orange-600' }
    ]);

    selectedPeriod: PeriodOption = { name: 'Yearly', code: 'yearly' };
    periods = signal<PeriodOption[]>([
        { name: 'Yearly', code: 'yearly' },
        { name: 'Monthly', code: 'monthly' },
        { name: 'Weekly', code: 'weekly' },
        { name: 'Daily', code: 'daily' }
    ]);
}
