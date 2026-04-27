import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomCard } from '@/app/layout/components/ui/customcard';
import { LineChart, LineChartDataset } from '@/app/layout/components/ui/charts/linechart';
import { Email, EmailNotification } from '@/app/layout/components/icons';
import { Select } from 'primeng/select';
import { Tag } from 'primeng/tag';

interface LegendItem {
    label: string;
    color: string;
    value: number;
    percent: number;
    increase: boolean;
    iconClass: string;
}

interface PeriodOption {
    name: string;
    code: string;
}

@Component({
    selector: '[email-marketing]',
    standalone: true,
    imports: [CommonModule, FormsModule, CustomCard, LineChart, Email, EmailNotification, Select, Tag],
    template: `
        <div custom-card>
            <h3 card-title>Email Marketing</h3>
            <div card-action>
                <p-select [(ngModel)]="selectedPeriod" [options]="periods()" optionLabel="name" placeholder="Select a Period" class="w-full md:w-40" />
            </div>
            <div class="flex flex-col">
                <div class="p-5 flex gap-10 border-b md:flex-row flex-col">
                    @for (item of chartLegend(); track item.label; let i = $index; let last = $last) {
                        <div class="flex-1 flex items-center gap-3">
                            <div class="w-12 h-12 flex items-center justify-center rounded-xl shadow-stroke" [ngClass]="item.iconClass">
                                @if (i === 0) {
                                    <email />
                                } @else {
                                    <email-notification />
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
                    <div line-chart styleClass="min-h-72" [datasets]="chartData()" [tension]="0.3" [maxY]="500000" [yStepSize]="100000" [showXBorder]="true" [area]="true" [showXGrid]="true" [showYGrid]="false" [showYAxis]="false"></div>
                </div>
            </div>
        </div>
    `,
    host: {
        class: 'col-span-12 xl:col-span-6'
    }
})
export class EmailMarketing {
    chartData = signal<LineChartDataset[]>([
        {
            label: 'Click Through Rate',
            data: [
                { x: '2024-01-01', y: 345670 },
                { x: '2024-02-01', y: 287890 },
                { x: '2024-03-01', y: 189450 },
                { x: '2024-04-01', y: 212340 },
                { x: '2024-05-01', y: 234560 },
                { x: '2024-06-01', y: 256780 },
                { x: '2024-07-01', y: 298450 },
                { x: '2024-08-01', y: 423670 },
                { x: '2024-09-01', y: 487890 },
                { x: '2024-10-01', y: 465430 },
                { x: '2024-11-01', y: 398760 },
                { x: '2024-12-01', y: 334560 }
            ],
            borderColor: 'primary',
            backgroundColor: [
                { color: 'primary', opacity: 0.12 },
                { color: 'primary', opacity: 0 }
            ]
        },
        {
            label: 'Open Rate',
            data: [
                { x: '2024-01-01', y: 189450 },
                { x: '2024-02-01', y: 312340 },
                { x: '2024-03-01', y: 434560 },
                { x: '2024-04-01', y: 456780 },
                { x: '2024-05-01', y: 478900 },
                { x: '2024-06-01', y: 491230 },
                { x: '2024-07-01', y: 467890 },
                { x: '2024-08-01', y: 345670 },
                { x: '2024-09-01', y: 289450 },
                { x: '2024-10-01', y: 312340 },
                { x: '2024-11-01', y: 389760 },
                { x: '2024-12-01', y: 401230 }
            ],
            borderColor: 'emerald-500',
            backgroundColor: [
                { color: 'emerald-500', opacity: 0.12 },
                { color: 'emerald-500', opacity: 0 }
            ]
        }
    ]);

    chartLegend = signal<LegendItem[]>([
        {
            label: 'Click Through Rate',
            color: 'primary',
            value: 24923,
            percent: 3,
            increase: true,
            iconClass: '[&_svg]:fill-primary'
        },
        {
            label: 'Open Rate',
            color: 'emerald-500',
            value: 19581,
            percent: 5,
            increase: true,
            iconClass: '[&_svg]:fill-emerald-500'
        }
    ]);

    selectedPeriod: PeriodOption = { name: 'Yearly', code: 'yearly' };
    periods = signal<PeriodOption[]>([
        { name: 'Yearly', code: 'yearly' },
        { name: 'Monthly', code: 'monthly' },
        { name: 'Weekly', code: 'weekly' },
        { name: 'Daily', code: 'daily' }
    ]);
}
