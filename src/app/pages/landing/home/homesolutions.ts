import { Component, signal } from '@angular/core';
import { SurfaceLine } from '@/app/layout/components/icons/surfaceline';
import { Analytics, BezierCurves, ArCube } from '@/app/layout/components/icons';

interface Solution {
    title: string;
    description: string;
    icon: 'bezier' | 'analytics' | 'cube';
}

@Component({
    selector: 'home-solutions',
    standalone: true,
    imports: [SurfaceLine, BezierCurves, Analytics, ArCube],
    template: `
        <div class="relative pt-16 md:pt-32">
            <surface-line class="-top-16 -left-16 2xl:left-0 md:w-[44vw] scale-y-[-1]" />
            <surface-line class="-top-16 -right-16 2xl:right-0 md:w-[44vw] scale-x-[-1] scale-y-[-1]" />
            <div class="landing-container">
                <h2 class="text-3xl md:text-5xl font-medium text-center mx-auto !leading-[125%]">
                    Optimize Your <br />
                    Business with SaaS Solutions
                </h2>
                <p class="mt-6 text-base md:text-lg text-surface-500 max-w-md md:max-w-xl mx-auto text-center">Discover how our platform transforms your business by enhancing efficiency, reducing costs, and simplifying daily tasks.</p>
                <div class="mt-12 flex flex-col md:flex-row justify-center gap-6">
                    @for (item of solutions(); track item.title) {
                        <div class="p-2 flex-1 md:max-w-[20rem] rounded-3xl bg-surface-50 dark:bg-surface-950 border">
                            <div
                                class="p-4 space-y-8 rounded-2xl bg-surface-0 dark:bg-surface-900 shadow-[0px_129.205px_36.493px_0px_rgba(44,54,87,0.00),_0px_82.849px_33.534px_0px_rgba(44,54,87,0.01),_0px_46.356px_27.616px_0px_rgba(44,54,87,0.05),_0px_20.712px_20.712px_0px_rgba(44,54,87,0.09),_0px_4.932px_11.836px_0px_rgba(44,54,87,0.10)]"
                            >
                                <div class="w-[4.5rem] h-[4.5rem] rounded-2xl bg-surface-100 dark:bg-surface-800 flex items-center justify-center">
                                    @switch (item.icon) {
                                        @case ('bezier') {
                                            <bezier-curves class="translate-y-1" />
                                        }
                                        @case ('analytics') {
                                            <analytics class="translate-y-1" />
                                        }
                                        @case ('cube') {
                                            <ar-cube class="translate-y-1" />
                                        }
                                    }
                                </div>
                                <div>
                                    <h5 class="text-lg font-medium">{{ item.title }}</h5>
                                    <p class="text-surface-500 mt-2 leading-6">{{ item.description }}</p>
                                </div>
                                <a href="" class="flex items-center justify-between gap-2">
                                    <span class="font-medium flex-1">Learn More</span>
                                    <i class="pi pi-arrow-right"></i>
                                </a>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    `
})
export class HomeSolutions {
    solutions = signal<Solution[]>([
        {
            title: 'Automation Made Easy',
            description: 'Automate repetitive tasks, allowing your team to focus on strategic, high-impact activities. Our platform simplifies complex processes, boosting productivity effortlessly.',
            icon: 'bezier'
        },
        {
            title: 'Real-Time Analytics',
            description: 'Access powerful data insights instantly to make smarter, data-driven decisions. Stay ahead of the competition with up-to-the-minute reports and visual dashboards.',
            icon: 'analytics'
        },
        {
            title: 'Seamless Integration',
            description: 'Easily connect with your favorite tools and platforms to streamline your workflow. Our integrations ensure smooth data flow and minimize disruptions to your operations.',
            icon: 'cube'
        }
    ]);
}
