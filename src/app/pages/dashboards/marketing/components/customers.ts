import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomCard } from '@/app/layout/components/ui/customcard';
import { TableModule } from 'primeng/table';
import { Avatar } from 'primeng/avatar';
import { Tag } from 'primeng/tag';
import { Button } from 'primeng/button';

interface Customer {
    id: number;
    user: {
        name: string;
        avatar: {
            fallback: string;
            class: string;
        };
    };
    email: string;
    date: string;
    platform: string;
    company: string;
}

@Component({
    selector: '[customers]',
    standalone: true,
    imports: [CommonModule, CustomCard, TableModule, Avatar, Tag, Button],
    template: `
        <div custom-card>
            <h3 card-title>Customers</h3>
            <div card-action>
                <p-button label="View All" [text]="true" />
            </div>
            <div class="px-4 py-3">
                <p-table #dt [(selection)]="selectedCustomers" [value]="customers()" dataKey="id" [paginator]="true" [rows]="5" [rowsPerPageOptions]="[5, 10, 20, 50]" [tableStyle]="{ 'min-width': '50rem' }">
                    <ng-template #header>
                        <tr>
                            <th style="width: 3rem">
                                <p-tableHeaderCheckbox />
                            </th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Date</th>
                            <th>Platform</th>
                            <th>Company</th>
                            <th style="width: 3rem"></th>
                        </tr>
                    </ng-template>
                    <ng-template #body let-customer>
                        <tr>
                            <td>
                                <p-tableCheckbox [value]="customer" />
                            </td>
                            <td>
                                <div class="flex items-center gap-2">
                                    <p-avatar [label]="customer.user.avatar.fallback" size="large" [styleClass]="customer.user.avatar.class + ' !font-medium !text-base !w-10 !h-10 !rounded-xl'" />
                                    <span class="flex-1 line-clamp-1 font-medium">{{ customer.user.name }}</span>
                                </div>
                            </td>
                            <td>{{ customer.email }}</td>
                            <td>{{ customer.date }}</td>
                            <td>
                                <p-tag [severity]="getPlatformSeverity(customer.platform)" [value]="customer.platform" />
                            </td>
                            <td>{{ customer.company }}</td>
                            <td>
                                <p-button icon="pi pi-ellipsis-h" severity="secondary" [text]="true" />
                            </td>
                        </tr>
                    </ng-template>
                    <ng-template #paginatorleft let-state>
                        <div class="text-sm text-surface-500 font-medium">Shows {{ state.rows }} results of {{ state.totalRecords }}</div>
                    </ng-template>
                    <ng-template #paginatorright let-state>
                        <div class="flex items-center gap-2">
                            <p-button icon="pi pi-chevron-left" [rounded]="true" [text]="true" severity="secondary" (onClick)="dt.first = (state.page - 1) * state.rows" [disabled]="state.page === 0" />
                            <p-button icon="pi pi-chevron-right" [rounded]="true" [text]="true" severity="secondary" (onClick)="dt.first = (state.page + 1) * state.rows" [disabled]="state.page === state.pageCount - 1" />
                        </div>
                    </ng-template>
                </p-table>
            </div>
        </div>
    `,
    host: {
        class: 'col-span-12'
    }
})
export class Customers {
    selectedCustomers: Customer[] = [];

    customers = signal<Customer[]>([
        {
            id: 1,
            user: {
                name: 'Onyama Limba',
                avatar: {
                    fallback: 'OL',
                    class: '!bg-rose-200 !text-rose-950'
                }
            },
            email: 'hi@onyamalimba.co',
            date: 'May 5th, 2024',
            platform: 'Facebook',
            company: 'NovaVista'
        },
        {
            id: 2,
            user: {
                name: 'Courtney Henry',
                avatar: {
                    fallback: 'CH',
                    class: '!bg-blue-200 !text-blue-950'
                }
            },
            email: 'hi@courtneyhenry.com',
            date: 'May 7th, 2024',
            platform: 'Facebook',
            company: 'ZenithWorks'
        },
        {
            id: 3,
            user: {
                name: 'Jerome Bell',
                avatar: {
                    fallback: 'JB',
                    class: '!bg-green-200 !text-green-950'
                }
            },
            email: 'jeromebell@gmail.com',
            date: 'May 14th, 2024',
            platform: 'Twitter',
            company: 'BlueLeaf Solutions'
        },
        {
            id: 4,
            user: {
                name: 'Annette Black',
                avatar: {
                    fallback: 'AB',
                    class: '!bg-purple-200 !text-purple-950'
                }
            },
            email: 'hi@annetteblack.com',
            date: 'May 17th, 2024',
            platform: 'Facebook',
            company: 'VirtuoCreat'
        },
        {
            id: 5,
            user: {
                name: 'Dennis Russell',
                avatar: {
                    fallback: 'DR',
                    class: '!bg-amber-200 !text-amber-950'
                }
            },
            email: 'hi@dennisrussell.com',
            date: 'May 25th, 2024',
            platform: 'Instagram',
            company: 'LuminaTech'
        },
        {
            id: 6,
            user: {
                name: 'Amy Elsner',
                avatar: {
                    fallback: 'AE',
                    class: '!bg-indigo-200 !text-indigo-950'
                }
            },
            email: 'hi@amyelsner.com',
            date: 'Apr 5th, 2024',
            platform: 'Twitter',
            company: 'TerraFusion'
        },
        {
            id: 7,
            user: {
                name: 'Arlene McCoy',
                avatar: {
                    fallback: 'AM',
                    class: '!bg-teal-200 !text-teal-950'
                }
            },
            email: 'hi@arlenemccoy.com',
            date: 'Apr 5th, 2024',
            platform: 'Instagram',
            company: 'CrystalForge'
        }
    ]);

    getPlatformSeverity(platform: string): 'warn' | 'secondary' | 'success' | 'info' {
        const platformMap: Record<string, 'warn' | 'secondary' | 'success' | 'info'> = {
            Facebook: 'warn',
            Twitter: 'secondary',
            Instagram: 'success',
            LinkedIn: 'info'
        };
        return platformMap[platform] || 'info';
    }
}
