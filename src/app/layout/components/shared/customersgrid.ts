import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BriteMank, Limerantz, Mistranet, Streamlinz, Trimzales, Wavelength, ZenTrailMs } from '../icons/customers';

@Component({
    selector: 'customers-grid',
    standalone: true,
    imports: [CommonModule, BriteMank, Limerantz, Mistranet, Streamlinz, Trimzales, Wavelength, ZenTrailMs],
    template: `
        <div [class]="styleClass()" class="space-y-8">
            <!-- First Row -->
            <div class="flex items-center gap-6 justify-center md:gap-12">
                <div class="flex items-center justify-center gap-2">
                    <mistranet class="w-6 h-6 md:w-8 md:h-8" />
                    <span class="text-surface-500 text-sm md:text-xl font-medium">Mistranet</span>
                </div>
                <div class="flex items-center justify-center gap-2">
                    <britemank class="w-6 h-6 md:w-8 md:h-8" />
                    <span class="text-surface-500 text-sm md:text-xl font-medium">BriteMank</span>
                </div>
                <div class="flex items-center justify-center gap-2">
                    <limerantz class="w-6 h-6 md:w-8 md:h-8" />
                    <span class="text-surface-500 text-sm md:text-xl font-medium">Limerantz</span>
                </div>
                <div class="flex items-center justify-center gap-2 hidden md:flex">
                    <streamlinz class="w-6 h-6 md:w-8 md:h-8" />
                    <span class="text-surface-500 text-sm md:text-xl font-medium">Streamlinz</span>
                </div>
            </div>

            <!-- Divider -->
            <div class="hidden md:flex items-center w-full max-w-[36rem] mx-auto">
                <span class="w-1.5 h-1.5 rounded-full bg-surface-200 dark:bg-surface-800"></span>
                <span class="flex-1 h-px bg-surface-200 dark:bg-surface-800"></span>
                <span class="w-1.5 h-1.5 rounded-full bg-surface-200 dark:bg-surface-800"></span>
            </div>

            <!-- Second Row -->
            <div class="flex items-center gap-6 justify-center md:gap-12">
                <div class="flex items-center justify-center gap-2">
                    <trimzales class="w-6 h-6 md:w-8 md:h-8" />
                    <span class="text-surface-500 text-sm md:text-xl font-medium">Trimzales</span>
                </div>
                <div class="flex items-center justify-center gap-2">
                    <zentrailms class="w-6 h-6 md:w-8 md:h-8" />
                    <span class="text-surface-500 text-sm md:text-xl font-medium">ZenTrailMs</span>
                </div>
                <div class="flex items-center justify-center gap-2 hidden md:flex">
                    <wavelength class="w-6 h-6 md:w-8 md:h-8" />
                    <span class="text-surface-500 text-sm md:text-xl font-medium">Wavelength</span>
                </div>
            </div>
        </div>
    `
})
export class CustomersGrid {
    styleClass = input<string>('', { alias: 'class' });
}
