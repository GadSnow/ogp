import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AppConfigurator } from './app.configurator';
import { LayoutService } from '@/app/layout/service/layout.service';
import { LandingConfigButton } from './shared/landingconfigbutton';
import { Footer } from '@/app/pages/landing/footer';
import { Navbar } from '@/app/pages/landing/navbar';

@Component({
    selector: 'app-landing-layout',
    standalone: true,
    imports: [CommonModule, RouterModule, Footer, AppConfigurator, LandingConfigButton, Navbar],
    template: ` <div class="w-full min-h-screen">
        <nav navbar></nav>
        <main>
            <router-outlet />
        </main>
        <footer footer></footer>
        <landing-config-button />
        <app-configurator location="landing" />
    </div>`
})
export class LandingLayout {
    layoutService: LayoutService = inject(LayoutService);
}
