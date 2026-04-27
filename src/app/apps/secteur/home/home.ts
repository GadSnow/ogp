import { Component, inject, OnInit, signal } from '@angular/core';
import { SecteurService } from '@/app/apps/secteur/secteur.service';
import { Secteur } from '@/app/apps/secteur/secteur.types';
import { TableModule } from 'primeng/table';
import { Tag } from 'primeng/tag';
import { finalize } from 'rxjs';
import { ApiResponse } from '@/app/core/models/api-response.interface';
import { SkeletonTableComponent } from '@/app/shared/utils/components/skeleton-table/skeleton-table.component';
import { CustomCard } from '@/app/layout/components/ui/customcard';
import { Button } from 'primeng/button';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-secteur-home',
    imports: [TableModule, Tag, SkeletonTableComponent, CustomCard, Button, RouterLink],
    templateUrl: './home.html',
    styleUrl: './home.scss'
})
export class SecteurHome implements OnInit {
    private secteurService = inject(SecteurService);
    secteurs: Secteur[] = [];
    isLoading = signal<boolean>(true);

    ngOnInit() {
        this.secteurService
            .getSecteurs()
            .pipe(finalize(() => this.isLoading.set(false)))
            .subscribe({
                next: (response: ApiResponse<Secteur[]>) => {
                    this.secteurs = response.data;
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
