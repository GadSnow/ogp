import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomCard } from '@/app/layout/components/ui/customcard';
import { BarChart, BarChartDataset } from '@/app/layout/components/ui/charts/barchart';
import { ButtonModule } from 'primeng/button';
import { Menu } from 'primeng/menu';
import { Tag } from 'primeng/tag';

@Component({
    selector: '[general-sales-widget]',
    standalone: true,
    imports: [CommonModule, CustomCard, BarChart, ButtonModule, Menu, Tag],
    template: `
        <div custom-card>
            <h3 card-title>General Sales</h3>
            <div card-action>
                <p-button type="button" icon="pi pi-ellipsis-h" (click)="menu.toggle($event)" severity="secondary" [text]="true" />
                <p-menu #menu [model]="menuItems()" [popup]="true" />
            </div>
            <div class="p-5 flex-1 flex flex-col gap-8">
                <div class="flex items-start justify-between">
                    <div>
                        <div class="flex items-center gap-4">
                            <span class="text-4xl font-semibold">$278,942.12</span>
                            <p-tag severity="success" value="12%" />
                        </div>
                        <div class="mt-2 text-surface-500">From <span class="text-green-600 font-medium">$48,157.94 </span></div>
                    </div>
                </div>
                <div class="flex-1">
                    <div bar-chart [datasets]="datasets()" [valueFormatter]="valueFormatter" [yLabelFormatter]="yLabelFormatter" styleClass="!min-h-60"></div>
                </div>
            </div>
        </div>
    `,
    host: {
        class: 'col-span-12 xl:col-span-7 flex flex-col'
    }
})
export class GeneralSalesWidget {
    datasets = signal<BarChartDataset[]>([
        {
            label: 'Sales',
            data: [
                { x: '2023-01', y: 52000 },
                { x: '2023-02', y: 20000 },
                { x: '2023-03', y: 30000 },
                { x: '2023-04', y: 40000 },
                { x: '2023-05', y: 50000 },
                { x: '2023-06', y: 20000 },
                { x: '2023-07', y: 70000 },
                { x: '2023-08', y: 50000 },
                { x: '2023-09', y: 20000 },
                { x: '2023-10', y: 30000 },
                { x: '2023-11', y: 90000 },
                { x: '2023-12', y: 60000 }
            ],
            borderRadius: 8
        }
    ]);

    menuItems = signal([
        {
            label: 'Options',
            items: [
                { label: 'Refresh', icon: 'pi pi-refresh' },
                { label: 'Export', icon: 'pi pi-upload' }
            ]
        }
    ]);

    valueFormatter = (value: any) => `$${value.toLocaleString()}`;
    yLabelFormatter = (value: any) => (value >= 1000 ? `${Math.round(value / 1000)}K` : value);
}
