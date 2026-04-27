import { Component, signal, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomCard } from '@/app/layout/components/ui/customcard';
import { ButtonModule } from 'primeng/button';
import { Table, TableModule } from 'primeng/table';
import { Avatar } from 'primeng/avatar';
import { InputText } from 'primeng/inputtext';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';

interface Order {
    id: string;
    order: {
        id: string;
        productName: string;
        productImage: string;
    };
    customer: {
        name: string;
        avatar: string;
        fallback: string;
        class: string;
    };
    date: string;
    account: string;
    email: string;
    total: string;
}

@Component({
    selector: '[last-orders]',
    standalone: true,
    imports: [CommonModule, FormsModule, CustomCard, ButtonModule, TableModule, Avatar, InputText, IconField, InputIcon],
    template: `
        <div custom-card headerStyleClass="md:flex-row flex-col max-h-none !items-start" actionStyleClass="flex-wrap !justify-normal">
            <h3 card-title>Last Orders</h3>
            <div card-action class="flex flex-wrap gap-2">
                <p-iconfield>
                    <p-inputicon class="pi pi-search" />
                    <input type="text" pInputText [(ngModel)]="globalFilterValue" (input)="onGlobalFilter($event)" placeholder="Search" />
                </p-iconfield>
                <p-button label="Filter" icon="pi pi-filter" severity="secondary" [outlined]="true" />
                <p-button label="Download" icon="pi pi-download" />
            </div>
            <div class="w-full">
                <p-table #dt [value]="lastOrders()" [(selection)]="selectedOrders" dataKey="id" [globalFilterFields]="['order.productName', 'order.id', 'customer.name', 'date', 'account', 'email', 'total']" [tableStyle]="{ 'min-width': '50rem' }">
                    <ng-template #header>
                        <tr>
                            <th style="width: 3rem">
                                <p-tableHeaderCheckbox />
                            </th>
                            <th>Order</th>
                            <th>Customer</th>
                            <th>Date</th>
                            <th>Account</th>
                            <th>Email Address</th>
                            <th>Total</th>
                            <th></th>
                        </tr>
                    </ng-template>
                    <ng-template #body let-order>
                        <tr>
                            <td>
                                <p-tableCheckbox [value]="order" />
                            </td>
                            <td>
                                <div class="flex items-center gap-4">
                                    <div class="w-12 h-12 overflow-hidden flex items-center justify-center shadow-sm border rounded-xl">
                                        <img [src]="order.order.productImage" [alt]="order.order.productName" class="w-full h-full object-cover" />
                                    </div>
                                    <div class="flex-1">
                                        <div class="font-medium line-clamp-1">{{ order.order.productName }}</div>
                                        <div class="mt-1 text-sm text-surface-500">{{ order.order.id }}</div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div class="flex items-center gap-2">
                                    <p-avatar [image]="order.customer.avatar" [label]="order.customer.fallback" size="large" [styleClass]="order.customer.class + ' !font-medium !text-base !w-10 !h-10 !rounded-xl'" />
                                    <span class="font-medium line-clamp-1">{{ order.customer.name }}</span>
                                </div>
                            </td>
                            <td>{{ order.date }}</td>
                            <td>{{ order.account }}</td>
                            <td>{{ order.email }}</td>
                            <td>{{ order.total }}</td>
                            <td>
                                <p-button severity="secondary" icon="pi pi-ellipsis-h" [text]="true" />
                            </td>
                        </tr>
                    </ng-template>
                </p-table>
            </div>
        </div>
    `,
    host: {
        class: 'col-span-12 overflow-hidden'
    }
})
export class LastOrders {
    dt = viewChild<Table>('dt');

    lastOrders = signal<Order[]>([
        {
            id: '1',
            order: {
                id: '#12546',
                productName: 'Macbook M2 Pro 14inch 16GB Ram 512 GB',
                productImage: '/demo/images/dashboard/macbook-1.png'
            },
            customer: {
                name: 'Jerome Bell',
                avatar: '',
                fallback: 'JB',
                class: '!bg-lime-200 !text-lime-950'
            },
            date: 'Mar 17th, 2024',
            account: '**** **** 8288',
            email: 'jeromebell@gmail.com',
            total: '$1.699,99'
        },
        {
            id: '2',
            order: {
                id: '#12545',
                productName: 'Macbook Air 14inch 8GB Ram 256 GB',
                productImage: '/demo/images/dashboard/macbook-1.png'
            },
            customer: {
                name: 'Annette Black',
                avatar: '',
                fallback: 'AB',
                class: '!bg-lime-200 !text-lime-950'
            },
            date: 'Mar 17th, 2024',
            account: '**** **** 8288',
            email: 'annetteblack@gmail.com',
            total: '$1.699,99'
        },
        {
            id: '3',
            order: {
                id: '#12544',
                productName: 'Macbook M3 Pro 16inch 16GB Ram 512 GB',
                productImage: '/demo/images/dashboard/macbook-1.png'
            },
            customer: {
                name: 'Jenny Wilson',
                avatar: '',
                fallback: 'JW',
                class: '!bg-lime-200 !text-lime-950'
            },
            date: 'Mar 17th, 2024',
            account: '**** **** 8288',
            email: 'jennywilson@gmail.com',
            total: '$1.699,99'
        },
        {
            id: '4',
            order: {
                id: '#12543',
                productName: 'Macbook Air 14inch 16GB Ram 256 GB',
                productImage: '/demo/images/dashboard/macbook-2.png'
            },
            customer: {
                name: 'Leslie Alexander',
                avatar: '',
                fallback: 'LA',
                class: '!bg-rose-200 !text-rose-950'
            },
            date: 'Mar 17th, 2024',
            account: '**** **** 8288',
            email: 'lesliealexander@gmail.com',
            total: '$1.699,99'
        },
        {
            id: '5',
            order: {
                id: '#12542',
                productName: 'Macbook M3 Max 14inch 32GB Ram 1T GB',
                productImage: '/demo/images/dashboard/macbook-2.png'
            },
            customer: {
                name: 'Jenny Wilson',
                avatar: '',
                fallback: 'JW',
                class: '!bg-lime-200 !text-lime-950'
            },
            date: 'Mar 17th, 2024',
            account: '**** **** 8288',
            email: 'jennywilson@gmail.com',
            total: '$1.699,99'
        }
    ]);

    selectedOrders: Order[] = [];
    globalFilterValue = '';

    onGlobalFilter(event: Event) {
        const target = event.target as HTMLInputElement;
        this.dt()?.filterGlobal(target.value, 'contains');
    }
}
