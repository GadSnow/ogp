import { Component, DestroyRef, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Button } from 'primeng/button';
import { Select } from 'primeng/select';
import { Skeleton } from 'primeng/skeleton';
import { Tag } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { finalize } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DevisService } from '@/app/apps/devis/devis.service';
import { CampagneService } from '@/app/apps/campagne/campagne.service';
import { RemiseService } from '@/app/apps/remise/remise.service';
import { Campagne } from '@/app/apps/campagne/campagne.types';
import { Panneau } from '@/app/apps/panneau/panneau.types';
import { Remise } from '@/app/apps/remise/remise.types';

interface CampagneDetails {
    campagne: Campagne;
    panneaux: Panneau[];
}

@Component({
    selector: 'app-add-devis',
    imports: [Button, Select, Skeleton, Tag, ToastModule, ConfirmDialogModule, FormsModule, DatePipe, RouterLink],
    templateUrl: './add.html',
    providers: [ConfirmationService, MessageService]
})
export class AddDevis {
    private devisService = inject(DevisService);
    private campagneService = inject(CampagneService);
    private remiseService = inject(RemiseService);
    private confirmationService = inject(ConfirmationService);
    private messageService = inject(MessageService);
    private router = inject(Router);
    private destroyRef = inject(DestroyRef);

    isLoading = signal(false);
    loadingCampagnes = signal(false);
    loadingRemises = signal(false);
    loadingCampagneDetails = signal(false);

    campagnes: Campagne[] = [];
    remises: Remise[] = [];

    selectedCampagneId: string | null = null;
    selectedRemiseId: string | null = null;
    campagneDetails: CampagneDetails | null = null;
    selectedRemise: Remise | null = null;

    constructor() {
        this.loadCampagnes();
        this.loadRemises();
    }

    private loadCampagnes() {
        this.loadingCampagnes.set(true);
        this.campagneService.getCampagnes()
            .pipe(finalize(() => this.loadingCampagnes.set(false)), takeUntilDestroyed(this.destroyRef))
            .subscribe({ next: (res) => { this.campagnes = res.data; } });
    }

    private loadRemises() {
        this.loadingRemises.set(true);
        this.remiseService.getRemises()
            .pipe(finalize(() => this.loadingRemises.set(false)), takeUntilDestroyed(this.destroyRef))
            .subscribe({ next: (res) => { this.remises = res.data; } });
    }

    onCampagneChange(id: string | null) {
        this.campagneDetails = null;
        if (!id) return;
        this.loadingCampagneDetails.set(true);
        this.campagneService.getCampagne(id)
            .pipe(finalize(() => this.loadingCampagneDetails.set(false)), takeUntilDestroyed(this.destroyRef))
            .subscribe({ next: (res) => { this.campagneDetails = res.data as any; } });
    }

    onRemiseChange(id: string | null) {
        this.selectedRemise = this.remises.find(r => r.id === id) ?? null;
    }

    submit() {
        this.confirmationService.confirm({
            message: 'Voulez-vous générer ce devis ?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => this.validate()
        });
    }

    private validate() {
        if (!this.selectedCampagneId) return;
        this.isLoading.set(true);
        this.devisService.addDevis(this.selectedCampagneId, this.selectedRemiseId ?? undefined)
            .pipe(finalize(() => this.isLoading.set(false)), takeUntilDestroyed(this.destroyRef))
            .subscribe({
                next: () => {
                    this.messageService.add({ severity: 'success', summary: 'Message', detail: 'Devis généré avec succès' });
                    this.router.navigate(['/ogp/campagne']);
                },
                error: (err) => {
                    this.messageService.add({ severity: 'error', summary: 'Message', detail: err.error?.message || 'Erreur' });
                }
            });
    }
}
