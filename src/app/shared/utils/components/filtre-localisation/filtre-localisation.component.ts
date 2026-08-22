import { Component, computed, DestroyRef, inject, OnInit, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize } from 'rxjs';
import { Select } from 'primeng/select';
import { Button } from 'primeng/button';
import { RegionService } from '@/app/apps/region/region.service';
import { CommuneService } from '@/app/apps/commune/commune.service';
import { QuartierService } from '@/app/apps/quartier/quartier.service';
import { SecteurService } from '@/app/apps/secteur/secteur.service';
import { Region } from '@/app/apps/region/region.types';
import { Commune } from '@/app/apps/commune/commune.types';
import { Quartier } from '@/app/apps/quartier/quartier.types';
import { Secteur } from '@/app/apps/secteur/secteur.types';
import { LocalisationFiltre } from '@/app/apps/panneau/panneau.types';

/**
 * Filtre géographique en cascade région → commune → quartier → secteur.
 *
 * Chaque niveau ne charge ses enfants qu'une fois le parent choisi, et remettre
 * un parent à zéro purge les niveaux inférieurs : sans cela on émettrait un
 * couple incohérent (une commune d'une autre région, par exemple).
 *
 * Les niveaux vides sont absents du filtre émis, ce qui correspond exactement
 * aux paramètres optionnels de /panneau/getbylocalisation.
 */
@Component({
    selector: 'app-filtre-localisation',
    imports: [FormsModule, Select, Button],
    template: `
        <div class="rounded-lg border bg-surface-50 dark:bg-surface-800 px-3.5 py-3">
            <div class="flex items-center justify-between gap-3 mb-3">
                <span class="text-xs font-semibold uppercase tracking-wide text-surface-500 dark:text-surface-400">
                    <i class="pi pi-map-marker mr-1.5"></i>Filtrer par localisation
                </span>
                @if (aUnFiltre()) {
                    <p-button label="Réinitialiser" icon="pi pi-times" severity="secondary" size="small" [text]="true" (onClick)="reinitialiser()" />
                }
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <p-select
                    [options]="regions()"
                    [ngModel]="idRegion()"
                    (ngModelChange)="surRegion($event)"
                    optionLabel="region"
                    optionValue="id"
                    placeholder="Région"
                    styleClass="w-full"
                    [filter]="true"
                    filterBy="region"
                    [showClear]="true"
                    [loading]="chargementRegions()"
                />

                <p-select
                    [options]="communes()"
                    [ngModel]="idCommune()"
                    (ngModelChange)="surCommune($event)"
                    optionLabel="commune"
                    optionValue="id"
                    placeholder="Commune"
                    styleClass="w-full"
                    [filter]="true"
                    filterBy="commune"
                    [showClear]="true"
                    [loading]="chargementCommunes()"
                    [disabled]="!idRegion()"
                />

                <p-select
                    [options]="quartiers()"
                    [ngModel]="idQuartier()"
                    (ngModelChange)="surQuartier($event)"
                    optionLabel="quartier"
                    optionValue="id"
                    placeholder="Quartier"
                    styleClass="w-full"
                    [filter]="true"
                    filterBy="quartier"
                    [showClear]="true"
                    [loading]="chargementQuartiers()"
                    [disabled]="!idCommune()"
                />

                <p-select
                    [options]="secteurs()"
                    [ngModel]="idSecteur()"
                    (ngModelChange)="surSecteur($event)"
                    optionLabel="secteur"
                    optionValue="id"
                    placeholder="Secteur"
                    styleClass="w-full"
                    [filter]="true"
                    filterBy="secteur"
                    [showClear]="true"
                    [loading]="chargementSecteurs()"
                    [disabled]="!idQuartier()"
                />
            </div>
        </div>
    `
})
export class FiltreLocalisationComponent implements OnInit {
    private regionService = inject(RegionService);
    private communeService = inject(CommuneService);
    private quartierService = inject(QuartierService);
    private secteurService = inject(SecteurService);
    private destroyRef = inject(DestroyRef);

