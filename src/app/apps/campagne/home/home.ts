import { Component, inject, OnInit, signal } from '@angular/core';
import { CampagneService } from '@/app/apps/campagne/campagne.service';
import { Campagne } from '@/app/apps/campagne/campagne.types';
import { TableModule } from 'primeng/table';
import { Tag } from 'primeng/tag';
import { finalize } from 'rxjs';
import { ApiResponse } from '@/app/core/models/api-response.interface';
import { SkeletonTableComponent } from '@/app/shared/utils/components/skeleton-table/skeleton-table.component';
import { CustomCard } from '@/app/layout/components/ui/customcard';
import { Button } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputText } from 'primeng/inputtext';
import { EmptyStateComponent } from '@/app/shared/utils/components/empty-state/empty-state.component';

@Component({
    selector: 'app-home-campagne',
    imports: [TableModule, Tag, SkeletonTableComponent, CustomCard, Button, RouterLink, DatePipe, ConfirmDialogModule, IconFieldModule, InputIconModule, InputText, EmptyStateComponent],
    templateUrl: './home.html',
    providers: [ConfirmationService]
})
export class HomeCampagne implements OnInit {
    private campagneService = inject(CampagneService);
    private confirmationService = inject(ConfirmationService);
    private messageService = inject(MessageService);
    campagnes: Campagne[] = [];
    isLoading = signal<boolean>(true);

    ngOnInit() {
        this.loadCampagnes();
    }

    loadCampagnes() {
        this.isLoading.set(true);
        this.campagneService
            .getCampagnes()
            .pipe(finalize(() => this.isLoading.set(false)))
            .subscribe({
                next: (response: ApiResponse<Campagne[]>) => {
                    this.campagnes = response.data;
                },
                error: (error) => {}
            });
    }

    deleteCampagne(id: string) {
        this.confirmationService.confirm({
            message: 'Êtes-vous sûr de vouloir supprimer cette campagne ?',
            header: 'Confirmation de suppression',
            icon: 'pi pi-info-circle',
            rejectLabel: 'Non',
            acceptLabel: 'Oui, supprimer',
            rejectButtonProps: { label: 'Annuler', severity: 'secondary', outlined: true },
            acceptButtonProps: { label: 'Supprimer', severity: 'danger' },
            accept: () => {
                this.campagneService.deleteCampagne(id).subscribe({
                    next: () => {
                        this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Campagne supprimée' });
                        this.loadCampagnes();
                    },
                    error: (err) => {
                        this.messageService.add({ severity: 'error', summary: 'Erreur', detail: err.error?.message || 'Erreur lors de la suppression' });
                    }
                });
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
