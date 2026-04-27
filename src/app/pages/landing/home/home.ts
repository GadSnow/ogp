import { Component } from '@angular/core';
import { HomeHero } from './homehero';
import { HomeSolutions } from './homesolutions';
import { HomeFeatures } from './homefeatures';
import { ContactTestimonials } from '../contact/testimonials';
import { LandingCta } from '@/app/layout/components/shared/cta';
import { ContactFaq } from '../contact/faq';

@Component({
    selector: 'home-page',
    standalone: true,
    imports: [HomeHero, HomeSolutions, HomeFeatures, ContactTestimonials, LandingCta, ContactFaq],
    template: `
        <div>
            <home-hero />
            <home-solutions />
            <home-features />
            <contact-testimonials />
            <landing-cta />
            <contact-faq />
        </div>
    `
})
export class Home {}
