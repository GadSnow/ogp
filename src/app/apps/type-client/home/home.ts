import { Component, inject, OnInit, signal } from '@angular/core';
import { TypeClientService } from '@/app/apps/type-client/type-client.service';
import { TypeClient } from '@/app/apps/type-client/type-client.types';
import { TableModule } from 'primeng/table';
import { Tag } from 'primeng/tag';
import { finalize } from 'rxjs';
import { ApiResponse } from '@/app/core/models/api-response.interface';
import { SkeletonTableComponent } from '@/app/shared/utils/components/skeleton-table/skeleton-table.component';
import { CustomCard } from '@/app/layout/components/ui/customcard';
import { Button } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputText } from 'primeng/inputtext';
import { EmptyStateComponent } from '@/app/shared/utils/components/empty-state/empty-state.component';
import { Tooltip } from 'primeng/tooltip';


@Component({
    selector: 'app-type-client-home',
    imports: [TableModule, Tag, SkeletonTableComponent, CustomCard, Button, RouterLink, IconFieldModule, InputIconModule, InputText, EmptyStateComponent, Tooltip],
    templateUrl: './home.html',
    styleUrl: './home.scss'
})
export class TypeClientHome implements OnInit {
    private typeClientService = inject(TypeClientService);
    types: TypeClient[] = [];
    isLoading = signal<boolean>(true);

    ngOnInit() {
        this.typeClientService
            .getTypesClient()
            .pipe(finalize(() => this.isLoading.set(false)))
            .subscribe({
                next: (response: ApiResponse<TypeClient[]>) => {
                    this.types = response.data;
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
