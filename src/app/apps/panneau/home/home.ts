import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { PanneauService } from '@/app/apps/panneau/panneau.service';
import { LocalisationFiltre, Panneau } from '@/app/apps/panneau/panneau.types';
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
import { CurrencyPipe, DatePipe, DecimalPipe } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FiltreLocalisationComponent } from '@/app/shared/utils/components/filtre-localisation/filtre-localisation.component';

@Component({
    selector: 'app-panneau-home',
    imports: [TableModule, Tag, SkeletonTableComponent, CustomCard, Button, RouterLink, IconFieldModule, InputIconModule, InputText, EmptyStateComponent, Tooltip, FiltreLocalisationComponent, CurrencyPipe, DecimalPipe, DatePipe],
    templateUrl: './home.html',
    styleUrl: './home.scss'
})
export class PanneauHome implements OnInit {
    private panneauService = inject(PanneauService);
    private destroyRef = inject(DestroyRef);

    panneaux = signal<Panneau[]>([]);
    isLoading = signal<boolean>(true);

    /** Vrai dès qu'un niveau géographique est posé : distingue « rien en base » de « rien dans cette zone ». */
    filtreActif = signal<boolean>(false);

    ngOnInit() {
        this.chargerTous();
    }

    /**
     * Filtre géographique : sans aucun niveau renseigné on recharge l'inventaire
     * complet, sinon on interroge /panneau/getbylocalisation.
     */
    surFiltreLocalisation(filtre: LocalisationFiltre): void {
        const actif = !!(filtre.idRegion || filtre.idCommune || filtre.idQuartier || filtre.idSecteur);
        this.filtreActif.set(actif);

        if (!actif) {
            this.chargerTous();
            return;
        }

        this.isLoading.set(true);
        this.panneauService
            .getByLocalisation(filtre)
            .pipe(
                finalize(() => this.isLoading.set(false)),
                takeUntilDestroyed(this.destroyRef)
            )
            .subscribe({
                next: (response: ApiResponse<Panneau[]>) => this.panneaux.set(response?.data ?? []),
                error: () => this.panneaux.set([])
            });
    }

    private chargerTous(): void {
        this.isLoading.set(true);
        this.panneauService
            .getPanneaux()
            .pipe(
                finalize(() => this.isLoading.set(false)),
                takeUntilDestroyed(this.destroyRef)
            )
            .subscribe({
                next: (response: ApiResponse<Panneau[]>) => this.panneaux.set(response?.data ?? []),
                error: () => this.panneaux.set([])
            });
    }

    /** Région du panneau : la ligne de tête de la colonne Localisation. */
    region(panneau: Panneau): string {
        return panneau.secteur?.quartier?.commune?.region?.region ?? '';
    }

    /**
     * « Commune · Quartier · Secteur » : le détail affiché sous la région.
     * Les niveaux absents sont omis, un panneau sans quartier afficherait sinon des
     * séparateurs orphelins.
     */
    lieuDetail(panneau: Panneau): string {
        const secteur = panneau.secteur;
        return [secteur?.quartier?.commune?.commune, secteur?.quartier?.quartier, secteur?.secteur].filter(Boolean).join(' · ');
    }

    /**
     * « Type (Caractéristique) » ; retombe sur un tiret plutôt que d'afficher des
     * parenthèses vides quand la fiche technique est incomplète.
     */
    ficheTechnique(panneau: Panneau): string {
        const carac = panneau.caracteristiquePanneaux;
        if (!carac?.type && !carac?.caracteristique) return '—';
        return carac.caracteristique ? `${carac.type} (${carac.caracteristique})` : carac.type;
    }

    /** « Catégorie · dimension · L × l » : le détail technique secondaire, niveaux absents omis. */
    detailTechnique(panneau: Panneau): string {
        const carac = panneau.caracteristiquePanneaux;
        if (!carac) return '';
        const dimensions = carac.longeur && carac.largeur ? `${carac.longeur} × ${carac.largeur} m` : null;
        return [carac.categoriePanneaux?.categorie, carac.dimenssion ? `${carac.dimenssion} m` : null, dimensions].filter(Boolean).join(' · ');
    }
}
