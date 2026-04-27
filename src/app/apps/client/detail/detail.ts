import { Component, DestroyRef, inject, signal } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { Skeleton } from 'primeng/skeleton';
import { Tag } from 'primeng/tag';
import { TabsModule } from 'primeng/tabs';
import { TableModule } from 'primeng/table';
import { DatePipe } from '@angular/common';
import { forkJoin } from 'rxjs';
import { finalize } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ClientService } from '@/app/apps/client/client.service';
import { CampagneService } from '@/app/apps/campagne/campagne.service';
import { DevisService } from '@/app/apps/devis/devis.service';
import { Client } from '@/app/apps/client/client.types';
import { Campagne } from '@/app/apps/campagne/campagne.types';
import { Devis } from '@/app/apps/devis/devis.types';

@Component({
    selector: 'app-detail-client',
    imports: [RouterLink, Skeleton, Tag, TabsModule, TableModule, DatePipe],
    templateUrl: './detail.html'
})
export class DetailClient {
    private clientService = inject(ClientService);
    private campagneService = inject(CampagneService);
    private devisService = inject(DevisService);
    private route = inject(ActivatedRoute);
    private destroyRef = inject(DestroyRef);

    isLoading = signal(true);
    client: Client | null = null;
    campagnes: Campagne[] = [];
    devis: Devis[] = [];

    constructor() {
        this.route.paramMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(params => {
            const id = params.get('id');
            if (id) this.loadData(id);
        });
    }

    private loadData(id: string) {
        this.isLoading.set(true);
        forkJoin([
            this.clientService.getClient(id),
            this.campagneService.getCampagnesByClient(id),
            this.devisService.getDevisByClient(id)
        ])
        .pipe(finalize(() => this.isLoading.set(false)), takeUntilDestroyed(this.destroyRef))
        .subscribe({
            next: ([clientRes, campagnesRes, devisRes]) => {
                this.client = clientRes.data;
                this.campagnes = campagnesRes.data;
                this.devis = devisRes.data;
            }
        });
    }
}
