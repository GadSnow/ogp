import { Component, computed, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomCard } from '@/app/layout/components/ui/customcard';
import { BarChart, BarChartDataset } from '@/app/layout/components/ui/charts/barchart';
import { ButtonModule } from 'primeng/button';
import { Menu } from 'primeng/menu';
import { Tag } from 'primeng/tag';
import { format } from 'date-fns';

export interface TotalValueData {
    title: string;
    value: number;
    comparedToLastYear: number;
    percent: number;
    increase: boolean;
    valueFormatter?: (value: number) => string;
    datasets: BarChartDataset[];
}

const defaultValueFormatter = (value: any) => value.toLocaleString();

@Component({
    selector: '[total-value]',
    standalone: true,
    imports: [CommonModule, CustomCard, BarChart, ButtonModule, Menu, Tag],
    template: `
        <div custom-card>
            <h3 card-title>{{ data().title }}</h3>
            <div card-action>
                <p-button type="button" icon="pi pi-ellipsis-h" (click)="menu.toggle($event)" severity="secondary" [text]="true" />
                <p-menu #menu [model]="menuItems()" [popup]="true" />
            </div>
            <div class="flex flex-col p-4 pb-1 gap-4">
                <div>
                    <div class="flex items-center gap-3">
                        <div class="text-2xl font-semibold">{{ formattedValue() }}</div>
                        <p-tag [severity]="data().increase ? 'success' : 'danger'" [value]="data().percent + '%'" />
                    </div>
                    <div class="mt-1 flex items-center gap-1">
                        @if (data().increase) {
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="15" viewBox="0 0 14 15" fill="none">
                                <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M8.74935 4.58333C8.74935 4.26117 9.01051 4 9.33268 4H12.2493C12.5715 4 12.8327 4.26117 12.8327 4.58333V7.5C12.8327 7.82218 12.5715 8.08333 12.2493 8.08333C11.9272 8.08333 11.666 7.82218 11.666 7.5V5.99162L8.82011 8.83753C8.13667 9.52096 7.02869 9.52096 6.34526 8.83753L5.66183 8.15409C5.43402 7.9263 5.06468 7.9263 4.83687 8.15409L2.16183 10.8291C1.93402 11.0569 1.56468 11.0569 1.33687 10.8291C1.10906 10.6014 1.10906 10.232 1.33687 10.0042L4.01191 7.32914C4.69533 6.64571 5.80337 6.64571 6.48677 7.32914L7.17021 8.01258C7.398 8.24037 7.76737 8.24037 7.99516 8.01258L10.8411 5.16667H9.33268C9.01051 5.16667 8.74935 4.9055 8.74935 4.58333Z"
                                    fill="#16A34A"
                                />
                            </svg>
                        } @else {
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="15" viewBox="0 0 14 15" fill="none">
                                <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M8.74935 10.4167C8.74935 10.7388 9.01051 11 9.33268 11H12.2493C12.5715 11 12.8327 10.7388 12.8327 10.4167V7.5C12.8327 7.17782 12.5715 6.91667 12.2493 6.91667C11.9272 6.91667 11.666 7.17782 11.666 7.5V9.00838L8.82011 6.16247C8.13667 5.47904 7.02869 5.47904 6.34526 6.16247L5.66183 6.84591C5.43402 7.0737 5.06468 7.0737 4.83687 6.84591L2.16183 4.17086C1.93402 3.94307 1.56468 3.94307 1.33687 4.17086C1.10906 4.39865 1.10906 4.76802 1.33687 4.99581L4.01191 7.67086C4.69533 8.35429 5.80337 8.35429 6.48677 7.67086L7.17021 6.98742C7.398 6.75963 7.76737 6.75963 7.99516 6.98742L10.8411 9.83333H9.33268C9.01051 9.83333 8.74935 10.0945 8.74935 10.4167Z"
                                    fill="#DC2626"
                                />
                            </svg>
                        }
                        <span class="text-xs font-medium" [class]="data().increase ? 'text-green-600' : 'text-red-600'">{{ data().comparedToLastYear }}</span>
                        <span class="text-xs text-surface-500">Compared to last year</span>
                    </div>
                </div>
                <div class="flex-1">
                    <div bar-chart styleClass="!min-h-20 !min-w-[290px]" [datasets]="datasets()" [valueFormatter]="valueFormatter()" [showYAxis]="false" [xLabelFormatter]="monthFormatter"></div>
                </div>
            </div>
        </div>
    `
})
export class TotalValue {
    data = input.required<TotalValueData>();

    menuItems = signal([
        {
            label: 'Options',
            items: [
                { label: 'Refresh', icon: 'pi pi-refresh' },
                { label: 'Export', icon: 'pi pi-upload' }
            ]
        }
    ]);

    datasets = computed(() => this.data().datasets);
    valueFormatter = computed(() => this.data().valueFormatter ?? defaultValueFormatter);
    formattedValue = computed(() => this.valueFormatter()(this.data().value));

    monthFormatter = (value: any) => format(value, 'MMM').charAt(0);
}
