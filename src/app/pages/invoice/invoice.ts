import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Logo } from '@/app/layout/components/icons';
import { Divider } from 'primeng/divider';
import { TableModule } from 'primeng/table';

interface Product {
    description: string;
    quantity: string;
    price: string;
    total: string;
}

@Component({
    selector: 'app-invoice',
    standalone: true,
    imports: [CommonModule, Logo, Divider, TableModule],
    template: `
        <div class="card p-5 overflow-auto shadow-[0px_1px_2px_0px_rgba(18,18,23,0.05)]">
            <div class="flex items-start pt-6 px-6 pb-9 gap-6 flex-wrap-reverse">
                <div class="flex-1">
                    <div class="flex items-center gap-2">
                        <logo class="w-8 h-auto" />
                        <span class="text-2xl font-bold uppercase">Avalon</span>
                    </div>
                    <div class="mt-3 text-xs text-left">9137 3rd Lane California City CA 93504, U.S.A.</div>
                </div>
                <div class="flex flex-col text-right">
                    <h1 class="text-xl font-semibold">Invoice</h1>
                    <span class="mt-1.5 text-sm font-medium">#09022023</span>
                </div>
            </div>
            <p-divider />
            <div class="px-6 pb-9 pt-6 flex items-start gap-6 flex-wrap sm:flex-row flex-col">
                <div class="flex-1">
                    <div class="text-sm font-medium text-surface-500">Bill To:</div>
                    <div class="mt-2 text-sm font-medium">AlphaHex</div>
                    <div class="text-sm text-left mt-0.5">Claire Williams, 148 Hope Lane<br />Palo Alto, CA 94304.</div>
                </div>
                <div class="flex flex-col gap-3 min-w-64">
                    <div class="flex items-center justify-between gap-6">
                        <span class="text-sm">Client Name</span>
                        <span class="text-xs font-medium text-surface-950 dark:text-surface-0">Amy Elsner</span>
                    </div>
                    <div class="flex items-center justify-between gap-6">
                        <span class="text-sm">Date</span>
                        <span class="text-xs font-medium text-surface-950 dark:text-surface-0">04/19/2023</span>
                    </div>
                    <div class="flex items-center justify-between gap-6">
                        <span class="text-sm">Customer</span>
                        <span class="text-xs font-medium text-surface-950 dark:text-surface-0">A123</span>
                    </div>
                </div>
            </div>
            <p-divider />
            <div>
                <p-table [value]="products()" [tableStyle]="{ 'min-width': '50rem' }">
                    <ng-template #header>
                        <tr>
                            <th>Description</th>
                            <th>Quantity</th>
                            <th>Unit Price</th>
                            <th>Line Total</th>
                        </tr>
                    </ng-template>
                    <ng-template #body let-product>
                        <tr>
                            <td>{{ product.description }}</td>
                            <td>{{ product.quantity }}</td>
                            <td>{{ product.price }}</td>
                            <td>{{ product.total }}</td>
                        </tr>
                    </ng-template>
                </p-table>
                <div class="py-6 px-4 flex items-start gap-6 flex-wrap sm:flex-row flex-col">
                    <div class="flex-1 text-sm text-left text-surface-950 dark:text-surface-0">Notes</div>
                    <div class="flex flex-col gap-3 min-w-52">
                        <div class="flex items-center justify-between">
                            <span class="text-xs font-medium text-surface-950 dark:text-surface-0">Subtotal</span>
                            <span>$216.00</span>
                        </div>
                        <div class="flex items-center justify-between">
                            <span class="text-xs font-medium text-surface-950 dark:text-surface-0">Vat</span>
                            <span>0</span>
                        </div>
                        <div class="flex items-center justify-between">
                            <span class="text-xs font-medium text-surface-950 dark:text-surface-0">Total</span>
                            <span>$216.00</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
})
export class Invoice {
    products = signal<Product[]>([
        {
            description: 'Green T-Shirt',
            quantity: '1',
            price: '$49',
            total: '$49'
        },
        {
            description: 'Game Controller',
            quantity: '1',
            price: '$56',
            total: '$56'
        },
        {
            description: 'Mini Speakers',
            quantity: '1',
            price: '$72',
            total: '$72'
        }
    ]);
}
