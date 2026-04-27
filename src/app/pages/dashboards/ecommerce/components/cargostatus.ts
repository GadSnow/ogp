import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomCard } from '@/app/layout/components/ui/customcard';
import { ButtonModule } from 'primeng/button';
import { Tag } from 'primeng/tag';

interface CargoLocation {
    date: string;
    time: string;
    location: string;
    postalCode: string;
}

interface CargoItem {
    status: string;
    type: string;
    id: string;
    product: {
        name: string;
        image: string;
    };
    from: CargoLocation;
    to: CargoLocation;
}

@Component({
    selector: '[cargo-status]',
    standalone: true,
    imports: [CommonModule, CustomCard, ButtonModule, Tag],
    template: `
        <div custom-card actionStyleClass="pr-2">
            <h3 card-title>Cargo Status</h3>
            <div card-action>
                <p-button label="View All" [text]="true" />
            </div>
            <div class="p-4 space-y-3 divide-y divide-surface-200 dark:divide-surface-700">
                @for (item of cargoStatus(); track item.id; let first = $first) {
                    <div [class]="first ? 'pt-0' : 'pt-4'">
                        <div (click)="toggleStatus(item.type)" class="flex items-center justify-between gap-7 cursor-pointer">
                            <div class="flex-1 flex items-center gap-4">
                                <div class="w-12 h-12 overflow-hidden flex items-center justify-center rounded-xl border">
                                    <img [src]="item.product.image" class="w-full h-full object-cover" />
                                </div>
                                <div class="flex-1">
                                    <div class="font-medium line-clamp-1">{{ item.product.name }}</div>
                                    <div class="text-sm mt-1 text-surface-500">{{ item.id }}</div>
                                </div>
                            </div>
                            <div class="flex flex-col items-end justify-between gap-2">
                                <i class="pi pi-chevron-down !text-xs transition-transform" [class.rotate-180]="selectedStatus() === item.type"></i>
                                <p-tag [severity]="item.type === 'sent' ? 'success' : 'warn'" [value]="item.status" />
                            </div>
                        </div>
                        @if (selectedStatus() === item.type) {
                            <div class="py-4 pl-5">
                                <div class="flex">
                                    <div class="flex flex-col items-center pt-1.5">
                                        <div class="w-[8px] h-[8px] border border-primary rounded-[2px]"></div>
                                        <div class="w-px flex-1 min-h-2 bg-primary"></div>
                                    </div>
                                    <div class="ml-4 flex items-center gap-16 justify-between">
                                        <div>
                                            <div class="text-sm font-medium">{{ formatDate(item.from.date) }}</div>
                                            <div class="text-sm text-surface-500 mt-1">{{ item.from.time }}</div>
                                        </div>
                                        <div class="flex-1">
                                            <div class="text-sm font-medium line-clamp-1">{{ item.from.location }}</div>
                                            <div class="text-sm text-surface-500 mt-1 line-clamp-1">{{ item.from.postalCode }}</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="flex">
                                    <div class="relative flex flex-col items-center pb-7">
                                        <span class="w-1.5 h-1.5 rounded-full bg-surface-400 absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2"></span>
                                        <div class="w-px flex-1 min-h-2 bg-surface-400"></div>
                                        <div class="w-[8px] h-[8px] border border-surface-400 rounded-[2px]"></div>
                                    </div>
                                    <div class="ml-4 pt-5 flex items-center gap-16 justify-between">
                                        <div>
                                            <div class="text-sm font-medium">{{ formatDate(item.to.date) }}</div>
                                            <div class="text-sm text-surface-500 mt-1">{{ item.to.time }}</div>
                                        </div>
                                        <div class="flex-1">
                                            <div class="text-sm font-medium line-clamp-1">{{ item.to.location }}</div>
                                            <div class="text-sm text-surface-500 mt-1 line-clamp-1">{{ item.to.postalCode }}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                }
            </div>
        </div>
    `,
    host: {
        class: 'col-span-12 xl:col-span-4'
    }
})
export class CargoStatus {
    selectedStatus = signal('sent');

    cargoStatus = signal<CargoItem[]>([
        {
            status: 'Sent',
            type: 'sent',
            id: '#12545',
            product: {
                name: 'Macbook Air 14inch 8GB Ram 256 GB',
                image: '/demo/images/dashboard/macbook-1.png'
            },
            from: {
                date: '2024-09-24',
                time: '10:00 AM',
                location: '123 Main Street, Anytown',
                postalCode: 'CA 12345'
            },
            to: {
                date: '2024-09-24',
                time: '10:00 AM',
                location: '456 Oak Drive, Springfield',
                postalCode: 'TX 78910'
            }
        },
        {
            status: 'Preparing',
            type: 'preparing',
            id: '#12544',
            product: {
                name: 'Macbook Air 14inch 8GB Ram 256 GB',
                image: '/demo/images/dashboard/macbook-1.png'
            },
            from: {
                date: '2024-09-24',
                time: '10:00 AM',
                location: '123 Main Street, Anytown',
                postalCode: 'CA 12345'
            },
            to: {
                date: '2024-09-24',
                time: '10:00 AM',
                location: 'New York, NY',
                postalCode: '10001'
            }
        }
    ]);

    toggleStatus(type: string) {
        this.selectedStatus.set(type);
    }

    formatDate(dateStr: string): string {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
}
