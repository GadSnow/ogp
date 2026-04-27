import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneralSalesWidget, CustomerSatisfaction, StockStatus, ReceivedReviews, CargoStatus, TotalValue, TotalValueData, LastOrders } from './components';

@Component({
    selector: 'ecommerce-dashboard',
    standalone: true,
    imports: [CommonModule, GeneralSalesWidget, CustomerSatisfaction, StockStatus, ReceivedReviews, CargoStatus, TotalValue, LastOrders],
    template: `
        <div class="grid grid-cols-12 gap-4">
            <div general-sales-widget></div>
            <div customer-satisfaction></div>
            <div stock-status></div>
            <div received-reviews></div>
            <div cargo-status></div>
            <div class="col-span-12 grid grid-cols-1 xl:grid-cols-4 md:grid-cols-1 lg:grid-cols-2 gap-4">
                @for (item of totalValueData(); track item.title) {
                    <div total-value [data]="item"></div>
                }
            </div>
            <div last-orders></div>
        </div>
    `
})
export class EcommerceDashboard {
    totalValueData = signal<TotalValueData[]>([
        {
            title: 'Total Product',
            value: 1272,
            comparedToLastYear: 8.53,
            percent: 17,
            increase: true,
            datasets: [
                {
                    label: 'Total Product',
                    data: [
                        { x: '2023-01', y: 1200 },
                        { x: '2023-02', y: 3800 },
                        { x: '2023-03', y: 2500 },
                        { x: '2023-04', y: 1200 },
                        { x: '2023-05', y: 4800 },
                        { x: '2023-06', y: 2500 },
                        { x: '2023-07', y: 3100 },
                        { x: '2023-08', y: 1800 },
                        { x: '2023-09', y: 3400 },
                        { x: '2023-10', y: 4100 },
                        { x: '2023-11', y: 3700 },
                        { x: '2023-12', y: 2400 }
                    ],
                    backgroundColor: 'primary',
                    borderRadius: 4
                }
            ]
        },
        {
            title: 'Total Customer',
            value: 82214.98,
            comparedToLastYear: 8.53,
            percent: 17,
            increase: true,
            datasets: [
                {
                    label: 'Total Customer',
                    data: [
                        { x: '2023-01', y: 4200 },
                        { x: '2023-02', y: 2100 },
                        { x: '2023-03', y: 2800 },
                        { x: '2023-04', y: 4800 },
                        { x: '2023-05', y: 3400 },
                        { x: '2023-06', y: 2500 },
                        { x: '2023-07', y: 5000 },
                        { x: '2023-08', y: 1200 },
                        { x: '2023-09', y: 3600 },
                        { x: '2023-10', y: 3000 },
                        { x: '2023-11', y: 2200 },
                        { x: '2023-12', y: 600 }
                    ],
                    backgroundColor: 'orange-600',
                    borderRadius: 4
                }
            ]
        },
        {
            title: 'Total Sales',
            value: 271942.12,
            comparedToLastYear: 8.53,
            percent: 17,
            increase: true,
            valueFormatter: (value) => `$${value.toLocaleString()}`,
            datasets: [
                {
                    label: 'Total Sales',
                    data: [
                        { x: '2023-01', y: 1500 },
                        { x: '2023-02', y: 3200 },
                        { x: '2023-03', y: 2800 },
                        { x: '2023-04', y: 1100 },
                        { x: '2023-05', y: 4600 },
                        { x: '2023-06', y: 2800 },
                        { x: '2023-07', y: 5200 },
                        { x: '2023-08', y: 3200 },
                        { x: '2023-09', y: 4600 },
                        { x: '2023-10', y: 2800 },
                        { x: '2023-11', y: 5200 },
                        { x: '2023-12', y: 3400 }
                    ],
                    backgroundColor: 'emerald-600',
                    borderRadius: 4
                }
            ]
        },
        {
            title: 'Total Visitor',
            value: 510123.82,
            comparedToLastYear: 8.53,
            percent: 17,
            increase: false,
            datasets: [
                {
                    label: 'Total Visitor',
                    data: [
                        { x: '2023-01', y: 2800 },
                        { x: '2023-02', y: 3900 },
                        { x: '2023-03', y: 5200 },
                        { x: '2023-04', y: 3200 },
                        { x: '2023-05', y: 4600 },
                        { x: '2023-06', y: 4800 },
                        { x: '2023-07', y: 2100 },
                        { x: '2023-08', y: 3200 },
                        { x: '2023-09', y: 4600 },
                        { x: '2023-10', y: 2800 },
                        { x: '2023-11', y: 1100 },
                        { x: '2023-12', y: 2400 }
                    ],
                    backgroundColor: 'violet-600',
                    borderRadius: 4
                }
            ]
        }
    ]);
}
