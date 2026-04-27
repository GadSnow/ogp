import { Component, computed, ElementRef, input, OnDestroy, signal, viewChild, afterNextRender } from '@angular/core';

@Component({
    selector: '[lazy-image]',
    standalone: true,
    template: ` <img #imageRef [src]="imageSrc()" [alt]="alt()" [class]="imageClass()" (load)="onLoad()" /> `
})
export class LazyImage implements OnDestroy {
    private observer: IntersectionObserver | null = null;

    imageRef = viewChild<ElementRef<HTMLImageElement>>('imageRef');

    src = input.required<string>();
    alt = input<string>('');
    styleClass = input<string>('');

    isIntersecting = signal(false);
    isLoaded = signal(false);

    imageSrc = computed(() => (this.isIntersecting() ? this.src() : ''));
    imageClass = computed(() => {
        const base = 'transition-opacity duration-700 ease-out delay-75';
        const opacity = this.isLoaded() ? '' : 'opacity-0';
        return `${this.styleClass()} ${base} ${opacity}`.trim();
    });

    constructor() {
        afterNextRender(() => {
            const imgEl = this.imageRef()?.nativeElement;
            if (!imgEl) return;

            this.observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting && entry.intersectionRatio >= 0.1) {
                        this.isIntersecting.set(true);
                        this.observer?.unobserve(imgEl);
                    }
                },
                { threshold: 0.1 }
            );

            this.observer.observe(imgEl);
        });
    }

    ngOnDestroy() {
        this.observer?.disconnect();
    }

    onLoad() {
        this.isLoaded.set(true);
    }
}
