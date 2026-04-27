import { Component } from '@angular/core';
import { ContactHero } from './contacthero';
import { ContactTestimonials } from './testimonials';
import { ContactFaq } from './faq';

@Component({
    selector: 'contact-page',
    standalone: true,
    imports: [ContactHero, ContactTestimonials, ContactFaq],
    template: `
        <div>
            <contact-hero />
            <contact-testimonials />
            <contact-faq />
        </div>
    `
})
export class Contact {}
