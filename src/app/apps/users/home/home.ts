import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UsersService } from '@/app/apps/users/users.service';
import { User } from '@/app/apps/users/users.types';
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
    selector: 'app-users-home',
    imports: [TableModule, Tag, Button, RouterLink, SkeletonTableComponent, CustomCard, ConfirmDialogModule, ToastModule, IconFieldModule, InputIconModule, InputText],
    templateUrl: './home.html',
    providers: [ConfirmationService, MessageService]
})
export class UsersHome implements OnInit {
    private usersService = inject(UsersService);
    private confirmationService = inject(ConfirmationService);
    private messageService = inject(MessageService);
    private destroyRef = inject(DestroyRef);

    users: User[] = [];
    isLoading = signal<boolean>(true);

    ngOnInit() {
        this.loadUsers();
    }

    loadUsers() {
        this.isLoading.set(true);
        this.usersService
            .getUsers()
            .pipe(finalize(() => this.isLoading.set(false)), takeUntilDestroyed(this.destroyRef))
            .subscribe({
                next: (response: ApiResponse<User[]>) => {
                    this.users = response.data;
                },
                error: () => {
                    this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Impossible de charger les utilisateurs' });
                }
            });
    }

    deleteUser(id: string) {
        this.confirmationService.confirm({
            message: 'Êtes-vous sûr de vouloir supprimer cet utilisateur ?',
            header: 'Confirmation de suppression',
            icon: 'pi pi-info-circle',
            rejectButtonProps: { label: 'Annuler', severity: 'secondary', outlined: true },
            acceptButtonProps: { label: 'Supprimer', severity: 'danger' },
            accept: () => {
                this.usersService.deleteUser(id).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
                    next: () => {
                        this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Utilisateur supprimé' });
                        this.loadUsers();
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
