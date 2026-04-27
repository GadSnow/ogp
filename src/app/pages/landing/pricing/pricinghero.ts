import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SurfaceLine } from '@/app/layout/components/icons/surfaceline';
import { CustomersBadge } from '@/app/layout/components/shared/customersbadge';

interface PricingButton {
    label: string;
    value: 'monthly' | 'yearly';
}

interface PricingPlan {
    name: string;
    price: {
        monthly: string;
        yearly: string;
    };
    description: string;
    features: string[];
}

@Component({
    selector: 'pricing-hero',
    standalone: true,
    imports: [CommonModule, SurfaceLine, CustomersBadge],
    template: `
        <surface-line class="top-16 -left-36 2xl:left-0 md:w-[32vw]" />
        <surface-line class="top-16 -right-36 2xl:right-0 md:w-[32vw] scale-x-[-1]" />
        <surface-line class="-top-14 -left-20 2xl:left-0 md:w-[44vw] scale-y-[-1]" />
        <surface-line class="-top-14 -right-20 2xl:right-0 md:w-[44vw] scale-x-[-1] scale-y-[-1]" />
        <div class="landing-container pt-56 pb-24">
            <customers-badge />
            <h1 class="text-4xl md:text-5xl lg:text-7xl font-medium text-center mx-auto !leading-[125%]">
                Get a plan and<br />
                increase your efficiency
            </h1>
            <p class="mt-6 text-center mx-auto text-base md:text-lg text-surface-500 max-w-md md:max-w-2xl">Optimize your workflow and boost productivity by choosing the right plan tailored to your business needs.</p>
            <div class="mt-8 w-fit mx-auto flex items-center gap-3.5 p-2 rounded-full border">
                @for (button of pricingButtons(); track button.value) {
                    <button
                        (click)="selectedPricingButton.set(button)"
                        class="px-4 py-2 rounded-full font-medium transition-all min-w-24"
                        [class.bg-surface-0]="selectedPricingButton().value === button.value"
                        [class.dark:bg-surface-900]="selectedPricingButton().value === button.value"
                        [class.text-surface-900]="selectedPricingButton().value === button.value"
                        [class.dark:text-surface-0]="selectedPricingButton().value === button.value"
                        [class.shadow-stroke]="selectedPricingButton().value === button.value"
                        [class.text-surface-500]="selectedPricingButton().value !== button.value"
                        [class.hover:text-surface-900]="selectedPricingButton().value !== button.value"
                        [class.dark:hover:text-surface-0]="selectedPricingButton().value !== button.value"
                    >
                        {{ button.label }}
                    </button>
                }
            </div>
            <div class="mt-16 flex flex-col lg:flex-row gap-14 lg:gap-8 xl:gap-14 max-w-xl mx-auto lg:max-w-none">
                @for (plan of pricingPlans(); track plan.name) {
                    <div class="lg:flex-1 md:p-6 space-y-8">
                        <div class="w-fit">
                            <h4 class="font-medium px-4 py-2">{{ plan.name }}</h4>
                            <div class="flex items-center">
                                <span class="w-1 h-1 rounded-full bg-surface-200 dark:bg-surface-800"></span>
                                <span class="flex-1 h-px bg-surface-200 dark:bg-surface-800"></span>
                                <span class="w-1 h-1 rounded-full bg-surface-200 dark:bg-surface-800"></span>
                            </div>
                        </div>
                        <div class="relative h-[72px]">
                            <div class="text-6xl font-medium absolute inset-0 flex items-center">
                                <span class="mr-1">$</span>
                                @for (digit of getDigits(plan.price[selectedPricingButton().value]); track $index) {
                                    @if (isDigit(digit)) {
                                        <span class="tabular-nums price-digit" [style.animation-delay]="$index * 50 + 'ms'">{{ digit }}</span>
                                    } @else {
                                        <span class="opacity-0 tabular-nums">0</span>
                                    }
                                }
                            </div>
                        </div>
                        <p class="text-surface-500 text-lg">{{ plan.description }}</p>
                        <button class="landing-button-primary w-full rounded-xl">Get Started</button>
                        <div class="w-full h-px bg-surface-200 dark:bg-surface-800"></div>
                        <ul class="space-y-3">
                            @for (feature of plan.features; track feature) {
                                <li class="flex items-center gap-3">
                                    <i class="pi pi-check"></i>
                                    <span class="text-lg">{{ feature }}</span>
                                </li>
                            }
                        </ul>
                    </div>
                }
            </div>
        </div>
    `,
    styles: `
        .price-digit {
            animation: priceIn 0.25s ease forwards;
        }

        @keyframes priceIn {
            from {
                opacity: 0;
                transform: translateY(24px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `
})
export class PricingHero {
    pricingButtons = signal<PricingButton[]>([
        { label: 'Monthly', value: 'monthly' },
        { label: 'Yearly', value: 'yearly' }
    ]);

    pricingPlans = signal<PricingPlan[]>([
        {
            name: 'Basic',
            price: { monthly: '24_', yearly: '380' },
            description: 'Get started with essential tools to boost your productivity.',
            features: ['Simple Budget Management', 'Fund Transfers', 'Limited Support']
        },
        {
            name: 'Pro',
            price: { monthly: '64_', yearly: '620' },
            description: 'Unlock advanced features designed for growing businesses.',
            features: ['Simple Budget Management', 'Fund Transfers', 'Limited Support', 'Real-Time Alerts']
        },
        {
            name: 'Premium',
            price: { monthly: '96_', yearly: '860' },
            description: 'Access the full suite of features for maximum efficiency and control.',
            features: ['Simple Budget Management', 'Fund Transfers', 'All Pro Features', 'Higher Transaction Limits', 'Advanced Investment Tools', 'Rewards Program']
        }
    ]);

    selectedPricingButton = signal<PricingButton>(this.pricingButtons()[0]);

    getDigits(price: string): string[] {
        return price.toString().split('');
    }

    isDigit(digit: string): boolean {
        return digit !== '_';
    }
}
