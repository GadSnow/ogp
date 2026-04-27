import { Component, ElementRef, HostListener, signal, viewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Logo } from '@/app/layout/components/icons';

@Component({
    selector: '[navbar]',
    standalone: true,
    imports: [RouterModule, Logo],
    template: `
        <!-- Desktop Navbar -->
        <div class="lg:block hidden fixed top-6 left-1/2 -translate-x-1/2 z-50 w-fit">
            <div class="rounded-full lg:block hidden border p-2 bg-surface-50 dark:bg-surface-950">
                <nav
                    class="rounded-full flex items-center gap-3.5 px-6 bg-surface-0 dark:bg-surface-900 shadow-[0px_28px_8px_0px_rgba(44,54,87,0.00),_0px_18px_7px_0px_rgba(44,54,87,0.01),_0px_10px_6px_0px_rgba(44,54,87,0.02),_0px_4px_4px_0px_rgba(44,54,87,0.03),_0px_1px_2px_0px_rgba(44,54,87,0.04)]"
                >
                    @for (item of leftSide; track item.label) {
                        <a [routerLink]="item.href">
                            <button [class]="buttonClass">
                                {{ item.label }}
                            </button>
                        </a>
                    }
                    <a routerLink="/landing">
                        <logo class="mx-8" />
                    </a>
                    @for (item of rightSide; track item.label) {
                        <a [routerLink]="item.href">
                            <button [class]="buttonClass">
                                {{ item.label }}
                            </button>
                        </a>
                    }
                </nav>
            </div>
        </div>

        <!-- Mobile Navbar -->
        <div
            #mobileNavbar
            class="lg:hidden fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full transition-[max-width] duration-300"
            [class.max-w-[20rem]]="isMobileMenuOpen()"
            [class.md:max-w-[24rem]]="isMobileMenuOpen()"
            [class.max-w-[12rem]]="!isMobileMenuOpen()"
        >
            <div class="lg:hidden rounded-[2.5rem] border p-2 bg-surface-50 dark:bg-surface-950">
                <nav
                    class="w-full rounded-[2rem] p-4 bg-surface-0 dark:bg-surface-900 shadow-[0px_28px_8px_0px_rgba(44,54,87,0.00),_0px_18px_7px_0px_rgba(44,54,87,0.01),_0px_10px_6px_0px_rgba(44,54,87,0.02),_0px_4px_4px_0px_rgba(44,54,87,0.03),_0px_1px_2px_0px_rgba(44,54,87,0.04)]"
                >
                    <div class="flex items-center justify-between gap-3.5">
                        <a routerLink="/landing">
                            <div class="flex items-center gap-2">
                                <logo />
                                @if (isMobileMenuOpen()) {
                                    <span class="font-semibold animate-fadein">AVALON</span>
                                }
                            </div>
                        </a>
                        <button (click)="toggleMobileMenu($event)" class="w-9 h-9 flex items-center justify-center rounded-full hover:bg-surface-100 dark:hover:bg-surface-800 transition-all">
                            <i class="pi pi-bars !leading-none"></i>
                        </button>
                    </div>
                    <div
                        class="transition-[max-height,opacity,margin] duration-300 overflow-hidden"
                        [class.max-h-80]="isMobileMenuOpen()"
                        [class.max-h-0]="!isMobileMenuOpen()"
                        [class.opacity-40]="!isMobileMenuOpen()"
                        [class.pointer-events-none]="!isMobileMenuOpen()"
                    >
                        <div class="h-80 pt-4 flex flex-col gap-4">
                            @for (item of leftSide; track item.label) {
                                <a [routerLink]="item.href">
                                    <button class="py-2 text-surface-500 hover:text-surface-950 dark:hover:text-surface-0 transition-all font-medium">
                                        {{ item.label }}
                                    </button>
                                </a>
                            }
                            @for (item of rightSide; track item.label) {
                                <a [routerLink]="item.href">
                                    <button class="py-2 text-surface-500 hover:text-surface-950 dark:hover:text-surface-0 transition-all font-medium">
                                        {{ item.label }}
                                    </button>
                                </a>
                            }
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    `,
    styles: `
        @keyframes fadein {
            from {
                opacity: 0;
                max-width: 0;
            }
            to {
                opacity: 1;
                max-width: 100px;
            }
        }
        .animate-fadein {
            animation: fadein 0.3s ease;
        }
    `
})
export class Navbar {
    mobileNavbar = viewChild<ElementRef>('mobileNavbar');

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

    buttonClass = 'cursor-pointer px-4 py-2 text-surface-500 hover:text-surface-950 dark:hover:text-surface-0 transition-all font-medium';

    isMobileMenuOpen = signal(false);

    toggleMobileMenu(event: Event) {
        event.stopPropagation();
        this.isMobileMenuOpen.update((v) => !v);
    }

    @HostListener('document:click', ['$event'])
    handleClickOutside(event: Event) {
        const mobileNav = this.mobileNavbar();
        if (mobileNav && !mobileNav.nativeElement.contains(event.target)) {
            this.isMobileMenuOpen.set(false);
        }
    }
}
