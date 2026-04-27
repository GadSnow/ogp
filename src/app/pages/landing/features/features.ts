import { Component } from '@angular/core';
import { FeaturesHero } from './featureshero';
import { FeaturesSolutions } from './featuressolutions';
import { FeaturesExample } from './featuresexample';
import { ContactTestimonials } from '../contact/testimonials';
import { ContactFaq } from '../contact/faq';

@Component({
    selector: 'features-page',
    standalone: true,
    imports: [FeaturesHero, FeaturesSolutions, FeaturesExample, ContactTestimonials, ContactFaq],
    template: `
        <div>
            <features-hero />
            <features-solutions />
            <features-example />
            <contact-testimonials />
            <contact-faq />
        </div>
    `
})
export class Features {}
