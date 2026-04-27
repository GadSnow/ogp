import { Component, input, signal, booleanAttribute } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'customers-badge',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div [class]="showLabel() ? 'pr-3' : ''" class="p-1 mb-2 w-fit mx-auto rounded-full flex items-center gap-2 border">
            <div class="flex items-center -space-x-2">
                @for (item of customers(); track $index) {
                    <span class="rounded-full overflow-hidden w-6 h-6 border border-surface-50 dark:border-surface-800">
                        <img [src]="item.avatar" class="w-full h-full object-cover" />
                    </span>
                }
            </div>
            @if (showLabel()) {
                <span class="w-px h-3 bg-surface-200 dark:bg-surface-800"></span>
                <span class="text-sm text-surface-500">Happy Customers</span>
            }
        </div>
    `
})
export class CustomersBadge {
    showLabel = input(true, { transform: booleanAttribute });

    customers = signal([
        { avatar: '/demo/images/avatar/avatar-m-1.png' },
        { avatar: '/demo/images/avatar/avatar-f-1.png' },
        { avatar: '/demo/images/avatar/avatar-m-2.png' },
        { avatar: '/demo/images/avatar/avatar-f-2.png' },
        { avatar: '/demo/images/avatar/avatar-m-3.png' },
        { avatar: '/demo/images/avatar/avatar-f-5.png' },
        { avatar: '/demo/images/avatar/avatar-m-4.png' },
        { avatar: '/demo/images/avatar/avatar-f-4.png' }
    ]);
}
