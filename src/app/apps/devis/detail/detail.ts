import { Component, DestroyRef, inject, signal } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { Skeleton } from 'primeng/skeleton';
import { Tag } from 'primeng/tag';
import { TabsModule } from 'primeng/tabs';
import { DatePipe, DecimalPipe } from '@angular/common';
import { finalize } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DevisService } from '@/app/apps/devis/devis.service';
import { Devis } from '@/app/apps/devis/devis.types';
import { Panneau } from '@/app/apps/panneau/panneau.types';

interface DevisDetail extends Devis {
    campagne?: any;
    panneaux?: Panneau[];
}

@Component({
    selector: 'app-detail-devis',
    imports: [RouterLink, Skeleton, Tag, TabsModule, DatePipe, DecimalPipe,],
    templateUrl: './detail.html'
})
export class DetailDevis {
    private devisService = inject(DevisService);
    private route = inject(ActivatedRoute);
    private destroyRef = inject(DestroyRef);

    isLoading = signal(true);
    devis: DevisDetail | null = null;

    constructor() {
        this.route.paramMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(params => {
            const id = params.get('id');
            if (id) this.loadData(id);
        });
    }

    private loadData(id: string) {
        this.isLoading.set(true);
        this.devisService.getDevisById(id)
            .pipe(finalize(() => this.isLoading.set(false)), takeUntilDestroyed(this.destroyRef))
            .subscribe({ next: (res) => { this.devis = res.data as any; } });
    }
}
