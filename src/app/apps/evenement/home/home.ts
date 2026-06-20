import { Component, inject, OnInit, signal } from '@angular/core';
import { EvenementService } from '@/app/apps/evenement/evenement.service';
import { Evenement } from '@/app/apps/evenement/evenement.types';
import { TableModule } from 'primeng/table';
import { finalize } from 'rxjs';
import { ApiResponse } from '@/app/core/models/api-response.interface';
import { SkeletonTableComponent } from '@/app/shared/utils/components/skeleton-table/skeleton-table.component';
import { CustomCard } from '@/app/layout/components/ui/customcard';
import { Button } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputText } from 'primeng/inputtext';

@Component({
    selector: 'app-evenement-home',
    imports: [TableModule, SkeletonTableComponent, CustomCard, Button, RouterLink, DatePipe, IconFieldModule, InputIconModule, InputText],
    templateUrl: './home.html',
    styleUrl: './home.scss'
})
export class EvenementHome implements OnInit {
    private evenementService = inject(EvenementService);
    evenements: Evenement[] = [];
    isLoading = signal<boolean>(true);

    ngOnInit() {
        this.evenementService
            .getEvenements()
            .pipe(finalize(() => this.isLoading.set(false)))
            .subscribe({
                next: (response: ApiResponse<Evenement[]>) => {
                    this.evenements = response.data;
                },
                error: (error) => {}
            });
    }

}
