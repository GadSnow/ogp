import { Component, DestroyRef, inject, signal } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { Skeleton } from 'primeng/skeleton';
import { Tag } from 'primeng/tag';
import { DatePipe } from '@angular/common';
import { finalize } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CampagneService } from '@/app/apps/campagne/campagne.service';
import { Campagne } from '@/app/apps/campagne/campagne.types';
import { Panneau } from '@/app/apps/panneau/panneau.types';

interface CampagneDetailResponse {
    campagne: Campagne;
    panneaux: Panneau[];
}

@Component({
    selector: 'app-detail-campagne',
    imports: [RouterLink, Skeleton, Tag, DatePipe],
    templateUrl: './detail.html'
})
export class DetailCampagne {
    private campagneService = inject(CampagneService);
    private route = inject(ActivatedRoute);
    private destroyRef = inject(DestroyRef);

    isLoading = signal(true);
    campagne: Campagne | null = null;
    panneaux: Panneau[] = [];

    constructor() {
        this.route.paramMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(params => {
            const id = params.get('id');
            if (id) this.loadData(id);
        });
    }

    private loadData(id: string) {
        this.isLoading.set(true);
        this.campagneService.getCampagne(id)
            .pipe(finalize(() => this.isLoading.set(false)), takeUntilDestroyed(this.destroyRef))
            .subscribe({
                next: (res) => {
                    const data = res.data as unknown as CampagneDetailResponse;
                    this.campagne = data.campagne;
                    this.panneaux = data.panneaux ?? [];
                }
            });
    }

    getSeverity(statut: string) {
        switch (statut?.toLowerCase()) {
            case 'actif':
            case 'terminee':
                return 'success';
            case 'en cours':
                return 'info';
            case 'annulee':
                return 'danger';
            default:
                return 'secondary';
        }
    }
}
