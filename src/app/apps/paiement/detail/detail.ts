import { Component, DestroyRef, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Skeleton } from 'primeng/skeleton';
import { Tag } from 'primeng/tag';
import { DatePipe, CurrencyPipe } from '@angular/common';
import { finalize } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { PaiementService } from '@/app/apps/paiement/paiement.service';
import { Paiement } from '@/app/apps/paiement/paiement.types';
import { getPaiementStatutLabel, getPaiementStatutSeverity } from '@/app/shared/utils/statuts';
import { telechargerBlob } from '@/app/shared/utils/telecharger-blob';

@Component({
    selector: 'app-detail-paiement',
    imports: [RouterLink, Skeleton, Tag, DatePipe, CurrencyPipe, ToastModule],
    templateUrl: './detail.html',
    providers: [MessageService]
})
export class DetailPaiement {
    private paiementService = inject(PaiementService);
    private route = inject(ActivatedRoute);
    private destroyRef = inject(DestroyRef);
    private messageService = inject(MessageService);

    isLoading = signal(true);
    telechargementEnCours = signal(false);
    paiement: Paiement | null = null;

    constructor() {
        this.route.paramMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((params) => {
            const id = params.get('id');
            if (id) this.loadData(id);
        });
    }

    private loadData(id: string) {
        this.isLoading.set(true);
        this.paiementService
            .getPaiement(id)
            .pipe(
                finalize(() => this.isLoading.set(false)),
                takeUntilDestroyed(this.destroyRef)
            )
            .subscribe({
                next: (res) => {
                    this.paiement = res.data;
                }
            });
    }

    getSeverity(statut?: string) {
        return getPaiementStatutSeverity(statut);
    }

    getStatutLabel(statut?: string) {
        return getPaiementStatutLabel(statut);
    }

    telechargerJustificatif(): void {
        const paiement = this.paiement;
        if (!paiement?.justificatifNomFichier) return;

        this.telechargementEnCours.set(true);
        this.paiementService
            .telechargerJustificatif(paiement.id)
            .pipe(
                finalize(() => this.telechargementEnCours.set(false)),
                takeUntilDestroyed(this.destroyRef)
            )
            .subscribe({
                next: (blob) => telechargerBlob(blob, paiement.justificatifNomFichier!),
                error: () => this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Impossible de télécharger le justificatif.' })
            });
    }
}
