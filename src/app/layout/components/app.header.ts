import { Component, computed, inject, signal } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { filter, map } from 'rxjs/operators';
import { toSignal } from '@angular/core/rxjs-interop';
import { StyleClassModule } from 'primeng/styleclass';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { Avatar } from 'primeng/avatar';
import { LayoutService } from '@/app/layout/service/layout.service';
import { AuthService } from '@/app/core/services/auth.service';
import { AppNotifications } from './app.notifications';
import { AppProfile } from './app.profile';
import { AppRightMenu } from './app.rightmenu';

@Component({
    selector: '[app-header]',
    standalone: true,
    imports: [CommonModule, FormsModule, StyleClassModule, InputTextModule, ButtonModule, Avatar, AppNotifications, AppProfile, AppRightMenu],
    template: `
        <!-- Left: hamburger + page title -->
        <div class="topbar-left">
            @if (showMenuButton()) {
                <button type="button" (click)="layoutService.toggleMenu()" class="menu-button">
                    <i class="pi pi-bars"></i>
                </button>
            }
            <!-- <span class="page-title">{{ pageTitle() }}</span> -->
        </div>

        <!-- Center: search (hidden on mobile) -->
        <div class="topbar-center hidden lg:flex">
            <!-- <div class="relative w-full">
                <i class="pi pi-search absolute left-3 top-1/2 -translate-y-1/2 text-surface-400 pointer-events-none" style="font-size:0.8rem"></i>
                <input
                    pInputText
                    type="text"
                    [(ngModel)]="search"
                    placeholder="Rechercher..."
                    class="w-full! h-9! pl-9! text-sm! rounded-lg! bg-surface-50! dark:bg-surface-800! border-surface-200! dark:border-surface-700!"
                />
            </div> -->
        </div>

        <!-- Right: actions -->
        <div class="topbar-right">
            <div class="topbar-actions">

                <!-- Mobile hamburger -->
                <button type="button" (click)="layoutService.toggleMenu()" class="menu-button menu-button-mobile">
                    <i class="pi pi-bars"></i>
                </button>

                <!-- Notifications -->
                <!-- <div class="relative">
                    <a
                        pStyleClass="@next"
                        enterFromClass="hidden"
                        enterActiveClass="p-anchored-overlay-enter-active"
                        leaveActiveClass="p-anchored-overlay-leave-active"
                        leaveToClass="hidden"
                        [hideOnOutsideClick]="true"
                    >
                        <button type="button" class="topbar-icon-btn">
                            <i class="pi pi-bell"></i>
                        </button>
                    </a>
                    <div class="absolute hidden min-w-72 top-auto right-0 z-20 mt-2">
                        <div app-notifications styleClass="w-full sm:w-[22rem]"></div>
                    </div>
                </div> -->

                <!-- Theme / config -->
                <!-- <button type="button" (click)="layoutService.toggleConfigSidebar()" class="app-config-button">
                    <i class="pi pi-sliders-h"></i>
                </button> -->

                <!-- User avatar + dropdown -->
                <div class="relative">
                    <a
                        pStyleClass="@next"
                        enterFromClass="hidden"
                        enterActiveClass="p-anchored-overlay-enter-active"
                        leaveActiveClass="p-anchored-overlay-leave-active"
                        leaveToClass="hidden"
                        [hideOnOutsideClick]="true"
                        class="flex items-center gap-2 cursor-pointer rounded-lg px-2 py-1 hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors"
                    >
                        <p-avatar
                            [label]="userInitials()"
                            class="rounded-lg! overflow-hidden! w-8! h-8! shrink-0"
                            [style]="{'background': 'var(--p-primary-600)', 'color': '#fff', 'font-size': '0.7rem', 'font-weight': '600'}"
                        />
                        <span class="text-sm font-medium hidden md:block leading-none">Utilisateur</span>
                        <i class="pi pi-angle-down text-xs hidden md:block text-surface-400"></i>
                    </a>
                    <div class="absolute hidden top-full right-0 mt-2 z-20">
                        <div app-profile class="w-52"></div>
                    </div>
                </div>

                <div app-rightmenu></div>

            </div>
        </div>
    `
})
export class AppHeader {
    layoutService = inject(LayoutService);
    authService = inject(AuthService);
    private router = inject(Router);
    private activatedRoute = inject(ActivatedRoute);

    search = signal('');

    currentUser = computed(() => this.authService.getCurrentUser());

    userInitials = computed(() => {
        return 'UT';
    });

    showMenuButton = computed(() => {
        const menuMode = this.layoutService.layoutConfig().menuMode;
        return menuMode === 'overlay' || menuMode === 'static';
    });

    private pageTitle$ = this.router.events.pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        map(() => {
            let route = this.activatedRoute;
            while (route.firstChild) {
                route = route.firstChild;
            }
            return route.snapshot.data['title'] || 'Dashboard';
        })
    );

    pageTitle = toSignal(this.pageTitle$, { initialValue: 'Dashboard' });

    logout(): void {
        this.authService.logout();
        this.router.navigate(['/auth/login']);
    }
}
