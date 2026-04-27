import { Component, inject, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LayoutService } from '@/app/layout/service/layout.service';
import { Logo } from './icons/logo';
import { LandingConfigButton } from './shared/landingconfigbutton';
import { AppConfigurator } from './app.configurator';

@Component({
    selector: 'auth-layout',
    standalone: true,
    imports: [RouterModule, Logo, LandingConfigButton, AppConfigurator],
    template: `
        <landing-config-button />
        <app-configurator location="auth" />
        <div class="overflow-hidden bg-surface-50 dark:bg-surface-950 w-full min-h-screen">
            <div class="landing-container min-h-screen flex flex-col gap-20 justify-between">
                <!-- Content -->
                <div>
                    <router-outlet />
                </div>
            </div>
        </div>
    `
})
export class AuthLayout {
    layoutService = inject(LayoutService);

}
