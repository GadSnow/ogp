import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { SurfaceLine } from '@/app/layout/components/icons/surfaceline';
import { CustomersBadge } from '@/app/layout/components/shared/customersbadge';
import { CustomersGrid } from '@/app/layout/components/shared/customersgrid';

@Component({
    selector: 'contact-hero',
    standalone: true,
    imports: [FormsModule, InputTextModule, TextareaModule, SurfaceLine, CustomersBadge, CustomersGrid],
    template: `
        <surface-line class="top-16 -left-36 2xl:left-0 md:w-[32vw]" />
        <surface-line class="top-16 -right-36 2xl:right-0 md:w-[32vw] scale-x-[-1]" />
        <surface-line class="-top-14 -left-20 2xl:left-0 md:w-[44vw] scale-y-[-1]" />
        <surface-line class="-top-14 -right-20 2xl:right-0 md:w-[44vw] scale-x-[-1] scale-y-[-1]" />
        <div class="landing-container pt-56 md:pb-24">
            <customers-badge />
            <h1 class="text-4xl md:text-7xl font-medium text-center mx-auto !leading-[125%]">
                Let's Make Your <br />
                Dreams Come True
            </h1>
            <p class="mt-6 text-center mx-auto text-base md:text-lg text-surface-500 max-w-md md:max-w-xl">We are here to help you. Our expert teams are here to help you get one step closer to your dreams</p>
            <form class="max-w-[44rem] mx-auto mb-16 md:mb-44 mt-12 space-y-5">
                <div [class]="inputWrapperClass">
                    <input pInputText [(ngModel)]="formValues.firstName" name="firstName" [unstyled]="true" placeholder="First Name" [class]="inputClass" />
                </div>
                <div [class]="inputWrapperClass">
                    <input pInputText [(ngModel)]="formValues.lastName" name="lastName" [unstyled]="true" placeholder="Last Name" [class]="inputClass" />
                </div>
                <div [class]="inputWrapperClass">
                    <input pInputText [(ngModel)]="formValues.email" name="email" [unstyled]="true" placeholder="Email Address" [class]="inputClass" />
                </div>
                <div [class]="inputWrapperClass">
                    <input pInputText [(ngModel)]="formValues.phone" name="phone" [unstyled]="true" placeholder="Phone Number" [class]="inputClass" />
                </div>
                <div [class]="inputWrapperClass + ' !rounded-3xl'">
                    <textarea pTextarea [(ngModel)]="formValues.message" name="message" [unstyled]="true" rows="10" placeholder="Message" [class]="inputClass + ' !rounded-2xl'"></textarea>
                </div>
                <button type="submit" class="w-full landing-button-primary">Submit</button>
            </form>
            <customers-grid />
        </div>
    `
})
export class ContactHero {
    inputWrapperClass = 'p-2 rounded-full bg-surface-50 dark:bg-surface-950 border';
    inputClass =
        'w-full px-4 py-2 !text-base rounded-full outline-none placeholder:text-surface-500 bg-surface-0 dark:bg-surface-900 shadow-[0px_42px_12px_0px_rgba(0,0,0,0.00),_0px_27px_11px_0px_rgba(0,0,0,0.01),_0px_15px_9px_0px_rgba(0,0,0,0.02),_0px_7px_7px_0px_rgba(0,0,0,0.03),_0px_2px_4px_0px_rgba(0,0,0,0.04)]';

    formValues = {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: ''
    };
}
