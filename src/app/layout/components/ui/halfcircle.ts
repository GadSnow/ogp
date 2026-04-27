import { Component, input } from '@angular/core';

@Component({
    selector: '[half-circle]',
    standalone: true,
    template: `
        <svg [attr.width]="width()" [attr.height]="height()" viewBox="0 0 200 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="half-circle-gradient" x1="0%" y1="0%" x2="100%" y2="100%" gradientTransform="rotate(224)">
                    <stop offset="-17.02%" stop-color="rgba(255, 255, 255, 0.83)" />
                    <stop offset="82.64%" stop-color="rgba(255, 255, 255, 0.58)" />
                </linearGradient>
                <filter id="half-circle-shadow" x="-50%" y="-50%" width="200%" height="200%">
                    <feDropShadow dx="0" dy="0.546" stdDeviation="0.546" flood-opacity="0.08" />
                    <feDropShadow dx="0" dy="1.092" stdDeviation="0.8195" flood-opacity="0.04" />
                    <feDropShadow dx="0" dy="2.185" stdDeviation="2.185" flood-opacity="0.04" />
                    <feDropShadow dx="0" dy="4.37" stdDeviation="3.2775" flood-opacity="0.08" />
                    <feDropShadow dx="0" dy="8.74" stdDeviation="6.555" flood-opacity="0.12" />
                    <feDropShadow dx="0" dy="13.11" stdDeviation="8.74" flood-opacity="0.04" />
                    <feDropShadow dx="-8.74" dy="30.589" stdDeviation="17.4795" flood-opacity="0.06" />
                    <feDropShadow dx="0" dy="43.699" stdDeviation="32.7745" flood-opacity="0.06" />
                </filter>
            </defs>
            <path d="M200 100 A100 100 0 0 1 0 100 L0 100 L200 100 Z" fill="url(#half-circle-gradient)" filter="url(#half-circle-shadow)" />
        </svg>
    `
})
export class HalfCircle {
    width = input<number | string>(200);
    height = input<number | string>(100);
}
