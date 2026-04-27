import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverallPerformanceSummary, WebsiteTrafficAnalytics, VisitorConversion, SeoPerformance, SocialMediaPerformance, EmailMarketing, SalesData, Customers } from './components';

@Component({
    selector: 'marketing-dashboard',
    standalone: true,
    imports: [CommonModule, OverallPerformanceSummary, WebsiteTrafficAnalytics, VisitorConversion, SeoPerformance, SocialMediaPerformance, EmailMarketing, SalesData, Customers],
    template: `
        <div class="grid grid-cols-12 gap-4">
            <div overall-performance-summary></div>
            <div website-traffic-analytics></div>
            <div visitor-conversion></div>
            <div seo-performance></div>
            <div social-media-performance></div>
            <div email-marketing></div>
            <div sales-data></div>
            <div customers></div>
        </div>
    `
})
export class MarketingDashboard {}
