import { Component, DestroyRef, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Button } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { Tag } from 'primeng/tag';
import { DatePipe, CurrencyPipe } from '@angular/common';
import { finalize } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PaiementService } from '@/app/apps/paiement/paiement.service';
import { Paiement } from '@/app/apps/paiement/paiement.types';
import { SkeletonTableComponent } from '@/app/shared/utils/components/skeleton-table/skeleton-table.component';
import { CustomCard } from '@/app/layout/components/ui/customcard';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputText } from 'primeng/inputtext';
import { EmptyStateComponent } from '@/app/shared/utils/components/empty-state/empty-state.component';

@Component({
    selector: 'app-home-paiement',
    imports: [Button, TableModule, Tag, DatePipe, CurrencyPipe, RouterLink, SkeletonTableComponent, CustomCard, IconFieldModule, InputIconModule, InputText, EmptyStateComponent],
    templateUrl: './home.html'
})
export class HomePaiement {
    private paiementService = inject(PaiementService);
    private destroyRef = inject(DestroyRef);

    isLoading = signal(true);
    paiements: Paiement[] = [];

    constructor() {
        this.loadPaiements();
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

    private loadPaiements() {
        this.isLoading.set(true);
        this.paiementService
            .getPaiements()
            .pipe(finalize(() => this.isLoading.set(false)), takeUntilDestroyed(this.destroyRef))
            .subscribe({ next: (res) => { this.paiements = res.data ?? []; } });
    }
}
