import { Component, inject, OnInit, signal } from '@angular/core';
import { PanneauService } from '@/app/apps/panneau/panneau.service';
import { Panneau } from '@/app/apps/panneau/panneau.types';
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
    selector: 'app-panneau-home',
    imports: [TableModule, Tag, SkeletonTableComponent, CustomCard, Button, RouterLink, IconFieldModule, InputIconModule, InputText],
    templateUrl: './home.html',
    styleUrl: './home.scss'
})
export class PanneauHome implements OnInit {
    private panneauService = inject(PanneauService);
    panneaux: Panneau[] = [];
    isLoading = signal<boolean>(true);

    ngOnInit() {
        this.panneauService
            .getPanneaux()
            .pipe(finalize(() => this.isLoading.set(false)))
            .subscribe({
                next: (response: ApiResponse<Panneau[]>) => {
                    this.panneaux = response.data;
                },
                error: (error) => {}
            });
    }

    getSeverity(status: boolean) {
        return status ? 'success' : 'danger';
    }

    getStatus(status: boolean) {
        return status ? 'Oui' : 'Non';
    }
}
