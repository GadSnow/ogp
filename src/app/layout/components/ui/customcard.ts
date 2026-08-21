import { Component, computed, input } from '@angular/core';

@Component({
    selector: '[custom-card]',
    standalone: true,
    template: `
        <div [class]="headerClass()">
            <h3 [class]="titleClass()">
                <ng-content select="[card-title]" />
            </h3>
            <div [class]="actionClass()">
                <ng-content select="[card-action]" />
            </div>
        </div>
        <div [class]="contentClass()">
            <ng-content />
        </div>
    `,
    host: {
        '[class]': 'hostClass()'
    }
})
export class CustomCard {
    styleClass = input<string>('');
    headerStyleClass = input<string>('');
    titleStyleClass = input<string>('');
    actionStyleClass = input<string>('');
    contentStyleClass = input<string>('');

    // Charte OGP : rayon lg (10px), titre de section 16px/600 — sobre et non capitalisé,
    // la mise en capitales étant réservée aux libellés de champ et d'en-tête de tableau.
    hostClass = computed(() => `flex flex-col rounded-lg border bg-surface-0 dark:bg-surface-900 ${this.styleClass()}`);
    headerClass = computed(() => `min-h-14 pl-5 pr-3 py-3 flex items-center justify-between gap-2 border-b ${this.headerStyleClass()}`);
    titleClass = computed(() => `text-base font-semibold text-surface-900 dark:text-surface-0 ${this.titleStyleClass()}`);
    actionClass = computed(() => `flex items-center justify-end gap-2 ${this.actionStyleClass()}`);
    contentClass = computed(() => `flex-1 overflow-auto ${this.contentStyleClass()}`);
}
