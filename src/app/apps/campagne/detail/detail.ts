import { Component, computed, DestroyRef, inject, signal } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { Skeleton } from 'primeng/skeleton';
import { Tag } from 'primeng/tag';
import { DatePipe, CurrencyPipe, LowerCasePipe } from '@angular/common';
import { finalize } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CampagneService } from '@/app/apps/campagne/campagne.service';
import { Campagne } from '@/app/apps/campagne/campagne.types';
import { Panneau } from '@/app/apps/panneau/panneau.types';
import { Devis } from '@/app/apps/devis/devis.types';
import { DevisService } from '@/app/apps/devis/devis.service';
import { RemiseService } from '@/app/apps/remise/remise.service';
import { Remise } from '@/app/apps/remise/remise.types';
import { FactureService } from '@/app/apps/facture/facture.service';
import { Facture } from '@/app/apps/facture/facture.types';
import { Button } from 'primeng/button';
import { Tooltip } from 'primeng/tooltip';
import { DialogModule } from 'primeng/dialog';
import { Drawer } from 'primeng/drawer';
import { Select } from 'primeng/select';
import { Textarea } from 'primeng/textarea';
import { FormsModule } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

/** La réponse /campagne/getbyid embarque déjà panneaux, devis et factures : une seule requête suffit. */
interface CampagneDetailResponse {
    campagne: Campagne;
    panneaux: Panneau[];
    devis: Devis[];
    factures: Facture[];
}

@Component({
    selector: 'app-detail-campagne',
    imports: [RouterLink, Skeleton, Tag, DatePipe, CurrencyPipe, LowerCasePipe, Button, Tooltip, DialogModule, Drawer, Select, Textarea, FormsModule, ToastModule],
    templateUrl: './detail.html',
    providers: [MessageService]
})
export class DetailCampagne {
    private campagneService = inject(CampagneService);
    private devisService = inject(DevisService);
    private remiseService = inject(RemiseService);
    private factureService = inject(FactureService);
    private route = inject(ActivatedRoute);
    private destroyRef = inject(DestroyRef);
    private messageService = inject(MessageService);
    private confirmationService = inject(ConfirmationService);

    isLoading = signal(true);
    isActionLoading = signal(false);
    campagne = signal<Campagne | null>(null);
    panneaux = signal<Panneau[]>([]);
    devis = signal<Devis[]>([]);
    factures = signal<Facture[]>([]);

    showRejetDialog = signal(false);
    commentaireRejet = '';

    // --- Remises (partagées par les deux drawers) ---
    remises = signal<Remise[]>([]);
    loadingRemises = signal(false);

    // --- Génération de devis ---
    showDevisDrawer = signal(false);
    isDevisLoading = signal(false);
    /** Remise retenue pour la simulation du devis ; null = sans remise. */
    remiseChoisie = signal<Remise | null>(null);

    // --- Génération de facture ---
    showFactureDrawer = signal(false);
    isFactureLoading = signal(false);
    /** Remise retenue pour la simulation de la facture ; null = sans remise. */
    remiseFacture = signal<Remise | null>(null);

    /** Prix catalogue d'un panneau pour le cycle de la campagne. */
    private prixParCycle(panneau: Panneau): number {
        switch (this.campagne()?.cycle?.toLowerCase()) {
            case 'jour':
                return panneau.priceDay ?? 0;
            case 'mois':
                return panneau.priceMonth ?? 0;
            case 'semaine':
            default:
                return panneau.priceWeek ?? 0;
        }
    }

    /** Montant brut estimé = Σ(prix du cycle) × nombre de cycles. Le backend fait foi ; ceci n'est qu'une simulation. */
    montantBrutSimule = computed<number>(() => {
        const nombre = this.campagne()?.nombre ?? 0;
        const total = this.panneaux().reduce((somme, p) => somme + this.prixParCycle(p), 0);
        return total * nombre;
    });

    montantRemiseSimule = computed<number>(() => {
        const remise = this.remiseChoisie();
        if (!remise) return 0;
        return (this.montantBrutSimule() * (remise.valeurRemise ?? 0)) / 100;
    });

    montantNetSimule = computed<number>(() => this.montantBrutSimule() - this.montantRemiseSimule());

    // Même base de calcul que le devis, mais pilotée par la remise choisie pour la facture.
    montantRemiseFacture = computed<number>(() => {
        const remise = this.remiseFacture();
        if (!remise) return 0;
        return (this.montantBrutSimule() * (remise.valeurRemise ?? 0)) / 100;
    });

