import { Component, signal } from '@angular/core';
import { AccordionModule } from 'primeng/accordion';
import { SurfaceLine } from '@/app/layout/components/icons/surfaceline';

interface FaqItem {
    title: string;
    content: string;
}

@Component({
    selector: 'contact-faq',
    standalone: true,
    imports: [AccordionModule, SurfaceLine],
    template: `
        <div class="relative py-16 md:py-36">
            <surface-line class="top-[420px] -left-72 2xl:-left-32 md:w-[48vw]" />
            <surface-line class="top-[420px] -right-72 2xl:-right-32 md:w-[48vw] scale-x-[-1]" />
            <surface-line class="bottom-44 -left-72 2xl:-left-32 md:w-[48vw] scale-y-[-1]" />
            <surface-line class="bottom-44 -right-72 2xl:-right-32 md:w-[48vw] scale-x-[-1] scale-y-[-1]" />
            <div class="landing-container !max-w-[48rem]">
                <h2 class="text-3xl md:text-5xl font-medium text-center mx-auto !leading-[125%]">Frequently<br />Asked Questions</h2>
                <p class="text-center text-base md:text-lg text-surface-500 mx-auto max-w-md mb-12 mt-6">Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                <p-accordion [value]="['0']" class="space-y-6">
                    @for (tab of tabs(); track tab.title; let i = $index) {
                        <p-accordion-panel [value]="i.toString()" class="rounded-[2.75rem] bg-surface-50 dark:bg-surface-950 border p-2">
                            <div
                                class="p-6 bg-surface-0 dark:bg-surface-900 rounded-[2.5rem] shadow-[0px_42px_12px_0px_rgba(0,0,0,0.00),_0px_27px_11px_0px_rgba(0,0,0,0.01),_0px_15px_9px_0px_rgba(0,0,0,0.02),_0px_7px_7px_0px_rgba(0,0,0,0.03),_0px_2px_4px_0px_rgba(0,0,0,0.04)]"
                            >
                                <p-accordion-header class="group flex items-center justify-between w-full">
                                    <h3 class="text-base md:text-lg font-medium group-hover:opacity-75 transition-opacity duration-150">{{ tab.title }}</h3>
                                </p-accordion-header>
                                <p-accordion-content>
                                    <p class="m-0 text-surface-500 pt-4 leading-6">{{ tab.content }}</p>
                                </p-accordion-content>
                            </div>
                        </p-accordion-panel>
                    }
                </p-accordion>
            </div>
        </div>
    `
})
export class ContactFaq {
    tabs = signal<FaqItem[]>([
        {
            title: 'What is web traffic?',
            content:
                'Web traffic refers to the flow of users visiting a website and their interactions with it. It includes various metrics like page views, unique visitors, session duration, and user engagement. Understanding web traffic helps in making informed decisions about website optimization and content strategy.'
        },
        {
            title: 'How do I become a webmaster?',
            content:
                'A webmaster oversees website operations and maintenance. The role requires understanding of web technologies, content management, and basic server administration. Start by learning fundamental web concepts, gain hands-on experience with different platforms, and continuously update your knowledge with industry trends.'
        },
        {
            title: 'What is an easy way to make a website?',
            content:
                'Modern website creation has become accessible to everyone through various tools and platforms. Choose a platform that matches your needs, select a template, customize your content, and publish. No coding knowledge is required for basic websites, though learning some fundamentals can help with customization.'
        },
        {
            title: 'How do you know if something is true?',
            content:
                'Verifying information requires a systematic approach. Cross-reference multiple reliable sources, check publication dates, evaluate the credibility of sources, and look for consensus among experts. Maintain a critical mindset and be aware that information can change over time.'
        }
    ]);
}
