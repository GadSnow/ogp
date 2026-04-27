import { Component } from '@angular/core';
import { SurfaceLine } from '@/app/layout/components/icons/surfaceline';
import { AnimatedBorder } from '@/app/layout/components/shared/animatedborder';

@Component({
    selector: 'features-example',
    standalone: true,
    imports: [SurfaceLine, AnimatedBorder],
    template: `
        <div class="relative pt-24 md:pt-56">
            <surface-line class="-top-28 -left-20 2xl:-left-40 md:w-[24vw] scale-y-[-1]" />
            <surface-line class="top-[430px] -right-20 2xl:-right-40 md:w-[24vw] scale-y-[-1] scale-x-[-1]" />
            <div class="landing-container !max-w-[64rem] space-y-24 md:space-y-56">
                <div class="flex flex-col md:flex-row items-center justify-between gap-12">
                    <div class="flex-1 max-w-[30rem] space-y-8">
                        <div>
                            <h2 class="text-3xl md:text-5xl font-medium">Cargo Status</h2>
                            <p class="mt-6 text-base md:text-lg leading-6 text-surface-500">Monitor the real-time status of your shipments, from dispatch to delivery, with detailed tracking.</p>
                        </div>
                        <ul class="list-disc list-inside text-base md:text-lg leading-6 text-surface-500 space-y-3.5">
                            <li>Track shipment status at every stage.</li>
                            <li>Instant updates on delivery schedules.</li>
                        </ul>
                        <div class="flex items-center gap-3.5">
                            <button class="landing-button-primary">Get Started</button>
                            <button class="landing-button-secondary">See All Cargo Status</button>
                        </div>
                    </div>

                    <div class="px-2">
                        <div class="relative flex-1 max-w-[30rem] md:max-w-[25rem]">
                            <animated-border />
                            <img
                                src="/demo/images/landing/cargo-status-widget.png"
                                alt="Features Example 1"
                                class="block dark:hidden w-full h-full object-cover rounded-2xl shadow-[0px_129.205px_36.493px_0px_rgba(44,54,87,0.00),_0px_82.849px_33.534px_0px_rgba(44,54,87,0.01),_0px_46.356px_27.616px_0px_rgba(44,54,87,0.05),_0px_20.712px_20.712px_0px_rgba(44,54,87,0.09),_0px_4.932px_11.836px_0px_rgba(44,54,87,0.10)]"
                            />
                            <img
                                src="/demo/images/landing/cargo-status-widget-dark.png"
                                alt="Features Example 1"
                                class="dark:block hidden w-full h-full object-cover rounded-2xl shadow-[0px_129.205px_36.493px_0px_rgba(44,54,87,0.00),_0px_82.849px_33.534px_0px_rgba(44,54,87,0.01),_0px_46.356px_27.616px_0px_rgba(44,54,87,0.05),_0px_20.712px_20.712px_0px_rgba(44,54,87,0.09),_0px_4.932px_11.836px_0px_rgba(44,54,87,0.10)]"
                            />
                        </div>
                    </div>
                </div>
                <div class="flex flex-col md:flex-row-reverse items-center justify-between gap-12">
                    <div class="flex-1 max-w-[30rem] space-y-8">
                        <div>
                            <h2 class="text-3xl md:text-5xl font-medium">Stock Status</h2>
                            <p class="mt-6 text-base md:text-lg leading-6 text-surface-500">Keep an eye on product availability with up-to-date stock levels, ensuring you never run out of inventory.</p>
                        </div>
                        <ul class="list-disc list-inside text-base md:text-lg leading-6 text-surface-500 space-y-3.5">
                            <li>Real-time product stock updates.</li>
                            <li>Plan ahead with accurate inventory tracking..</li>
                        </ul>
                        <div class="flex items-center gap-3.5">
                            <button class="landing-button-primary">Get Started</button>
                        </div>
                    </div>

                    <div class="px-2">
                        <div class="relative flex-1 max-w-[30rem] md:max-w-[25rem]">
                            <animated-border />
                            <img
                                src="/demo/images/landing/stock-status-widget.png"
                                alt="Features Example 1"
                                class="block dark:hidden w-full h-full object-cover rounded-2xl shadow-[0px_129.205px_36.493px_0px_rgba(44,54,87,0.00),_0px_82.849px_33.534px_0px_rgba(44,54,87,0.01),_0px_46.356px_27.616px_0px_rgba(44,54,87,0.05),_0px_20.712px_20.712px_0px_rgba(44,54,87,0.09),_0px_4.932px_11.836px_0px_rgba(44,54,87,0.10)]"
                            />
                            <img
                                class="dark:block hidden rounded-2xl w-full h-auto shadow-[0px_129.205px_36.493px_0px_rgba(44,54,87,0.00),_0px_82.849px_33.534px_0px_rgba(44,54,87,0.01),_0px_46.356px_27.616px_0px_rgba(44,54,87,0.05),_0px_20.712px_20.712px_0px_rgba(44,54,87,0.09),_0px_4.932px_11.836px_0px_rgba(44,54,87,0.10)]"
                                src="/demo/images/landing/stock-status-widget-dark.png"
                                alt="Features Example 1"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
})
export class FeaturesExample {}