    montantNetFacture = computed<number>(() => this.montantBrutSimule() - this.montantRemiseFacture());

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
                    this.campagne.set(data.campagne);
                    this.panneaux.set(data.panneaux ?? []);
                    this.devis.set(data.devis ?? []);
                    this.factures.set(data.factures ?? []);
                }
            });
    }

    // --- Devis ---

    ouvrirDevisDrawer() {
        this.remiseChoisie.set(null);
        this.showDevisDrawer.set(true);
        // Les remises ne sont chargées qu'à la première ouverture du drawer.
        if (this.remises().length === 0) this.loadRemises();
    }

    private loadRemises() {
        this.loadingRemises.set(true);
        this.remiseService
            .getRemises()
            .pipe(
                finalize(() => this.loadingRemises.set(false)),
                takeUntilDestroyed(this.destroyRef)
            )
            .subscribe({
                next: (res) => this.remises.set((res?.data ?? []).filter((r) => r.btEnabled)),
                error: () => this.remises.set([])
            });
    }

    choisirRemise(remise: Remise | null | undefined) {
        // p-select émet null au clear ; on normalise en null = « sans remise ».
        this.remiseChoisie.set(remise ?? null);
    }

    genererDevis() {
        const idCampagne = this.campagne()?.id;
        if (!idCampagne) return;
        this.isDevisLoading.set(true);
        this.devisService
            .addDevis(idCampagne, this.remiseChoisie()?.id)
            .pipe(
                finalize(() => this.isDevisLoading.set(false)),
                takeUntilDestroyed(this.destroyRef)
            )
            .subscribe({
                next: () => {
                    this.showDevisDrawer.set(false);
                    this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Devis généré avec succès.' });
                    this.loadData(idCampagne);
                },
                error: () => {
                    this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Une erreur est survenue. Veuillez réessayer.' });
                }
            });
    }

    // --- Factures ---

    ouvrirFactureDrawer() {
        this.remiseFacture.set(null);
        this.showFactureDrawer.set(true);
        if (this.remises().length === 0) this.loadRemises();
    }

    choisirRemiseFacture(remise: Remise | null | undefined) {
        this.remiseFacture.set(remise ?? null);
    }

    genererFacture() {
        const idCampagne = this.campagne()?.id;
        if (!idCampagne) return;
        this.isFactureLoading.set(true);
        this.factureService
            .addFacture(idCampagne, this.remiseFacture()?.id)
            .pipe(
                finalize(() => this.isFactureLoading.set(false)),
                takeUntilDestroyed(this.destroyRef)
            )
            .subscribe({
                next: () => {
                    this.showFactureDrawer.set(false);
                    this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Facture générée avec succès.' });
                    this.loadData(idCampagne);
                },
                error: () => {
                    this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Une erreur est survenue. Veuillez réessayer.' });
                }
            });
    }

    // --- Validation / rejet ---

    onValider() {
        this.confirmationService.confirm({
            message: 'Voulez-vous valider cette campagne ?',
            accept: () => this.callUpdateStatut('validation')
        });
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
        const idCampagne = this.campagne()?.id;
        if (!idCampagne) return;
        this.isActionLoading.set(true);
        this.campagneService
            .updateStatut(idCampagne, type, commentaire)
            .pipe(
                finalize(() => this.isActionLoading.set(false)),
                takeUntilDestroyed(this.destroyRef)
            )
            .subscribe({
                next: () => {
                    const label = type === 'validation' ? 'validée' : 'rejetée';
                    this.messageService.add({ severity: 'success', summary: 'Succès', detail: `Campagne ${label} avec succès.` });
                    this.loadData(idCampagne);
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
        switch (cycle?.toLowerCase()) {
            case 'jour':
                return 'Jour';
            case 'semaine':
                return 'Semaine';
            case 'mois':
                return 'Mois';
            default:
                return cycle ?? '—';
        }
    }

    /** « /semaine », « /mois »… pour libeller le prix unitaire dans la simulation. */
    getCycleUnite(cycle: string | undefined): string {
        switch (cycle?.toLowerCase()) {
            case 'jour':
                return '/jour';
            case 'semaine':
                return '/sem';
            case 'mois':
                return '/mois';
            default:
                return '';
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
