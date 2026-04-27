import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomCard } from '@/app/layout/components/ui/customcard';
import { ButtonModule } from 'primeng/button';
import { Avatar } from 'primeng/avatar';

interface ReviewPoint {
    label: string;
    count: string;
}

interface Review {
    name: string;
    comment: string;
    date: string;
    avatar: string;
}

interface ReviewData {
    [key: string]: Review[];
}

@Component({
    selector: '[received-reviews]',
    standalone: true,
    imports: [CommonModule, CustomCard, ButtonModule, Avatar],
    template: `
        <div custom-card actionStyleClass="pr-2">
            <h3 card-title>Received Reviews</h3>
            <div card-action>
                <p-button label="View All" [text]="true" />
            </div>
            <div class="flex flex-col">
                <div class="flex items-center h-8 w-full border-b divide-x divide-surface-200 dark:divide-surface-700">
                    @for (point of points(); track point.label) {
                        <button
                            type="button"
                            class="cursor-pointer flex flex-1 items-center justify-center gap-1 font-medium text-sm h-full transition-colors"
                            [ngClass]="activePoint().label === point.label ? 'bg-surface-100 dark:bg-surface-800' : 'hover:bg-surface-100 dark:hover:bg-surface-800'"
                            (click)="activePoint.set(point)"
                        >
                            <i class="pi pi-star-fill text-yellow-500 !text-sm"></i>
                            <span>{{ point.label }}</span>
                            <span>({{ point.count }})</span>
                        </button>
                    }
                </div>
                <div class="flex-1 overflow-auto">
                    @for (item of activeReviews(); track item.name) {
                        <div class="p-4 flex items-center gap-3">
                            <p-avatar [image]="item.avatar" styleClass="!w-10 !h-10" shape="circle" />
                            <div class="flex-1">
                                <div class="flex items-center justify-between">
                                    <span class="font-medium line-clamp-1">{{ item.name }}</span>
                                    <span class="text-sm text-surface-500">{{ item.date }}</span>
                                </div>
                                <p class="text-sm text-surface-500 line-clamp-1 mt-0.5">{{ item.comment }}</p>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    `,
    host: {
        class: 'col-span-12 xl:col-span-4'
    }
})
export class ReceivedReviews {
    points = signal<ReviewPoint[]>([
        { label: '5', count: '514' },
        { label: '4', count: '420' },
        { label: '3', count: '230' },
        { label: '2', count: '120' },
        { label: '1', count: '10' }
    ]);

    reviewData = signal<ReviewData>({
        '5': [
            {
                name: 'Brook Simmons',
                comment: 'My order arrived right on time and without any issues. The product quality is fantastic, thank you!',
                date: '2024-09-24',
                avatar: '/demo/images/avatar/avatar-m-1.png'
            },
            {
                name: 'Annette Black',
                comment: "Shopping here is so easy and fast! I'm always satisfied with my purchases",
                date: '2024-09-24',
                avatar: '/demo/images/avatar/avatar-f-1.png'
            },
            {
                name: 'Arlene McCoy',
                comment: 'Customer service is incredibly attentive and solution-oriented. I will definitely shop again',
                date: '2024-09-24',
                avatar: '/demo/images/avatar/avatar-m-2.png'
            }
        ],
        '4': [
            {
                name: 'Leslie Alexander',
                comment: 'Great product overall, but shipping took a bit longer than expected. Still happy with my purchase.',
                date: '2024-09-23',
                avatar: '/demo/images/avatar/avatar-m-3.png'
            },
            {
                name: 'Jenny Wilson',
                comment: 'Product quality is excellent. Would give 5 stars but the packaging could be more eco-friendly.',
                date: '2024-09-23',
                avatar: '/demo/images/avatar/avatar-f-2.png'
            }
        ],
        '3': [
            {
                name: 'Robert Fox',
                comment: "Product is okay, but there's room for improvement. Customer service was helpful though.",
                date: '2024-09-22',
                avatar: '/demo/images/avatar/avatar-m-4.png'
            },
            {
                name: 'Wade Warren',
                comment: 'Average product for the price. Expected a bit more features but it works fine.',
                date: '2024-09-22',
                avatar: '/demo/images/avatar/avatar-f-3.png'
            }
        ],
        '2': [
            {
                name: 'Esther Howard',
                comment: 'Disappointed with the quality. Not what I expected based on the description.',
                date: '2024-09-21',
                avatar: '/demo/images/avatar/avatar-m-3.png'
            },
            {
                name: 'Cameron Williamson',
                comment: 'Product arrived damaged. Customer service helped but still not fully satisfied.',
                date: '2024-09-21',
                avatar: '/demo/images/avatar/avatar-m-4.png'
            }
        ],
        '1': [
            {
                name: 'Guy Hawkins',
                comment: 'Very poor quality and customer service was unresponsive. Would not recommend.',
                date: '2024-09-20',
                avatar: '/demo/images/avatar/avatar-f-4.png'
            }
        ]
    });

    activePoint = signal<ReviewPoint>(this.points()[0]);

    activeReviews = computed(() => this.reviewData()[this.activePoint().label] || []);
}
