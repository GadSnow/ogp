import { Component } from '@angular/core';
import { SurfaceLine } from '@/app/layout/components/icons/surfaceline';
import { AnimatedBorder } from '@/app/layout/components/shared/animatedborder';
import { Logo } from '@/app/layout/components/icons/logo';

@Component({
    selector: 'features-solutions',
    standalone: true,
    imports: [SurfaceLine, AnimatedBorder, Logo],
    template: `
        <div class="relative pt-16 md:pt-48">
            <surface-line class="-top-0 -left-20 2xl:left-0 md:w-[44vw] scale-y-[-1]" />
            <surface-line class="-top-0 -right-20 2xl:right-0 md:w-[44vw] scale-x-[-1] scale-y-[-1]" />
            <div class="landing-container !max-w-[60rem]">
                <h2 class="text-3xl md:text-5xl font-medium text-center mx-auto !leading-[125%]">Optimize Your<br />Business with SaaS Solutions</h2>
                <p class="mt-6 text-center mx-auto text-base md:text-lg text-surface-500 max-w-xl">Discover how our platform transforms your business by enhancing efficiency, reducing costs, and simplifying daily tasks.</p>
                <div class="px-2 mt-12">
                    <div class="relative">
                        <animated-border />
                        <img
                            src="/demo/images/landing/general-sales-widget.png"
                            alt="Features Solutions Hero"
                            class="block dark:hidden w-full h-full object-cover rounded-2xl shadow-[0px_129.205px_36.493px_0px_rgba(44,54,87,0.00),_0px_82.849px_33.534px_0px_rgba(44,54,87,0.01),_0px_46.356px_27.616px_0px_rgba(44,54,87,0.05),_0px_20.712px_20.712px_0px_rgba(44,54,87,0.09),_0px_4.932px_11.836px_0px_rgba(44,54,87,0.10)]"
                        />
                        <img
                            src="/demo/images/landing/general-sales-widget-dark.png"
                            alt="Features Solutions Hero"
                            class="dark:block hidden w-full h-full object-cover rounded-2xl shadow-[0px_129.205px_36.493px_0px_rgba(44,54,87,0.00),_0px_82.849px_33.534px_0px_rgba(44,54,87,0.01),_0px_46.356px_27.616px_0px_rgba(44,54,87,0.05),_0px_20.712px_20.712px_0px_rgba(44,54,87,0.09),_0px_4.932px_11.836px_0px_rgba(44,54,87,0.10)]"
                        />
                    </div>
                </div>
                <div class="my-12 w-full flex items-center gap-4 md:gap-7">
                    <div class="flex items-center flex-1">
                        <span class="w-1.5 h-1.5 rounded-full bg-surface-200 dark:bg-surface-800"></span>
                        <span class="h-px flex-1 bg-surface-200 dark:bg-surface-800"></span>
                        <span class="w-1.5 h-1.5 rounded-full bg-surface-200 dark:bg-surface-800"></span>
                    </div>
                    <logo />
                    <div class="flex items-center flex-1">
                        <span class="w-1.5 h-1.5 rounded-full bg-surface-200 dark:bg-surface-800"></span>
                        <span class="h-px flex-1 bg-surface-200 dark:bg-surface-800"></span>
                        <span class="w-1.5 h-1.5 rounded-full bg-surface-200 dark:bg-surface-800"></span>
                    </div>
                </div>
                <div class="flex gap-10 md:gap-12 px-2">
                    <div class="relative">
                        <animated-border />
                        <img
                            src="/demo/images/landing/total-product-widget.png"
                            alt="Features Solutions Hero"
                            class="block dark:hidden w-full h-full object-cover rounded-2xl shadow-[0px_129.205px_36.493px_0px_rgba(44,54,87,0.00),_0px_82.849px_33.534px_0px_rgba(44,54,87,0.01),_0px_46.356px_27.616px_0px_rgba(44,54,87,0.05),_0px_20.712px_20.712px_0px_rgba(44,54,87,0.09),_0px_4.932px_11.836px_0px_rgba(44,54,87,0.10)]"
                        />
                        <img
                            src="/demo/images/landing/total-product-widget-dark.png"
                            alt="Features Solutions Hero"
                            class="dark:block hidden w-full h-full object-cover rounded-2xl shadow-[0px_129.205px_36.493px_0px_rgba(44,54,87,0.00),_0px_82.849px_33.534px_0px_rgba(44,54,87,0.01),_0px_46.356px_27.616px_0px_rgba(44,54,87,0.05),_0px_20.712px_20.712px_0px_rgba(44,54,87,0.09),_0px_4.932px_11.836px_0px_rgba(44,54,87,0.10)]"
                        />
                    </div>
                    <div class="relative">
                        <animated-border />
                        <img
                            src="/demo/images/landing/total-customers-widget.png"
                            alt="Features Solutions Hero"
                            class="block dark:hidden w-full h-full object-cover rounded-2xl shadow-[0px_129.205px_36.493px_0px_rgba(44,54,87,0.00),_0px_82.849px_33.534px_0px_rgba(44,54,87,0.01),_0px_46.356px_27.616px_0px_rgba(44,54,87,0.05),_0px_20.712px_20.712px_0px_rgba(44,54,87,0.09),_0px_4.932px_11.836px_0px_rgba(44,54,87,0.10)]"
                        />
                        <img
                            src="/demo/images/landing/total-customers-widget-dark.png"
                            alt="Features Solutions Hero"
                            class="dark:block hidden w-full h-full object-cover rounded-2xl shadow-[0px_129.205px_36.493px_0px_rgba(44,54,87,0.00),_0px_82.849px_33.534px_0px_rgba(44,54,87,0.01),_0px_46.356px_27.616px_0px_rgba(44,54,87,0.05),_0px_20.712px_20.712px_0px_rgba(44,54,87,0.09),_0px_4.932px_11.836px_0px_rgba(44,54,87,0.10)]"
                        />
                    </div>
                </div>
            </div>
        </div>
    `
})
export class FeaturesSolutions {}
