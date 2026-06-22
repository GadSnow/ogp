import { Component, DestroyRef, inject, signal } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { Skeleton } from 'primeng/skeleton';
import { Tag } from 'primeng/tag';
import { DatePipe, CurrencyPipe } from '@angular/common';
import { finalize } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CampagneService } from '@/app/apps/campagne/campagne.service';
import { Campagne } from '@/app/apps/campagne/campagne.types';
import { Panneau } from '@/app/apps/panneau/panneau.types';
import { Devis } from '@/app/apps/devis/devis.types';
import { FactureService } from '@/app/apps/facture/facture.service';
import { Facture } from '@/app/apps/facture/facture.types';
import { Button } from 'primeng/button';
import { Tooltip } from 'primeng/tooltip';
import { DialogModule } from 'primeng/dialog';
import { Textarea } from 'primeng/textarea';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

interface CampagneDetailResponse {
    campagne: Campagne;
    panneaux: Panneau[];
    devis: Devis[];
}

@Component({
    selector: 'app-detail-campagne',
    imports: [RouterLink, Skeleton, Tag, DatePipe, CurrencyPipe, Button, Tooltip, DialogModule, Textarea, FormsModule, ToastModule],
    templateUrl: './detail.html',
    providers: [MessageService]
})
export class DetailCampagne {
    private campagneService = inject(CampagneService);
    private factureService = inject(FactureService);
    private route = inject(ActivatedRoute);
    private destroyRef = inject(DestroyRef);
    private messageService = inject(MessageService);

    isLoading = signal(true);
    isActionLoading = signal(false);
    campagne: Campagne | null = null;
    panneaux: Panneau[] = [];
    devis: Devis[] = [];
    factures = signal<Facture[]>([]);

    showValidationDialog = signal(false);
    showRejetDialog = signal(false);
    showFactureDialog = signal(false);
    isFactureLoading = signal(false);
    commentaireRejet = '';

    constructor() {
        this.route.paramMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((params) => {
            const id = params.get('id');
            if (id) this.loadData(id);
        });
    }

    private loadData(id: string) {
        this.isLoading.set(true);
        this.campagneService
            .getCampagne(id)
            .pipe(
                finalize(() => this.isLoading.set(false)),
                takeUntilDestroyed(this.destroyRef)
            )
            .subscribe({
                next: (res) => {
                    const data = res.data as unknown as CampagneDetailResponse;
                    this.campagne = data.campagne;
                    this.panneaux = data.panneaux ?? [];
                    this.devis = data.devis ?? [];
                    this.loadFactures(id);
                }
            });
    }

    private loadFactures(idCampagne: string) {
        this.factureService
            .getFacturesByCampagne(idCampagne)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
                next: (res) => {
                    this.factures.set(Array.isArray(res) ? res : (res?.data ?? []));
                },
                error: () => {
                    this.factures.set([]);
                }
            });
    }

    genererFacture() {
        if (!this.campagne?.id) return;
        this.isFactureLoading.set(true);
        this.factureService
            .addFacture(this.campagne.id)
            .pipe(
                finalize(() => this.isFactureLoading.set(false)),
                takeUntilDestroyed(this.destroyRef)
            )
            .subscribe({
                next: () => {
                    this.showFactureDialog.set(false);
                    this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Facture générée avec succès.' });
                    this.loadFactures(this.campagne!.id);
                },
                error: () => {
                    this.showFactureDialog.set(false);
                    this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Une erreur est survenue. Veuillez réessayer.' });
                }
            });
    }

    onValider() {
        this.showValidationDialog.set(true);
    }

    confirmerValidation() {
        this.showValidationDialog.set(false);
        this.callUpdateStatut('validation');
    }

    onRejeter() {
        this.commentaireRejet = '';
        this.showRejetDialog.set(true);
    }

    confirmerRejet() {
        if (!this.commentaireRejet.trim()) return;
        this.showRejetDialog.set(false);
        this.callUpdateStatut('rejet', this.commentaireRejet.trim());
    }

    private callUpdateStatut(type: 'validation' | 'rejet', commentaire?: string) {
        if (!this.campagne?.id) return;
        this.isActionLoading.set(true);
        this.campagneService
            .updateStatut(this.campagne.id, type, commentaire)
            .pipe(
                finalize(() => this.isActionLoading.set(false)),
                takeUntilDestroyed(this.destroyRef)
            )
            .subscribe({
                next: () => {
                    const label = type === 'validation' ? 'validée' : 'rejetée';
                    this.messageService.add({ severity: 'success', summary: 'Succès', detail: `Campagne ${label} avec succès.` });
                    this.loadData(this.campagne!.id);
                },
                error: () => {
                    this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Une erreur est survenue. Veuillez réessayer.' });
                }
            });
    }

    getStatutSeverity(statut: string) {
        switch (statut?.toLowerCase()) {
            case 'actif':
            case 'terminee':
                return 'success';
            case 'en cours':
                return 'info';
            case 'annulee':
                return 'danger';
            default:
                return 'secondary';
        }
    }

    getPaiementSeverity(statut: string) {
        switch (statut?.toLowerCase()) {
            case 'paye':
                return 'success';
            case 'partial':
                return 'warn';
            case 'pending':
                return 'secondary';
            default:
                return 'secondary';
        }
    }

    getCycleLabel(cycle: string | undefined): string {
        switch (cycle) {
            case 'JOUR':
                return 'Jour';
            case 'SEMAINE':
                return 'Semaine';
            case 'MOIS':
                return 'Mois';
            default:
                return cycle ?? '—';
        }
    }

    getLocalisation(panneau: Panneau): string {
        const s = panneau.secteur;
        if (!s) return '—';
        const parts: string[] = [s.secteur];
        if (s.quartier) {
            parts.push(s.quartier.quartier);
            if (s.quartier.commune) {
                parts.push(s.quartier.commune.commune);
                if (s.quartier.commune.region) parts.push(s.quartier.commune.region.region);
            }
        }
        return parts.join(', ');
    }
}