    /** Émis à chaque changement de l'un des quatre niveaux. */
    filtreChange = output<LocalisationFiltre>();

    regions = signal<Region[]>([]);
    communes = signal<Commune[]>([]);
    quartiers = signal<Quartier[]>([]);
    secteurs = signal<Secteur[]>([]);

    chargementRegions = signal<boolean>(false);
    chargementCommunes = signal<boolean>(false);
    chargementQuartiers = signal<boolean>(false);
    chargementSecteurs = signal<boolean>(false);

    idRegion = signal<string | null>(null);
    idCommune = signal<string | null>(null);
    idQuartier = signal<string | null>(null);
    idSecteur = signal<string | null>(null);

    aUnFiltre = computed<boolean>(() => !!(this.idRegion() || this.idCommune() || this.idQuartier() || this.idSecteur()));

    ngOnInit(): void {
        this.chargementRegions.set(true);
        this.regionService
            .getRegions()
            .pipe(
                finalize(() => this.chargementRegions.set(false)),
                takeUntilDestroyed(this.destroyRef)
            )
            .subscribe({
                next: (res) => this.regions.set(res.data ?? []),
                error: () => this.regions.set([])
            });
    }

    surRegion(id: string | null): void {
        this.idRegion.set(id ?? null);
        this.idCommune.set(null);
        this.idQuartier.set(null);
        this.idSecteur.set(null);
        this.communes.set([]);
        this.quartiers.set([]);
        this.secteurs.set([]);

        if (id) {
            this.chargementCommunes.set(true);
            this.communeService
                .getCommunesByRegion(id)
                .pipe(
                    finalize(() => this.chargementCommunes.set(false)),
                    takeUntilDestroyed(this.destroyRef)
                )
                .subscribe({
                    next: (res) => this.communes.set(res.data ?? []),
                    error: () => this.communes.set([])
                });
        }
        this.emettre();
    }

    surCommune(id: string | null): void {
        this.idCommune.set(id ?? null);
        this.idQuartier.set(null);
        this.idSecteur.set(null);
        this.quartiers.set([]);
        this.secteurs.set([]);

        if (id) {
            this.chargementQuartiers.set(true);
            this.quartierService
                .getQuartiersByCommune(id)
                .pipe(
                    finalize(() => this.chargementQuartiers.set(false)),
                    takeUntilDestroyed(this.destroyRef)
                )
                .subscribe({
                    next: (res) => this.quartiers.set(res.data ?? []),
                    error: () => this.quartiers.set([])
                });
        }
        this.emettre();
    }

    surQuartier(id: string | null): void {
        this.idQuartier.set(id ?? null);
        this.idSecteur.set(null);
        this.secteurs.set([]);

        if (id) {
            this.chargementSecteurs.set(true);
            this.secteurService
                .getSecteursByQuartier(id)
                .pipe(
                    finalize(() => this.chargementSecteurs.set(false)),
                    takeUntilDestroyed(this.destroyRef)
                )
                .subscribe({
                    next: (res) => this.secteurs.set(res.data ?? []),
                    error: () => this.secteurs.set([])
                });
        }
        this.emettre();
    }

    surSecteur(id: string | null): void {
        this.idSecteur.set(id ?? null);
        this.emettre();
    }

    reinitialiser(): void {
        this.idRegion.set(null);
        this.idCommune.set(null);
        this.idQuartier.set(null);
        this.idSecteur.set(null);
        this.communes.set([]);
        this.quartiers.set([]);
        this.secteurs.set([]);
        this.emettre();
    }

    private emettre(): void {
        this.filtreChange.emit({
            idRegion: this.idRegion() ?? undefined,
            idCommune: this.idCommune() ?? undefined,
            idQuartier: this.idQuartier() ?? undefined,
            idSecteur: this.idSecteur() ?? undefined
        });
    }
}
