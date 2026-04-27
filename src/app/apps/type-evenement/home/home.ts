import { Component, inject, OnInit } from '@angular/core';
import { signal } from '@angular/core';
import { TypeEvenementService } from '@/app/apps/type-evenement/type-evenement.service';
import { TypeEvenement } from '@/app/apps/type-evenement/type-evenement';
import { TableModule } from 'primeng/table';
import { Tag } from 'primeng/tag';
import { finalize } from 'rxjs';
import { ApiResponse } from '@/app/core/models/api-response.interface';
import { SkeletonTableComponent } from '@/app/shared/utils/components/skeleton-table/skeleton-table.component';
import { CustomCard } from '@/app/layout/components/ui/customcard';
import { Button } from 'primeng/button';
import { RouterLink } from '@angular/router';


@Component({
    selector: 'app-type-evenement-home',
    imports: [TableModule, Tag, SkeletonTableComponent, CustomCard, Button, RouterLink],
    templateUrl: './home.html',
    styleUrl: './home.scss'
})
export class TypeEvenementHome implements OnInit {
    private typeEvenementService = inject(TypeEvenementService);
    types: TypeEvenement[] = [];
    isLoading = signal<boolean>(true);

    ngOnInit() {
        this.typeEvenementService
            .getTypesEvenement()
            .pipe(finalize(() => this.isLoading.set(false)))
            .subscribe({
                next: (response: ApiResponse<TypeEvenement[]>) => {
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
