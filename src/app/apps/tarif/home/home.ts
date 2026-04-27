import { Component, inject, OnInit, signal } from '@angular/core';
import { TarifService } from '@/app/apps/tarif/tarif.service';
import { Tarif } from '@/app/apps/tarif/tarif.types';
import { TableModule } from 'primeng/table';
import { Tag } from 'primeng/tag';
import { finalize } from 'rxjs';
import { ApiResponse } from '@/app/core/models/api-response.interface';
import { SkeletonTableComponent } from '@/app/shared/utils/components/skeleton-table/skeleton-table.component';
import { CustomCard } from '@/app/layout/components/ui/customcard';
import { Button } from 'primeng/button';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-tarif-home',
    imports: [TableModule, Tag, SkeletonTableComponent, CustomCard, Button, RouterLink],
    templateUrl: './home.html',
    styleUrl: './home.scss'
})
export class TarifHome implements OnInit {
    private tarifService = inject(TarifService);
    tarifs: Tarif[] = [];
    isLoading = signal<boolean>(true);

    ngOnInit() {
        this.tarifService
            .getTarifs()
            .pipe(finalize(() => this.isLoading.set(false)))
            .subscribe({
                next: (response: ApiResponse<Tarif[]>) => {
                    this.tarifs = response.data;
                },
                error: (error) => {}
            });
    }

    getSeverity(status: boolean) {
        return status ? 'success' : 'danger';
    }

    getStatus(status: boolean) {
        return status ? 'Actif' : 'Inactif';
    }
}
