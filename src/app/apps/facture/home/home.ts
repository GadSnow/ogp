import { Component, DestroyRef, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Button } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { Tag } from 'primeng/tag';
import { DatePipe, CurrencyPipe } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { Tooltip } from 'primeng/tooltip';
import { finalize } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FactureService } from '@/app/apps/facture/facture.service';
import { Facture } from '@/app/apps/facture/facture.types';
import { SkeletonTableComponent } from '@/app/shared/utils/components/skeleton-table/skeleton-table.component';
import { CustomCard } from '@/app/layout/components/ui/customcard';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputText } from 'primeng/inputtext';
import { EmptyStateComponent } from '@/app/shared/utils/components/empty-state/empty-state.component';

@Component({
    selector: 'app-home-facture',
    imports: [Button, TableModule, Tag, DatePipe, CurrencyPipe, RouterLink, SkeletonTableComponent, CustomCard, DialogModule, Tooltip, IconFieldModule, InputIconModule, InputText, EmptyStateComponent],
    templateUrl: './home.html'
})
export class HomeFacture {
    private factureService = inject(FactureService);
    private destroyRef = inject(DestroyRef);

    isLoading = signal(true);
    factures: Facture[] = [];
    selectedFacture: Facture | null = null;
    showDetail = signal(false);

    constructor() {
        this.loadFactures();
    }

    voirDetail(facture: Facture) {
        this.selectedFacture = facture;
        this.showDetail.set(true);
    }

    private loadFactures() {
        this.isLoading.set(true);
        this.factureService
            .getFactures()
            .pipe(finalize(() => this.isLoading.set(false)), takeUntilDestroyed(this.destroyRef))
            .subscribe({ next: (res) => { this.factures = res.data ?? []; } });
    }
}
