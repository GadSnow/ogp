import { AppBreadcrumb } from '@/app/layout/components/app.breadcrumb';
import { LayoutService } from '@/app/layout/service/layout.service';
import { CommonModule } from '@angular/common';
import { Component, computed, effect, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppConfigurator } from './app.configurator';
import { AppSidebar } from './app.sidebar';
import { AppHeader } from './app.header';


@Component({
    selector: 'app-layout',
    standalone: true,
    imports: [CommonModule, AppHeader, AppSidebar, RouterModule, AppConfigurator, AppBreadcrumb],
    template: `
        <div class="layout-wrapper h-dvh bg-surface-100 dark:bg-surface-950 relative p-2 flex overflow-hidden" [ngClass]="containerClass()">
        <div app-sidebar></div>
        <main class="layout-content-wrapper flex-1 max-w-430 w-full mx-auto flex flex-col transition-all duration-300 h-full bg-background rounded-xl shadow-card overflow-hidden">
            <header app-header class="layout-topbar z-40!"></header>
            <div app-breadcrumb class="max-h-16 py-4 pr-4 pl-6 flex items-center gap-2 border-b"></div>
            <div class="p-6 flex-1 overflow-auto scrollable-content bg-surface-100 dark:bg-surface-950">
                <router-outlet></router-outlet>
            </div>
        </main>
        <app-configurator />
        <div class="layout-mask"></div>
    </div> `
})
export class AppLayout {
    layoutService = inject(LayoutService);

    containerClass = computed(() => {
        const layoutConfig = this.layoutService.layoutConfig();
        const layoutState = this.layoutService.layoutState();

        return {
            'layout-overlay': layoutConfig.menuMode === 'overlay',
            'layout-static': layoutConfig.menuMode === 'static',
            'layout-slim': layoutConfig.menuMode === 'slim',
            'layout-horizontal': layoutConfig.menuMode === 'horizontal',
            'layout-compact': layoutConfig.menuMode === 'compact',
            'layout-reveal': layoutConfig.menuMode === 'reveal',
            'layout-drawer': layoutConfig.menuMode === 'drawer',
            'layout-overlay-active': layoutState.overlayMenuActive,
            'layout-mobile-active': layoutState.mobileMenuActive,
            'layout-static-inactive': layoutState.staticMenuInactive,
            'layout-sidebar-expanded': layoutState.sidebarExpanded,
            'layout-sidebar-anchored': layoutState.anchored,
            [`layout-sidebar-${layoutConfig.darkTheme ? 'dark' : 'light'}`]: true
        };
    });
}
