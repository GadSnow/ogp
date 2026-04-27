import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomCard } from '@/app/layout/components/ui/customcard';
import { ButtonModule } from 'primeng/button';

interface StockItem {
    label: string;
    color: string;
    value: number;
    base: number;
    percent?: number;
}

@Component({
    selector: '[stock-status]',
    standalone: true,
    imports: [CommonModule, CustomCard, ButtonModule],
    template: `
        <div custom-card actionStyleClass="pr-2">
            <h3 card-title>Stock Status</h3>
            <div card-action>
                <p-button label="View All" [text]="true" />
            </div>
            <div class="flex flex-col flex-1">
                <div class="border-b px-5 py-4">
                    <div class="flex justify-between relative">
                        <span class="text-sm font-medium">Product Stock</span>
                        <div class="text-sm font-medium">{{ totalValue().toLocaleString() }}/{{ totalBase().toLocaleString() }}</div>
                    </div>
                    <div class="mt-3 h-2 flex items-center gap-[2px] bg-surface-200 dark:bg-surface-700 rounded-full overflow-hidden">
                        @for (item of stockItems(); track item.label) {
                            <div class="h-full rounded-[1.5px]" [style.width]="(item.value / totalBase()) * 100 + '%'" [style.backgroundColor]="item.color"></div>
                        }
                    </div>
                </div>
                <div class="flex-1 flex flex-col gap-4 px-5 py-4 justify-between">
                    @for (item of stockItems(); track item.label) {
                        <div class="flex items-center justify-between gap-2">
                            <div class="flex items-center gap-2">
                                <div class="w-[12px] h-[5px] rounded-[1.5px]" [style.backgroundColor]="item.color"></div>
                                <span class="text-sm line-clamp-1">{{ item.label }}</span>
                            </div>
                            <div class="text-sm font-medium">{{ item.value.toLocaleString() }}/{{ item.base.toLocaleString() }}</div>
                        </div>
                    }
                </div>
            </div>
        </div>
    `,
    host: {
        class: 'col-span-12 xl:col-span-4 flex flex-col'
    }
})
export class StockStatus {
    stockItems = signal<StockItem[]>([
        { label: 'Macbook M2 Pro 14inch 16GB Ram 512 GB', color: '#2563EB', value: 12864, base: 20000 },
        { label: 'Macbook Air 14inch 8GB Ram 256 GB', color: '#7C3AED', value: 3425, base: 20000 },
        { label: 'Macbook M3 Pro 16inch 16GB Ram 512 GB', color: '#0891B2', value: 18512, base: 20000 },
        { label: 'Macbook Air 14inch 16GB Ram 256 GB', color: '#EA580C', value: 12720, base: 20000 },
        { label: 'Macbook M3 Max 14inch 32GB Ram 1T GB', color: '#0D9488', value: 16823, base: 20000 }
    ]);

    totalValue = computed(() => this.stockItems().reduce((sum, item) => sum + item.value, 0));
    totalBase = computed(() => this.stockItems().reduce((sum, item) => sum + item.base, 0));
}
