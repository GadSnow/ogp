import { Component } from '@angular/core';
import { SurfaceLine } from '@/app/layout/components/icons/surfaceline';
import { AnimatedBorder } from '@/app/layout/components/shared/animatedborder';

@Component({
    selector: 'home-features',
    standalone: true,
    imports: [SurfaceLine, AnimatedBorder],
    template: `
        <div class="pt-16 md:pt-64 space-y-48">
            <div class="relative">
                <surface-line class="-top-80 -left-52 2xl:left-0 md:w-[28vw] scale-y-[-1]" />
                <surface-line class="top-[240px] -right-32 2xl:right-0 md:w-[28vw] scale-x-[-1] scale-y-[-1]" />
                <div class="landing-container space-y-48">
                    <div class="flex flex-col md:flex-row items-center justify-center gap-16">
                        <div class="max-w-[27rem]">
                            <h2 class="text-3xl md:text-5xl font-medium">Global Transfer</h2>
                            <p class="mt-6 text-surface-500 leading-6">Seamlessly transfer funds across borders with ease, ensuring your money reaches its destination securely and quickly.</p>
                            <ul class="space-y-3 mt-7 text-surface-500 list-disc list-inside [&_*]:leading-6">
                                <li>Low-cost international transfers.</li>
                                <li>Instant cross-border transaction tracking.</li>
                                <li>Secure and reliable global money transfers.</li>
                            </ul>
                            <div class="flex items-center gap-7 mt-7">
                                <button class="landing-button-primary">Get Started</button>
                                <button class="landing-button-secondary">Discover Transfer</button>
                            </div>
                        </div>
                        <div class="px-2">
                            <div class="rounded-3xl bg-surface-50 dark:bg-surface-900 relative">
                                <animated-border />
                                <img
                                    class="block dark:hidden rounded-2xl max-w-[22rem] w-full md:max-w-none md:w-[22rem] h-auto shadow-[0px_129.205px_36.493px_0px_rgba(44,54,87,0.00),_0px_82.849px_33.534px_0px_rgba(44,54,87,0.01),_0px_46.356px_27.616px_0px_rgba(44,54,87,0.05),_0px_20.712px_20.712px_0px_rgba(44,54,87,0.09),_0px_4.932px_11.836px_0px_rgba(44,54,87,0.10)]"
                                    src="/demo/images/landing/global-transfer-widget.png"
                                    alt="Global Transfer Widget"
                                />
                                <img
                                    class="dark:block hidden rounded-2xl max-w-[22rem] w-full md:max-w-none md:w-[22rem] h-auto shadow-[0px_129.205px_36.493px_0px_rgba(44,54,87,0.00),_0px_82.849px_33.534px_0px_rgba(44,54,87,0.01),_0px_46.356px_27.616px_0px_rgba(44,54,87,0.05),_0px_20.712px_20.712px_0px_rgba(44,54,87,0.09),_0px_4.932px_11.836px_0px_rgba(44,54,87,0.10)]"
                                    src="/demo/images/landing/global-transfer-widget-dark.png"
                                    alt="Global Transfer Widget"
                                />
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-col md:flex-row-reverse items-center justify-center gap-16">
                        <div class="max-w-[27rem]">
                            <h2 class="text-3xl md:text-5xl font-medium">Credit Score</h2>
                            <p class="mt-6 text-surface-500 leading-6">Stay informed about your credit health and take control of your financial future with real-time updates and insights.</p>
                            <ul class="space-y-3 mt-7 text-surface-500 list-disc list-inside [&_*]:leading-6">
                                <li>Track your credit score in real-time.</li>
                                <li>Get personalized tips to improve your score.</li>
                                <li>Protect your financial future with regular updates.</li>
                            </ul>
                            <div class="flex items-center gap-7 mt-7">
                                <button class="landing-button-primary">Get Started</button>
                            </div>
                        </div>
                        <div class="px-2">
                            <div class="rounded-3xl bg-surface-50 dark:bg-surface-900 relative">
                                <animated-border />
                                <img
                                    class="block dark:hidden rounded-2xl max-w-[22rem] w-full md:max-w-none md:w-[22rem] h-auto shadow-[0px_129.205px_36.493px_0px_rgba(44,54,87,0.00),_0px_82.849px_33.534px_0px_rgba(44,54,87,0.01),_0px_46.356px_27.616px_0px_rgba(44,54,87,0.05),_0px_20.712px_20.712px_0px_rgba(44,54,87,0.09),_0px_4.932px_11.836px_0px_rgba(44,54,87,0.10)]"
                                    src="/demo/images/landing/credit-score-widget.png"
                                    alt="Credit Score Widget"
                                />
                                <img
                                    class="dark:block hidden rounded-2xl max-w-[22rem] w-full md:max-w-none md:w-[22rem] h-auto shadow-[0px_129.205px_36.493px_0px_rgba(44,54,87,0.00),_0px_82.849px_33.534px_0px_rgba(44,54,87,0.01),_0px_46.356px_27.616px_0px_rgba(44,54,87,0.05),_0px_20.712px_20.712px_0px_rgba(44,54,87,0.09),_0px_4.932px_11.836px_0px_rgba(44,54,87,0.10)]"
                                    src="/demo/images/landing/credit-score-widget-dark.png"
                                    alt="Credit Score Widget"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="relative">
                <surface-line class="-top-60 -left-32 2xl:left-0 md:w-[44vw] scale-y-[-1]" />
                <surface-line class="-top-60 -right-32 2xl:right-0 md:w-[44vw] scale-x-[-1] scale-y-[-1]" />
                <div class="landing-container">
                    <h2 class="text-3xl md:text-5xl font-medium text-center mx-auto leading-[125%]">
                        Convert More<br />
                        Visitors into Customers
                    </h2>
                    <p class="text-base md:text-lg text-surface-500 text-center mx-auto max-w-md md:max-w-xl mt-6">Our real-time insights help you understand user journeys, allowing you to fine-tune your strategies for maximum impact.</p>
                    <div class="px-2">
                        <div class="mt-12 max-w-[55rem] mx-auto rounded-3xl bg-surface-50 dark:bg-surface-900 relative">
                            <animated-border />
                            <img
                                class="block dark:hidden rounded-2xl w-full h-auto shadow-[0px_129.205px_36.493px_0px_rgba(44,54,87,0.00),_0px_82.849px_33.534px_0px_rgba(44,54,87,0.01),_0px_46.356px_27.616px_0px_rgba(44,54,87,0.05),_0px_20.712px_20.712px_0px_rgba(44,54,87,0.09),_0px_4.932px_11.836px_0px_rgba(44,54,87,0.10)]"
                                src="/demo/images/landing/visitor-conversion-widget.png"
                                alt="Visitor Conversion Widget"
                            />
                            <img
                                class="dark:block hidden rounded-2xl w-full h-auto shadow-[0px_129.205px_36.493px_0px_rgba(44,54,87,0.00),_0px_82.849px_33.534px_0px_rgba(44,54,87,0.01),_0px_46.356px_27.616px_0px_rgba(44,54,87,0.05),_0px_20.712px_20.712px_0px_rgba(44,54,87,0.09),_0px_4.932px_11.836px_0px_rgba(44,54,87,0.10)]"
                                src="/demo/images/landing/visitor-conversion-widget-dark.png"
                                alt="Visitor Conversion Widget"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
})
export class HomeFeatures {}
