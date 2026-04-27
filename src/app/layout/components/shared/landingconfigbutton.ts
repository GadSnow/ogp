import { Component, inject } from '@angular/core';
import { LayoutService } from '@/app/layout/service/layout.service';

@Component({
    selector: 'landing-config-button',
    standalone: true,
    template: ` <span class="relative z-30"><i class="pi pi-cog !text-lg"></i></span> `,
    host: {
        '(click)': 'layoutService.toggleConfigSidebar()',
        class: "cursor-pointer fixed right-4 bottom-4 z-50 lg:top-12 w-10 h-10 overflow-hidden flex items-center justify-center rounded-full before:content-[''] before:absolute before:-inset-5 before:bg-[conic-gradient(from_0deg_at_50%_50%,#f43f5e,#f97316,#eab308,#22c55e,#3b82f6,#8b5cf6,#ec4899,#f43f5e)] before:animate-spin after:content-[''] after:z-20 after:absolute after:inset-0.5 after:rounded-full after:bg-surface-0/95 dark:after:bg-surface-950/95 hover:after:bg-surface-50 dark:hover:after:bg-surface-900"
    }
})
export class LandingConfigButton {
    layoutService = inject(LayoutService);
}
