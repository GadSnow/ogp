import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';

@Component({
    selector: 'app-help',
    standalone: true,
    imports: [FormsModule, IconFieldModule, InputIconModule, InputTextModule],
    template: `
        <div>
            <div class="flex flex-col items-center py-12 px-6">
                <h1 class="text-5xl font-semibold text-surface-950 dark:text-surface-0 text-center leading-tight">
                    Advice and answers<br />
                    from the Avalon team
                </h1>
                <p class="mt-3.5 text-surface-500">Get valuable advice and expert answers directly from the Avalon team.</p>
                <p-iconfield class="mt-8">
                    <p-inputicon class="pi pi-search" />
                    <input type="text" pInputText [(ngModel)]="search" placeholder="Search" />
                </p-iconfield>
            </div>
            <div class="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto">
                @for (item of helps(); track $index) {
                    <div class="card p-6 overflow-hidden">
                        <i [class]="item.icon" class="!text-3xl text-primary"></i>
                        <h5 class="mt-4 text-xl font-medium text-surface-950 dark:text-surface-0">{{ item.title }}</h5>
                        <p class="text-surface-500 leading-6 mt-2">
                            {{ item.description }}
                        </p>
                        <a class="inline-flex items-center justify-between w-full cursor-pointer mt-5">
                            <span class="flex-1 text-primary font-semibold">View all</span>
                            <span><i class="pi pi-arrow-right !text-lg text-primary"></i></span>
                        </a>
                    </div>
                }
            </div>
        </div>
    `
})
export class Help {
    search = signal('');

    helps = signal([
        {
            icon: 'pi pi-power-off',
            title: 'Getting Started',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.',
            to: ''
        },
        {
            icon: 'pi pi-arrows-h',
            title: 'Transactions',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.',
            to: ''
        },
        {
            icon: 'pi pi-user',
            title: 'Profile',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.',
            to: ''
        },
        {
            icon: 'pi pi-money-bill',
            title: 'Billing',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.',
            to: ''
        },
        {
            icon: 'pi pi-database',
            title: 'Integrations',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.',
            to: ''
        },
        {
            icon: 'pi pi-shield',
            title: 'Security',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.',
            to: ''
        }
    ]);
}
