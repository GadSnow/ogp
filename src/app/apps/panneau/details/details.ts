import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PanneauService } from '../panneau.service';
import { Panneau, Tarif } from '../panneau.types';
import { finalize } from 'rxjs';
import { Tag } from 'primeng/tag';
import { Button } from 'primeng/button';
import { CommonModule, DecimalPipe } from '@angular/common';
import { Skeleton } from 'primeng/skeleton';
import { MapLocation } from '@/app/shared/utils/components/map-location/map-location';

@Component({
    selector: 'app-details-panneau',
    standalone: true,
    imports: [CommonModule, Tag, Button, RouterLink, Skeleton, DecimalPipe, MapLocation],
    templateUrl: './details.html',
    styleUrl: './details.scss'
})
export class DetailsPanneau implements OnInit {
    private route = inject(ActivatedRoute);
    private panneauService = inject(PanneauService);

    panneau = signal<Panneau | null>(null);
    tarif = signal<Tarif | null>(null);
    isLoading = signal(true);

    ngOnInit() {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.loadPanneau(id);
        }
    }

    loadPanneau(id: string) {
        this.isLoading.set(true);
        this.panneauService.getPanneau(id)
            .pipe(finalize(() => this.isLoading.set(false)))
            .subscribe({
                next: (res) => {
                    this.panneau.set(res.data.panneau);
                    this.tarif.set(res.data.tarif);
                },
                error: (err) => {
                    console.error('Error fetching panneau details', err);
                }
            });
    }

    getSeverity(status: boolean) {
        return status ? 'success' : 'danger';
    }

    getStatus(status: boolean) {
        return status ? 'Oui' : 'Non';
    }
}
