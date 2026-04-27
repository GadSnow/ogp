import { Component, DestroyRef, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Button } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { Tag } from 'primeng/tag';
import { DatePipe } from '@angular/common';
import { finalize } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DevisService } from '@/app/apps/devis/devis.service';
import { Devis } from '@/app/apps/devis/devis.types';
import { SkeletonTableComponent } from '@/app/shared/utils/components/skeleton-table/skeleton-table.component';
import { CustomCard } from '@/app/layout/components/ui/customcard';

@Component({
    selector: 'app-home-devis',
    imports: [Button, TableModule, Tag, DatePipe, RouterLink, SkeletonTableComponent, CustomCard],
    templateUrl: './home.html'
})
export class HomeDevis {
    private devisService = inject(DevisService);
    private destroyRef = inject(DestroyRef);

    isLoading = signal(true);
    devis: Devis[] = [];

    constructor() {
        this.loadDevis();
    }

    private loadDevis() {
        this.isLoading.set(true);
        this.devisService.getDevis()
            .pipe(finalize(() => this.isLoading.set(false)), takeUntilDestroyed(this.destroyRef))
            .subscribe({ next: (res) => { this.devis = res.data; } });
    }
}
