import { Component } from '@angular/core';
import { SurfaceLine } from '@/app/layout/components/icons/surfaceline';
import { AnimatedBorder } from '@/app/layout/components/shared/animatedborder';
import { CustomersBadge } from '@/app/layout/components/shared/customersbadge';
import { CustomersGrid } from '@/app/layout/components/shared/customersgrid';

@Component({
    selector: 'home-hero',
    standalone: true,
    imports: [SurfaceLine, AnimatedBorder, CustomersBadge, CustomersGrid],
    template: `
        <div class="overflow-hidden pt-56 pb-48">
            <surface-line class="top-16 -left-36 2xl:left-0 md:w-[36vw]" />
            <surface-line class="top-16 -right-36 2xl:right-0 md:w-[36vw] scale-x-[-1]" />
            <surface-line class="-top-14 -left-20 2xl:left-0 md:w-[44vw] scale-y-[-1]" />
            <surface-line class="-top-14 -right-20 2xl:right-0 md:w-[44vw] scale-x-[-1] scale-y-[-1]" />
            <surface-line class="top-[410px] -left-36 2xl:left-0 md:w-[48vw] scale-y-[0.5]" />
            <surface-line class="top-[410px] -right-36 2xl:right-0 md:w-[48vw] scale-y-[0.5] scale-x-[-1]" />
            <div class="landing-container">
                <customers-badge />
                <h1 class="text-4xl md:text-7xl font-medium text-center mx-auto !leading-[125%]">
                    Boost Efficiency<br />
                    Simplify Your Business
                </h1>
                <p class="mt-6 text-center mx-auto text-base md:text-lg text-surface-500 max-w-md md:max-w-2xl">
                    Optimize your operations and streamline workflows effortlessly with our SaaS solutions, designed to enhance productivity and simplify your daily business processes.
                </p>
                <div class="flex items-center justify-center gap-3.5 mt-8">
                    <button class="landing-button-primary rounded-xl min-w-32">Get Started</button>
                    <button class="landing-button-secondary rounded-xl min-w-32">Discover</button>
                </div>
                <div class="px-2">
                    <div class="mt-16 mb-20 w-full rounded-3xl bg-surface-50 dark:bg-surface-900 relative">
                        <animated-border />
                        <img
                            class="block dark:hidden w-full h-full object-cover rounded-2xl shadow-[0px_129.205px_36.493px_0px_rgba(44,54,87,0.00),_0px_82.849px_33.534px_0px_rgba(44,54,87,0.01),_0px_46.356px_27.616px_0px_rgba(44,54,87,0.05),_0px_20.712px_20.712px_0px_rgba(44,54,87,0.09),_0px_4.932px_11.836px_0px_rgba(44,54,87,0.10)]"
                            src="/demo/images/landing/home-hero-dashboard.png"
                            alt="Hero Image"
                        />
                        <img
                            class="dark:block hidden w-full h-full object-cover rounded-2xl shadow-[0px_129.205px_36.493px_0px_rgba(44,54,87,0.00),_0px_82.849px_33.534px_0px_rgba(44,54,87,0.01),_0px_46.356px_27.616px_0px_rgba(44,54,87,0.05),_0px_20.712px_20.712px_0px_rgba(44,54,87,0.09),_0px_4.932px_11.836px_0px_rgba(44,54,87,0.10)]"
                            src="/demo/images/landing/home-hero-dashboard-dark.png"
                            alt="Hero Image"
                        />
                    </div>
                </div>
                <customers-grid />
            </div>
        </div>
    `
})
export class HomeHero {}
