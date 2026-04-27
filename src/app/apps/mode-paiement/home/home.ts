import { Component, inject, OnInit, signal } from '@angular/core';
import { ModePaiementService } from '@/app/apps/mode-paiement/mode-paiement.service';
import { ModePaiement } from '@/app/apps/mode-paiement/mode-paiement.types';
import { TableModule } from 'primeng/table';
import { Tag } from 'primeng/tag';
import { finalize } from 'rxjs';
import { ApiResponse } from '@/app/core/models/api-response.interface';
import { SkeletonTableComponent } from '@/app/shared/utils/components/skeleton-table/skeleton-table.component';
import { CustomCard } from '@/app/layout/components/ui/customcard';
import { Button } from 'primeng/button';
import { RouterLink } from '@angular/router';


@Component({
    selector: 'app-mode-paiement-home',
    imports: [TableModule, Tag, SkeletonTableComponent, CustomCard, Button, RouterLink],
    templateUrl: './home.html',
    styleUrl: './home.scss'
})
export class ModePaiementHome implements OnInit {
    private modePaiementService = inject(ModePaiementService);
    modes: ModePaiement[] = [];
    isLoading = signal<boolean>(true);

    ngOnInit() {
        this.modePaiementService
            .getModesPaiement()
            .pipe(finalize(() => this.isLoading.set(false)))
            .subscribe({
                next: (response: ApiResponse<ModePaiement[]>) => {
                    this.modes = response.data;
                },
                error: (error) => {

                }
            });
    }

    getSeverity(status: boolean) {
        switch (status) {
            case true:
                return 'success';
            case false:
                return 'danger';
            default:
                return 'info';
        }
    }

    getStatus(status: boolean) {
        switch (status) {
            case true:
                return 'Actif';
            case false:
                return 'Inactif';
            default:
                return 'Info';
        }
    }
}
