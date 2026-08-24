import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterModule, ToastModule, ConfirmDialog, ButtonModule],
    // Confirmation unique et globale : montée une seule fois ici, elle sert TOUS
    // les confirm() de l'application. Le gabarit fixe la forme (pastille, titre,
    // libellés des boutons) ; seule la question — message.message — varie d'un
    // appel à l'autre. Les en-têtes, icônes et libellés passés par les anciens
    // appels sont volontairement ignorés pour garantir une apparence identique
    // partout.
    template: `
        <p-toast />

        <p-confirmdialog>
            <ng-template #headless let-message let-onAccept="onAccept" let-onReject="onReject">
                <div class="flex flex-col items-center p-8 bg-surface-0 dark:bg-surface-900 rounded">
                    <div class="rounded-full bg-primary text-primary-contrast inline-flex justify-center items-center h-24 w-24 -mt-20">
                        <i class="pi pi-question !text-5xl"></i>
                    </div>
                    <span class="font-bold text-2xl block mb-2 mt-6">Confirmation</span>
                    <p class="mb-0 text-center max-w-80">{{ message.message }}</p>
                    <div class="flex items-center gap-2 mt-6">
                        <p-button label="Oui, confirmer" (onClick)="onAccept()" />
                        <p-button label="Annuler" [outlined]="true" (onClick)="onReject()" styleClass="w-32" />
                    </div>
                </div>
            </ng-template>
        </p-confirmdialog>

        <router-outlet></router-outlet>
    `
})
export class AppComponent {}
