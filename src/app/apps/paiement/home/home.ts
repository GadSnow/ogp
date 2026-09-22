import { Component, DestroyRef, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Button } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { Tag } from 'primeng/tag';
import { DatePipe, CurrencyPipe } from '@angular/common';
import { finalize } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { PaiementService } from '@/app/apps/paiement/paiement.service';
import { Paiement } from '@/app/apps/paiement/paiement.types';
import { SkeletonTableComponent } from '@/app/shared/utils/components/skeleton-table/skeleton-table.component';
import { CustomCard } from '@/app/layout/components/ui/customcard';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputText } from 'primeng/inputtext';
import { EmptyStateComponent } from '@/app/shared/utils/components/empty-state/empty-state.component';
import { getPaiementStatutLabel, getPaiementStatutSeverity } from '@/app/shared/utils/statuts';
import { telechargerBlob } from '@/app/shared/utils/telecharger-blob';

@Component({
    selector: 'app-home-paiement',
    imports: [Button, TableModule, Tag, DatePipe, CurrencyPipe, RouterLink, SkeletonTableComponent, CustomCard, IconFieldModule, InputIconModule, InputText, EmptyStateComponent, ToastModule],
    templateUrl: './home.html',
    providers: [MessageService]
})
export class HomePaiement {
    private paiementService = inject(PaiementService);
    private destroyRef = inject(DestroyRef);
    private messageService = inject(MessageService);

    isLoading = signal(true);
    paiements: Paiement[] = [];
    /** Id du paiement dont le justificatif est en cours de téléchargement. */
    telechargementEnCours = signal<string | null>(null);

    constructor() {
        this.loadPaiements();
    }

    getSeverity(statut?: string) {
        return getPaiementStatutSeverity(statut);
    }

    getStatutLabel(statut?: string) {
        return getPaiementStatutLabel(statut);
    }

    telechargerJustificatif(paiement: Paiement): void {
        if (!paiement.justificatifNomFichier || this.telechargementEnCours()) return;

        this.telechargementEnCours.set(paiement.id);
        this.paiementService
            .telechargerJustificatif(paiement.id)
            .pipe(
                finalize(() => this.telechargementEnCours.set(null)),
                takeUntilDestroyed(this.destroyRef)
            )
            .subscribe({
                next: (blob) => telechargerBlob(blob, paiement.justificatifNomFichier!),
                error: () => this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Impossible de télécharger le justificatif.' })
            });
    }

    private loadPaiements() {
        this.isLoading.set(true);
        this.paiementService
            .getPaiements()
            .pipe(
                finalize(() => this.isLoading.set(false)),
                takeUntilDestroyed(this.destroyRef)
            )
            .subscribe({
                next: (res) => {
                    this.paiements = res.data ?? [];
                }
            });
    }
}
