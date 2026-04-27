import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Logo, SurfaceLine } from '@/app/layout/components/icons';

@Component({
    selector: '[footer]',
    standalone: true,
    imports: [RouterModule, Logo, SurfaceLine],
    template: `
        <div class="relative py-12">
            <surface-line class="top-36 -left-72 2xl:-left-40 md:w-[48vw]" />
            <surface-line class="top-36 -right-72 2xl:-right-40 md:w-[48vw] scale-x-[-1]" />
            <footer class="space-y-12">
                <!-- Mobile view -->
                <div class="md:hidden space-y-8">
                    <div class="p-2 w-fit mx-auto rounded-full border bg-surface-50 dark:bg-surface-950">
                        <div
                            class="flex items-center justify-center w-16 h-16 bg-surface-0 dark:bg-surface-900 rounded-full shadow-[0px_28px_8px_0px_rgba(44,54,87,0.00),0px_18px_7px_0px_rgba(44,54,87,0.01),0px_10px_6px_0px_rgba(44,54,87,0.02),0px_4px_4px_0px_rgba(44,54,87,0.03),0px_1px_2px_0px_rgba(44,54,87,0.04)]"
                        >
                            <logo />
                        </div>
                    </div>
                    <div class="p-2 w-fit mx-auto rounded-full border bg-surface-50 dark:bg-surface-950">
                        <div
                            class="flex p-4 items-center justify-center gap-3.5 bg-surface-0 dark:bg-surface-900 rounded-full shadow-[0px_28px_8px_0px_rgba(44,54,87,0.00),0px_18px_7px_0px_rgba(44,54,87,0.01),0px_10px_6px_0px_rgba(44,54,87,0.02),0px_4px_4px_0px_rgba(44,54,87,0.03),0px_1px_2px_0px_rgba(44,54,87,0.04)]"
                        >
                            @for (item of leftSide; track item.label) {
                                <a [routerLink]="item.href">
                                    <button [class]="buttonClass">
                                        {{ item.label }}
                                    </button>
                                </a>
                            }
                        </div>
                    </div>
                    <div class="p-2 w-fit mx-auto rounded-full border bg-surface-50 dark:bg-surface-950">
                        <div
                            class="flex p-4 items-center justify-center gap-3.5 bg-surface-0 dark:bg-surface-900 rounded-full shadow-[0px_28px_8px_0px_rgba(44,54,87,0.00),0px_18px_7px_0px_rgba(44,54,87,0.01),0px_10px_6px_0px_rgba(44,54,87,0.02),0px_4px_4px_0px_rgba(44,54,87,0.03),0px_1px_2px_0px_rgba(44,54,87,0.04)]"
                        >
                            @for (item of rightSide; track item.label) {
                                <a [routerLink]="item.href">
                                    <button [class]="buttonClass">
                                        {{ item.label }}
                                    </button>
                                </a>
                            }
                        </div>
                    </div>
                </div>

                <!-- Desktop view -->
                <div class="w-fit mx-auto md:block hidden">
                    <div class="rounded-full border p-2 bg-surface-50 dark:bg-surface-950">
                        <div
                            class="rounded-full flex items-center gap-3.5 p-6 bg-surface-0 dark:bg-surface-900 shadow-[0px_28px_8px_0px_rgba(44,54,87,0.00),_0px_18px_7px_0px_rgba(44,54,87,0.01),_0px_10px_6px_0px_rgba(44,54,87,0.02),_0px_4px_4px_0px_rgba(44,54,87,0.03),_0px_1px_2px_0px_rgba(44,54,87,0.04)]"
                        >
                            @for (item of leftSide; track item.label) {
                                <a [routerLink]="item.href">
                                    <button [class]="buttonClass">
                                        {{ item.label }}
                                    </button>
                                </a>
                            }
                            <logo class="mx-8" />
                            @for (item of rightSide; track item.label) {
                                <a [routerLink]="item.href">
                                    <button [class]="buttonClass">
                                        {{ item.label }}
                                    </button>
                                </a>
                            }
                        </div>
                    </div>
                </div>

                <!-- Social links -->
                <div class="w-fit mx-auto">
                    <div class="rounded-full border p-2 bg-surface-50 dark:bg-surface-950">
                        <div
                            class="rounded-full flex items-center gap-2 p-2 bg-surface-0 dark:bg-surface-900 shadow-[0px_28px_8px_0px_rgba(44,54,87,0.00),_0px_18px_7px_0px_rgba(44,54,87,0.01),_0px_10px_6px_0px_rgba(44,54,87,0.02),_0px_4px_4px_0px_rgba(44,54,87,0.03),_0px_1px_2px_0px_rgba(44,54,87,0.04)]"
                        >
                            @for (item of socialLinks; track item.icon) {
                                <a [href]="item.href" target="_blank">
                                    <button [class]="buttonClass" class="!text-surface-950 dark:!text-surface-0 hover:!opacity-50">
                                        <i [class]="item.icon" class="!leading-none"></i>
                                    </button>
                                </a>
                            }
                        </div>
                    </div>
                </div>

                <!-- Copyright -->
                <div class="w-fit mx-auto">
                    <p class="text-surface-500">&copy; {{ currentYear }} PrimeTek</p>
                </div>
            </footer>
        </div>
    `
})
export class Footer {
    leftSide = [
        { label: 'Home', href: '/landing' },
        { label: 'Features', href: '/landing/features' },
        { label: 'Pricing', href: '/landing/pricing' }
    ];

    rightSide = [
        { label: 'Contact', href: '/landing/contact' },
        { label: 'Login', href: '/auth/login' },
        { label: 'Register', href: '/auth/register' }
    ];

    socialLinks = [
        { icon: 'pi pi-youtube', href: 'https://www.youtube.com' },
        { icon: 'pi pi-twitter', href: 'https://www.twitter.com' },
        { icon: 'pi pi-discord', href: 'https://www.discord.com' }
    ];

    buttonClass = 'px-4 py-2 text-surface-500 hover:text-surface-950 dark:hover:text-surface-0 transition-all font-medium';

    currentYear = new Date().getFullYear();
}
