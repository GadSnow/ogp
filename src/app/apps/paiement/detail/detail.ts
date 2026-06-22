import { Component, DestroyRef, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Skeleton } from 'primeng/skeleton';
import { Tag } from 'primeng/tag';
import { DatePipe, CurrencyPipe } from '@angular/common';
import { finalize } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PaiementService } from '@/app/apps/paiement/paiement.service';
import { Paiement } from '@/app/apps/paiement/paiement.types';

@Component({
    selector: 'app-detail-paiement',
    imports: [RouterLink, Skeleton, Tag, DatePipe, CurrencyPipe],
    templateUrl: './detail.html'
})
export class DetailPaiement {
    private paiementService = inject(PaiementService);
    private route = inject(ActivatedRoute);
    private destroyRef = inject(DestroyRef);

    isLoading = signal(true);
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
            .pipe(finalize(() => this.isLoading.set(false)), takeUntilDestroyed(this.destroyRef))
            .subscribe({ next: (res) => { this.paiement = res.data; } });
    }

    getSeverity(statut?: string) {
        switch (statut) {
            case 'success':
                return 'success';
            case 'pending':
                return 'warn';
            case 'failed':
                return 'danger';
            default:
                return 'info';
        }
    }
}
