import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SurfaceLine } from '@/app/layout/components/icons/surfaceline';

interface Testimonial {
    name: string;
    job: string;
    quote: string;
    avatar: string;
    id: number;
}

@Component({
    selector: 'contact-testimonials',
    standalone: true,
    imports: [CommonModule, SurfaceLine],
    template: `
        <div class="relative py-24 md:py-56">
            <surface-line class="top-60 -left-60 xl:-left-32 md:w-[52vw]" />
            <surface-line class="top-60 -right-60 xl:-right-32 md:w-[52vw] scale-x-[-1]" />
            <surface-line class="bottom-64 -left-60 xl:-left-32 md:w-[52vw] scale-y-[-1]" />
            <surface-line class="bottom-64 -right-60 xl:-right-32 md:w-[52vw] scale-x-[-1] scale-y-[-1]" />
            <div class="landing-container !max-w-[36rem]">
                <h2 class="mb-10 md:mb-24 text-3xl md:text-5xl font-medium text-center mx-auto">What Our Clients Say</h2>
                <div class="relative w-full testimonial-content" [class.slide-left]="slideDirection() === 'left'" [class.slide-right]="slideDirection() === 'right'">
                    <p class="text-base md:text-xl text-surface-500 text-center mx-auto">{{ currentTestimonial().quote }}</p>
                    <div class="mt-6 flex flex-col items-center justify-center">
                        <div class="text-xl font-medium text-center">{{ currentTestimonial().name }}</div>
                        <div class="text-sm text-surface-600 text-center">{{ currentTestimonial().job }}</div>
                    </div>
                </div>
                <div class="flex items-center justify-center mt-12 gap-4">
                    <button
                        (click)="previousTestimonial()"
                        [disabled]="isAnimating()"
                        class="w-9 h-9 flex items-center justify-center rounded-full shadow-stroke bg-surface-0 dark:bg-surface-900 hover:opacity-50 transition-opacity duration-300 disabled:opacity-50"
                    >
                        <i class="pi pi-chevron-left"></i>
                    </button>
                    <div class="relative w-[180px] h-20 overflow-hidden">
                        <div class="absolute inset-0 flex items-center justify-center">
                            <div class="relative w-full h-full flex items-center">
                                @for (testimonial of displayedTestimonials(); track testimonial.id + '-' + $index) {
                                    <div
                                        class="absolute left-1/2 cursor-pointer transition-transform duration-500 ease-in-out"
                                        [class.z-10]="testimonial.id === selectedIndex()"
                                        [style.transform]="getTransform($index)"
                                        (transitionend)="handleTransitionEnd()"
                                        (click)="handleAvatarClick(testimonial.id, $index)"
                                    >
                                        <img
                                            [src]="testimonial.avatar"
                                            class="w-12 h-12 rounded-full object-cover shadow-lg transition-all duration-500 ease-in-out"
                                            [class.scale-110]="testimonial.id === selectedIndex()"
                                            [class.opacity-100]="testimonial.id === selectedIndex()"
                                            [class.scale-75]="testimonial.id !== selectedIndex()"
                                            [class.opacity-50]="testimonial.id !== selectedIndex()"
                                        />
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                    <button
                        (click)="nextTestimonial()"
                        [disabled]="isAnimating()"
                        class="w-9 h-9 flex items-center justify-center rounded-full shadow-stroke bg-surface-0 dark:bg-surface-900 hover:opacity-75 transition-opacity duration-300 disabled:opacity-50"
                    >
                        <i class="pi pi-chevron-right"></i>
                    </button>
                </div>
            </div>
        </div>
    `,
    styles: `
        .testimonial-content {
            transition:
                opacity 0.25s ease,
                transform 0.25s ease;
        }
    `
})
export class ContactTestimonials {
    testimonials = signal<Testimonial[]>([
        {
            name: 'Sarah Johnson',
            job: 'Marketing Director',
            quote: 'This platform has transformed how we handle our digital presence. The intuitive interface and powerful features have helped us increase our online engagement by 200% in just three months.',
            avatar: '/demo/images/avatar/avatar-square-f-1.jpg',
            id: 0
        },
        {
            name: 'Michael Chen',
            job: 'Tech Startup Founder',
            quote: 'As a startup founder, I needed a solution that was both cost-effective and scalable. This platform delivered exactly that, allowing us to focus on growth while maintaining a professional online presence.',
            avatar: '/demo/images/avatar/avatar-square-m-2.jpg',
            id: 1
        },
        {
            name: 'Emma Rodriguez',
            job: 'E-commerce Manager',
            quote: "The analytics and user tracking features are exceptional. We've been able to better understand our customers' behavior and optimize our website accordingly. Our conversion rate has improved significantly.",
            avatar: '/demo/images/avatar/avatar-square-f-2.jpg',
            id: 2
        }
    ]);

    selectedIndex = signal(0);
    isAnimating = signal(false);
    slideDirection = signal('');
    sliderPosition = signal(0);
    displayedTestimonials = signal<Testimonial[]>([]);

    currentTestimonial = computed(() => this.testimonials()[this.selectedIndex()]);

    constructor() {
        this.initializeCarousel();
    }

    initializeCarousel() {
        const items = this.testimonials();
        const total = items.length;
        const current = this.selectedIndex();

        const prev3 = (current - 3 + total) % total;
        const prev2 = (current - 2 + total) % total;
        const prev1 = (current - 1 + total) % total;

        const next1 = (current + 1) % total;
        const next2 = (current + 2) % total;
        const next3 = (current + 3) % total;

        this.displayedTestimonials.set([items[prev3], items[prev2], items[prev1], items[current], items[next1], items[next2], items[next3]]);
    }

    handleTransitionEnd() {
        if (!this.isAnimating()) return;

        this.initializeCarousel();
        this.sliderPosition.set(0);
        this.isAnimating.set(false);
    }

    nextTestimonial() {
        if (this.isAnimating()) return;
        this.isAnimating.set(true);
        this.slideDirection.set('left');
        this.sliderPosition.update((v) => v - 60);

        this.selectedIndex.update((v) => (v + 1) % this.testimonials().length);
    }

    previousTestimonial() {
        if (this.isAnimating()) return;
        this.isAnimating.set(true);
        this.slideDirection.set('right');
        this.sliderPosition.update((v) => v + 60);

        this.selectedIndex.update((v) => (v - 1 + this.testimonials().length) % this.testimonials().length);
    }

    getTransform(index: number): string {
        const baseTransform = 'translateX(-50%)';
        const offset = (index - 3) * 60;
        return `${baseTransform} translateX(${offset + this.sliderPosition()}px)`;
    }

    handleAvatarClick(testimonialId: number, index: number) {
        if (testimonialId !== this.selectedIndex()) {
            if (index < 3) {
                this.previousTestimonial();
            } else {
                this.nextTestimonial();
            }
        }
    }
}
