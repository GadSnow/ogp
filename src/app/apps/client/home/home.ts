import { Component, inject, OnInit, signal } from '@angular/core';
import { ClientService } from '@/app/apps/client/client.service';
import { Client } from '@/app/apps/client/client.types';
import { TableModule } from 'primeng/table';
import { Tag } from 'primeng/tag';
import { finalize } from 'rxjs';
import { ApiResponse } from '@/app/core/models/api-response.interface';
import { SkeletonTableComponent } from '@/app/shared/utils/components/skeleton-table/skeleton-table.component';
import { CustomCard } from '@/app/layout/components/ui/customcard';
import { Button } from 'primeng/button';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-client-home',
    imports: [TableModule, Tag, SkeletonTableComponent, CustomCard, Button, RouterLink],
    templateUrl: './home.html',
    styleUrl: './home.scss'
})
export class ClientHome implements OnInit {
    private clientService = inject(ClientService);
    clients: Client[] = [];
    isLoading = signal<boolean>(true);

    ngOnInit() {
        this.clientService
            .getClients()
            .pipe(finalize(() => this.isLoading.set(false)))
            .subscribe({
                next: (response: ApiResponse<Client[]>) => {
                    this.clients = response.data;
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
