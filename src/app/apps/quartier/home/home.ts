import { Component, inject, OnInit, signal } from '@angular/core';
import { QuartierService } from '@/app/apps/quartier/quartier.service';
import { Quartier } from '@/app/apps/quartier/quartier.types';
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


@Component({
    selector: 'app-quartier-home',
    imports: [TableModule, Tag, SkeletonTableComponent, CustomCard, Button, RouterLink, IconFieldModule, InputIconModule, InputText],
    templateUrl: './home.html',
    styleUrl: './home.scss'
})
export class QuartierHome implements OnInit {
    private quartierService = inject(QuartierService);
    quartiers: Quartier[] = [];
    isLoading = signal<boolean>(true);

    ngOnInit() {
        this.quartierService
            .getQuartiers()
            .pipe(finalize(() => this.isLoading.set(false)))
            .subscribe({
                next: (response: ApiResponse<Quartier[]>) => {
                    this.quartiers = response.data;
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
