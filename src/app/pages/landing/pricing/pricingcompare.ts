import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface PricingPlan {
    name: string;
    features: string[];
}

@Component({
    selector: 'pricing-compare',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="landing-container pt-6 md:pt-24 md:pb-56">
            <!-- Desktop View -->
            <div class="hidden lg:flex gap-4">
                <div class="flex-[calc(1-(0.23*3))] p-2 rounded-[1.75rem] bg-surface-50 dark:bg-surface-950 border">
                    <div
                        class="flex flex-col divide-y divide-surface-200 dark:divide-surface-800 rounded-3xl bg-surface-0 dark:bg-surface-900 shadow-[0px_129.205px_36.493px_0px_rgba(44,54,87,0.00),_0px_82.849px_33.534px_0px_rgba(44,54,87,0.01),_0px_46.356px_27.616px_0px_rgba(44,54,87,0.05),_0px_20.712px_20.712px_0px_rgba(44,54,87,0.09),_0px_4.932px_11.836px_0px_rgba(44,54,87,0.10)]"
                    >
                        <div class="flex-1 px-6 py-4 text-lg font-medium text-primary-active">Plan</div>
                        @for (item of features(); track item) {
                            <div class="flex-1 px-6 py-4">
                                <h3 class="text-lg font-medium">{{ item }}</h3>
                            </div>
                        }
                    </div>
                </div>
                @for (plan of plans(); track plan.name) {
                    <div class="flex-[0.23] p-2 rounded-[1.75rem] bg-surface-50 dark:bg-surface-950 border">
                        <div
                            class="flex flex-col h-full divide-y divide-surface-200 dark:divide-surface-800 rounded-3xl bg-surface-0 dark:bg-surface-900 shadow-[0px_129.205px_36.493px_0px_rgba(44,54,87,0.00),_0px_82.849px_33.534px_0px_rgba(44,54,87,0.01),_0px_46.356px_27.616px_0px_rgba(44,54,87,0.05),_0px_20.712px_20.712px_0px_rgba(44,54,87,0.09),_0px_4.932px_11.836px_0px_rgba(44,54,87,0.10)]"
                        >
                            <div class="flex-1 px-6 py-4 text-lg font-medium text-primary-active text-center">{{ plan.name }}</div>
                            @for (item of plan.features; track $index) {
                                <div class="flex-1 px-6 py-4 text-center">
                                    @if (item === '__yes__') {
                                        <i class="pi pi-check"></i>
                                    } @else if (item === '__no__') {
                                        <i class="pi pi-minus opacity-50 !text-sm"></i>
                                    } @else {
                                        <p class="text-lg">{{ item }}</p>
                                    }
                                </div>
                            }
                        </div>
                    </div>
                }
            </div>

            <!-- Mobile View -->
            <div class="lg:hidden flex flex-col">
                @for (item of features(); track item; let i = $index) {
                    <div class="p-2 rounded-full border bg-surface-50 dark:bg-surface-900">
                        <div
                            class="px-6 py-4 bg-surface-0 dark:bg-surface-950 rounded-full shadow-[0px_129.205px_36.493px_0px_rgba(44,54,87,0.00),_0px_82.849px_33.534px_0px_rgba(44,54,87,0.01),_0px_46.356px_27.616px_0px_rgba(44,54,87,0.05),_0px_20.712px_20.712px_0px_rgba(44,54,87,0.09),_0px_4.932px_11.836px_0px_rgba(44,54,87,0.10)]"
                        >
                            <h4 class="text-lg font-medium">{{ item }}</h4>
                        </div>
                    </div>
                    <div class="flex items-center justify-between">
                        @for (plan of plans(); track plan.name) {
                            <div class="flex-1 px-6 py-4 text-lg text-center">{{ plan.name }}</div>
                        }
                    </div>
                    <div class="h-px w-full bg-surface-200 dark:bg-surface-800"></div>
                    <div class="flex items-center justify-between">
                        @for (plan of plans(); track plan.name; let j = $index) {
                            <div class="flex-1 px-6 py-4 text-lg text-center">
                                @if (plan.features[i] === '__yes__') {
                                    <i class="pi pi-check"></i>
                                } @else if (plan.features[i] === '__no__') {
                                    <i class="pi pi-minus opacity-50 !text-sm"></i>
                                } @else {
                                    <p class="text-lg">{{ plan.features[i] }}</p>
                                }
                            </div>
                        }
                    </div>
                }
            </div>
        </div>
    `
})
export class PricingCompare {
    features = signal<string[]>(['3 Active Members', 'Up to 10 Components', 'High Request Limits', 'Unlimited Access', 'Advanced Analytics', 'Data Export', 'Prioritized Support', 'Real-time Updates', 'Batch Requests', 'Webhooks']);

    plans = signal<PricingPlan[]>([
        {
            name: 'Basic',
            features: ['$24', 'Unlimited', '10', '15', '__yes__', '__yes__', '__no__', '__no__', '__no__', '__no__']
        },
        {
            name: 'Pro',
            features: ['$64', 'Unlimited', '10', '15', '__yes__', '__yes__', '__yes__', '__no__', '__no__', '__no__']
        },
        {
            name: 'Premium',
            features: ['$96', 'Unlimited', '10', '15', '__yes__', '__yes__', '__yes__', '__yes__', '__yes__', '__yes__']
        }
    ]);
}
