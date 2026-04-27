import { Component, DestroyRef, inject, signal } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { Skeleton } from 'primeng/skeleton';
import { TabsModule } from 'primeng/tabs';
import { Tag } from 'primeng/tag';
import { DatePipe, DecimalPipe } from '@angular/common';
import { finalize } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { EvenementService } from '@/app/apps/evenement/evenement.service';
import { Evenement } from '@/app/apps/evenement/evenement.types';

@Component({
    selector: 'app-detail-evenement',
    imports: [RouterLink, Skeleton, TabsModule, Tag, DatePipe, DecimalPipe],
    templateUrl: './detail.html'
})
export class DetailEvenement {
    private evenementService = inject(EvenementService);
    private route = inject(ActivatedRoute);
    private destroyRef = inject(DestroyRef);

    isLoading = signal(true);
    evenement: Evenement | null = null;

    constructor() {
        this.route.paramMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(params => {
            const id = params.get('id');
            if (id) this.loadData(id);
        });
    }

    private loadData(id: string) {
        this.isLoading.set(true);
        this.evenementService.getEvenement(id)
            .pipe(finalize(() => this.isLoading.set(false)), takeUntilDestroyed(this.destroyRef))
            .subscribe({
                next: (res) => { this.evenement = res.data; }
            });
    }
}
