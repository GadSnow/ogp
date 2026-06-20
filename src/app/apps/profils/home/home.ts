import { Component, inject, OnInit, signal } from '@angular/core';
import { ProfilsService } from '@/app/apps/profils/profils.service';
import { Profil } from '@/app/apps/profils/profils.types';
import { TableModule } from 'primeng/table';
import { Tag } from 'primeng/tag';
import { Button } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import { ApiResponse } from '@/app/core/models/api-response.interface';
import { SkeletonTableComponent } from '@/app/shared/utils/components/skeleton-table/skeleton-table.component';
import { CustomCard } from '@/app/layout/components/ui/customcard';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputText } from 'primeng/inputtext';

@Component({
    selector: 'app-profils-home',
    imports: [TableModule, Tag, Button, RouterLink, SkeletonTableComponent, CustomCard, ConfirmDialogModule, ToastModule, IconFieldModule, InputIconModule, InputText],
    templateUrl: './home.html',
    providers: [ConfirmationService, MessageService]
})
export class ProfilsHome implements OnInit {
    private profilsService = inject(ProfilsService);
    private confirmationService = inject(ConfirmationService);
    private messageService = inject(MessageService);

    profils: Profil[] = [];
    isLoading = signal<boolean>(true);

    ngOnInit() {
        this.loadProfils();
    }

    loadProfils() {
        this.isLoading.set(true);
        this.profilsService
            .getProfils()
            .pipe(finalize(() => this.isLoading.set(false)))
            .subscribe({
                next: (response: ApiResponse<Profil[]>) => {
                    this.profils = response.data;
                },
                error: () => {
                    this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Impossible de charger les profils' });
                }
            });
    }

    deleteProfil(id: string) {
        this.confirmationService.confirm({
            message: 'Êtes-vous sûr de vouloir supprimer ce profil ?',
            header: 'Confirmation de suppression',
            icon: 'pi pi-info-circle',
            rejectButtonProps: { label: 'Annuler', severity: 'secondary', outlined: true },
            acceptButtonProps: { label: 'Supprimer', severity: 'danger' },
            accept: () => {
                this.profilsService.deleteProfil(id).subscribe({
                    next: () => {
                        this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Profil supprimé' });
                        this.loadProfils();
                    },
                    error: (err) => {
                        this.messageService.add({ severity: 'error', summary: 'Erreur', detail: err.error?.message || 'Erreur lors de la suppression' });
                    }
                });
            }
        });
    }

    getSeverity(status: boolean) {
        return status ? 'success' : 'danger';
    }

    getStatus(status: boolean) {
        return status ? 'Actif' : 'Inactif';
    }
}
