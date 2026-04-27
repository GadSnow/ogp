import { Component } from '@angular/core';
import { PricingHero } from './pricinghero';
import { PricingCompare } from './pricingcompare';
import { ContactTestimonials } from '../contact/testimonials';
import { ContactFaq } from '../contact/faq';

@Component({
    selector: 'pricing-page',
    standalone: true,
    imports: [PricingHero, PricingCompare, ContactTestimonials, ContactFaq],
    template: `
        <div>
            <pricing-hero />
            <pricing-compare />
            <contact-testimonials />
            <contact-faq />
        </div>
    `
})
export class Pricing {}
