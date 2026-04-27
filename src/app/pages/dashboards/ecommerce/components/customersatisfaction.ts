import { Component, computed, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { CustomCard } from '@/app/layout/components/ui/customcard';
import { ButtonModule } from 'primeng/button';
import { Menu } from 'primeng/menu';
import { Tag } from 'primeng/tag';

interface SatisfactionDataItem {
    color: string;
    label: string;
    value: number;
}

interface ColumnDataItem extends SatisfactionDataItem {
    numberOfColumns: number;
}

interface LegendDataItem extends SatisfactionDataItem {
    count: string;
}

@Component({
    selector: '[customer-satisfaction]',
    standalone: true,
    imports: [CommonModule, CustomCard, ButtonModule, Menu, Tag],
    template: `
        <div custom-card>
            <h3 card-title>Customer Satisfaction</h3>
            <div card-action>
                <p-button type="button" icon="pi pi-ellipsis-h" (click)="menu.toggle($event)" severity="secondary" [text]="true" />
                <p-menu #menu [model]="menuItems()" [popup]="true" />
            </div>
            <div class="p-5 flex flex-col">
                <div class="flex items-start gap-6">
                    @for (item of legendData(); track item.label; let i = $index) {
                        @if (i < satisfactionData().length - 1) {
                            <div class="flex gap-1">
                                <span class="w-[3px] rounded-full" [ngClass]="item.color"></span>
                                <div class="flex-1">
                                    <div class="font-semibold leading-none">{{ item.count }}</div>
                                    <div class="text-sm text-surface-500 mt-2 leading-none">{{ item.label }}</div>
                                </div>
                            </div>
                        }
                    }
                </div>
                <div class="mt-6">
                    <div class="text-surface-500 text-sm">Weekly Goal</div>
                    <div class="flex items-center gap-2">
                        <span class="text-3xl font-semibold">{{ weeklyGoal() }}</span>
                        <p-tag severity="success" value="12%" />
                    </div>
                </div>
                <div class="flex-1 min-h-48 w-full flex items-end gap-1">
                    @for (column of columnData(); track column.label) {
                        @for (n of getRange(column.numberOfColumns); track n) {
                            <div [ngClass]="['h-16', 'hover:h-20', 'flex-1', 'w-2', 'rounded-[1px]', 'transition-all', 'duration-[0.05s]', 'ease-in', column.color]"></div>
                        }
                        <div [ngClass]="['h-48', 'w-px', 'relative', column.color]">
                            <span class="absolute top-0 right-2 font-medium text-surface-500">{{ (column.value * 100).toFixed(0) }}%</span>
                        </div>
                    }
                </div>
            </div>
        </div>
    `,
    host: {
        class: 'col-span-12 xl:col-span-5'
    }
})
export class CustomerSatisfaction implements OnInit {
    private platformId = inject(PLATFORM_ID);

    satisfactionData = signal<SatisfactionDataItem[]>([
        { color: 'bg-primary', label: 'Total Customers', value: 0.56 },
        { color: 'bg-orange-600', label: 'Paid Customers', value: 0.38 },
        { color: 'bg-surface-200 dark:bg-surface-800', label: 'Excellent', value: 0.06 }
    ]);

    weeklyGoal = signal(5000);
    numberOfColumns = signal(48);
    columnData = signal<ColumnDataItem[]>([]);

    legendData = computed<LegendDataItem[]>(() => {
        return this.satisfactionData().map((item) => ({
            ...item,
            count: Math.floor(this.weeklyGoal() * item.value).toLocaleString()
        }));
    });

    menuItems = signal([
        {
            label: 'Options',
            items: [
                { label: 'Refresh', icon: 'pi pi-refresh' },
                { label: 'Export', icon: 'pi pi-upload' }
            ]
        }
    ]);

    ngOnInit() {
        if (isPlatformBrowser(this.platformId)) {
            const width = document.documentElement.clientWidth;
            if (width < 768) {
                this.numberOfColumns.set(24);
            }
        }
        this.prepareColumnData();
    }

    prepareColumnData() {
        let remaining = this.numberOfColumns();
        const data = this.satisfactionData();
        const columns = data.map((item, index) => {
            if (index < data.length - 1) {
                const cols = Math.floor(item.value * this.numberOfColumns());
                remaining -= cols;
                return { ...item, numberOfColumns: Math.max(cols, 5) };
            }
            return { ...item, numberOfColumns: Math.max(remaining, 5) };
        });
        this.columnData.set(columns);
    }

    getRange(n: number): number[] {
        return Array.from({ length: n }, (_, i) => i);
    }
}
