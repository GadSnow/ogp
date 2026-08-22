import { Component, DestroyRef, computed, effect, inject, signal } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomCard } from '@/app/layout/components/ui/customcard';
import { Tag } from 'primeng/tag';
import { TableModule } from 'primeng/table';
import { Select } from 'primeng/select';
import { DatePicker } from 'primeng/datepicker';
import { LineChart, LineChartDataset } from '@/app/layout/components/ui/charts/linechart';
import { subMonths, startOfMonth, format, differenceInCalendarMonths } from 'date-fns';
import { fr } from 'date-fns/locale';
import { finalize } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DashboardOgpService } from '@/app/apps/dashboard-ogp/dashboard-ogp.service';
import { DonutChart, DonutSlice } from '@/app/layout/components/ui/charts/donutchart';
import { FactureService } from '@/app/apps/facture/facture.service';
import { PaiementService } from '@/app/apps/paiement/paiement.service';
import { Facture } from '@/app/apps/facture/facture.types';
import { Paiement } from '@/app/apps/paiement/paiement.types';
import { RouterLink } from '@angular/router';
import { EmptyStateComponent } from '@/app/shared/utils/components/empty-state/empty-state.component';
import { Skeleton } from 'primeng/skeleton';
import { SkeletonTableComponent } from '@/app/shared/utils/components/skeleton-table/skeleton-table.component';
import { SkeletonDonutComponent } from '@/app/shared/utils/components/skeleton-donut/skeleton-donut.component';
import { SkeletonListComponent } from '@/app/shared/utils/components/skeleton-list/skeleton-list.component';

type PeriodValue = 3 | 6 | 12 | 'custom';

type KpiTone = 'info' | 'warn' | 'accent' | 'danger';

interface Kpi {
    label: string;
    value: string;
    icon: string;
    /** Rôle sémantique — la tuile en dérive ses couleurs, en clair comme en sombre. */
    tone: KpiTone;
    hint?: string;
    trend?: { percent: number; increase: boolean };
}

/**
 * Classes littérales : un binding `[class]` objet d'Angular ne gère pas les clés
 * multi-classes (contrairement à ngClass), et Tailwind n'indexe que ce qu'il lit
 * tel quel — d'où ces chaînes complètes plutôt qu'une composition dynamique.
 */
const KPI_TILE_CLASS: Record<KpiTone, string> = {
    info: 'border-info-100 bg-info-50 dark:border-info-500/25 dark:bg-info-500/10',
    warn: 'border-warn-100 bg-warn-50 dark:border-warn-500/25 dark:bg-warn-500/10',
    accent: 'border-accent-200 bg-accent-50 dark:border-accent-500/25 dark:bg-accent-500/10',
    danger: 'border-danger-100 bg-danger-50 dark:border-danger-500/25 dark:bg-danger-500/10'
};

const KPI_ICON_CLASS: Record<KpiTone, string> = {
    info: 'bg-info-500 text-white',
    warn: 'bg-warn-500 text-white',
    accent: 'bg-accent-500 text-accent-950',
    danger: 'bg-danger-500 text-white'
};

interface TopClient {
    denomination: string;
    sigle: string;
    nombreCampagnes: number;
    ca: number;
}

interface RegionRepartition {
    region: string;
    nombrePanneaux: number;
}

interface PanneauStat {
    label: string;
    value: number;
    icon: string;
    iconBg: string;
    valueClass: string;
}

interface ImpayeClient {
    denomination: string;
    sigle: string;
    nombreFactures: number;
    montantFacture: number;
    resteAPayer: number;
}

interface VueGeneraleData {
    tauxOccupation: { totalPanneaux: number; panneauxOccupes: number; panneauxDisponibles: number; tauxOccupation: number };
    chiffreAffairesMois: { moisCourant: number; moisPrecedent: number };
    resteAPayer: { montantActuel: number; montantMoisPrecedent: number };
    campagnesActives: { nombre: number };
    etatParc: { total: number; disponibles: number; occupes: number };
    evolutionCA: { mois: string; montant: number }[];
    panneauxParRegion: { region: string; nombrePanneaux: number }[];
    topClients: TopClient[];
}

interface ImpayesData {
    totalImpaye: number;
    nombreFacturesEnRetard: number;
    nombreSocietesConcernees: number;
    impayesParSociete: ImpayeClient[];
}

@Component({
    selector: 'app-home-dashboard-ogp',
    standalone: true,
    imports: [CommonModule, FormsModule, CustomCard, Tag, TableModule, Select, DatePicker, LineChart, DonutChart, RouterLink, EmptyStateComponent, Skeleton, SkeletonTableComponent, SkeletonDonutComponent, SkeletonListComponent],
    providers: [CurrencyPipe],
    templateUrl: './home.html'
})
export class HomeDashboardOgp {
    private dashboardService = inject(DashboardOgpService);
    private destroyRef = inject(DestroyRef);

    periods = [
        { label: '3 derniers mois', value: 3 },
        { label: '6 derniers mois', value: 6 },
        { label: '12 derniers mois', value: 12 },
        { label: 'Personnalisé', value: 'custom' }
    ];

    selectedPeriod = signal<PeriodValue>(6);
    customRange = signal<Date[] | null>(null);

    monthsCount = computed(() => {
        const period = this.selectedPeriod();
        if (period === 'custom') {
            const range = this.customRange();
            if (range?.[0] && range?.[1]) {
                return Math.max(1, differenceInCalendarMonths(range[1], range[0]) + 1);
            }
            return 6;
        }
        return period;
    });

    private readonly months = computed(() => {
        const n = this.monthsCount();
        return Array.from({ length: n }, (_, i) => startOfMonth(subMonths(new Date(), n - 1 - i)));
    });

    private readonly dateDebut = computed(() => {
        const period = this.selectedPeriod();
        if (period === 'custom') {
            const range = this.customRange();
            if (range?.[0]) return format(range[0], 'yyyy-MM-dd');
        }
        return format(this.months()[0], 'yyyy-MM-dd');
    });

    private readonly dateFin = computed(() => {
        const period = this.selectedPeriod();
        if (period === 'custom') {
            const range = this.customRange();
            if (range?.[1]) return format(range[1], 'yyyy-MM-dd');
        }
        return format(new Date(), 'yyyy-MM-dd');
    });

    private vueGenerale = signal<VueGeneraleData | null>(null);
    private impayesData = signal<ImpayesData | null>(null);

    /** Un drapeau par source : les quatre appels reviennent indépendamment. */
    loadingVueGenerale = signal<boolean>(true);
    loadingImpayes = signal<boolean>(true);
    loadingFactures = signal<boolean>(true);
    loadingPaiements = signal<boolean>(true);

    private factureService = inject(FactureService);
    private paiementService = inject(PaiementService);
    private factures = signal<Facture[]>([]);
    private paiements = signal<Paiement[]>([]);

    /** Nombre de mouvements affichés, transmis en `limit` aux endpoints /dernieres et /derniers. */
    private static readonly RECENTS = 5;

    /** Le backend renvoie déjà les N derniers ; on retrie, l'ordre de la réponse n'étant pas contractuel. */
    private static parDatePlusRecente<T extends { dtCreated?: string }>(items: T[]): T[] {
        return [...items].sort((a, b) => new Date(b.dtCreated ?? 0).getTime() - new Date(a.dtCreated ?? 0).getTime());
    }

    facturesRecentes = computed(() => HomeDashboardOgp.parDatePlusRecente(this.factures()));
    paiementsRecents = computed(() => HomeDashboardOgp.parDatePlusRecente(this.paiements()));

    constructor() {
        this.factureService
            .getDernieresFactures(HomeDashboardOgp.RECENTS)
            .pipe(
                finalize(() => this.loadingFactures.set(false)),
                takeUntilDestroyed(this.destroyRef)
            )
            .subscribe({
                next: (res) => this.factures.set(res?.data ?? []),
                error: (err) => console.error('facture/dernieres - erreur', err)
            });

        this.paiementService
            .getDerniersPaiements(HomeDashboardOgp.RECENTS)
            .pipe(
                finalize(() => this.loadingPaiements.set(false)),
                takeUntilDestroyed(this.destroyRef)
            )
            .subscribe({
                next: (res) => this.paiements.set(res?.data ?? []),
                error: (err) => console.error('paiement/derniers - erreur', err)
            });

        effect(() => {
            const dateDebut = this.dateDebut();
            const dateFin = this.dateFin();

            this.loadingVueGenerale.set(true);
            this.dashboardService
                .getVueGenerale(dateDebut, dateFin)
                .pipe(
                    finalize(() => this.loadingVueGenerale.set(false)),
                    takeUntilDestroyed(this.destroyRef)
                )
                .subscribe({
                    next: (res) => {
                        this.vueGenerale.set(res?.data ?? null);
                    },
                    error: (err) => console.error('dashboard/vue-generale - erreur', err)
                });

            this.loadingImpayes.set(true);
            this.dashboardService
                .getImpayes(dateDebut, dateFin)
                .pipe(
                    finalize(() => this.loadingImpayes.set(false)),
                    takeUntilDestroyed(this.destroyRef)
                )
                .subscribe({
                    next: (res) => {
                        this.impayesData.set(res?.data ?? null);
                    },
                    error: (err) => console.error('dashboard/impayes - erreur', err)
                });
        });
    }

    periodLabel = computed(() => {
        const period = this.selectedPeriod();
        const preset = this.periods.find((p) => p.value === period);
        if (period !== 'custom') return preset?.label ?? '';
        const range = this.customRange();
        if (range?.[0] && range?.[1]) {
            return `${format(range[0], 'dd/MM/yyyy')} – ${format(range[1], 'dd/MM/yyyy')}`;
        }
        return 'Choisir une période';
    });

    private trend(actuel: number, precedent: number): { percent: number; increase: boolean } {
        const percent = precedent === 0 ? (actuel === 0 ? 0 : 100) : Math.round(((actuel - precedent) / precedent) * 100);
        return { percent: Math.abs(percent), increase: actuel >= precedent };
    }

    /**
     * Tuile héro : le chiffre d'affaires est le seul KPI en aplat de marque.
     * L'API ne renvoie que le mois courant et le précédent — le mois est donc nommé
     * explicitement, sinon le chiffre se lirait comme le total de la période choisie.
     */
    caTile = computed(() => {
        const data = this.vueGenerale();
        if (!data) return null;
        return {
            value: this.formatGNF(data.chiffreAffairesMois.moisCourant),
            mois: format(new Date(), 'MMMM yyyy', { locale: fr }),
            trend: this.trend(data.chiffreAffairesMois.moisCourant, data.chiffreAffairesMois.moisPrecedent)
        };
    });

    kpis = computed<Kpi[]>(() => {
        const data = this.vueGenerale();
        if (!data) return [];
        return [
            {
                label: "Taux d'occupation",
                value: `${Math.round(data.tauxOccupation.tauxOccupation)} %`,
                icon: 'pi pi-map',
                tone: 'info',
                hint: `${data.tauxOccupation.panneauxOccupes} panneaux loués sur ${data.tauxOccupation.totalPanneaux}`
            },
            {
                label: 'Reste à payer',
                value: this.formatGNF(data.resteAPayer.montantActuel),
                icon: 'pi pi-exclamation-circle',
                tone: 'warn',
                trend: this.trend(data.resteAPayer.montantActuel, data.resteAPayer.montantMoisPrecedent)
            },
            {
                label: 'Campagnes actives',
                value: `${data.campagnesActives.nombre}`,
                icon: 'pi pi-megaphone',
                tone: 'accent',
                hint: 'En diffusion sur la période'
            }
        ];
    });

    /** Donut « état du parc » — deux parts, le taux d'occupation au centre. */
    parcSlices = computed<DonutSlice[]>(() => {
        const parc = this.vueGenerale()?.etatParc;
        if (!parc) return [];
        return [
            { label: 'Loués', value: parc.occupes },
            { label: 'Disponibles', value: parc.disponibles }
        ];
    });

    tauxOccupation = computed(() => {
        const taux = this.vueGenerale()?.tauxOccupation?.tauxOccupation;
        return taux === undefined ? '' : `${Math.round(taux)} %`;
    });

    regionSlices = computed<DonutSlice[]>(() => this.enParts(this.repartitionRegions().map((r) => ({ label: r.region, value: r.nombrePanneaux })), 'Autres régions'));

    totalPanneauxRegions = computed(() => this.regionSlices().reduce((sum, s) => sum + s.value, 0));

    formatUnites = (value: number): string => `${value}`;

    /**
     * Agrège la queue de distribution : au-delà de cinq parts, la palette
     * catégorielle n'a plus de pas distinguables.
     */
    private enParts(items: { label: string; value: number }[], resteLabel: string): DonutSlice[] {
        const tries = [...items].filter((i) => i.value > 0).sort((a, b) => b.value - a.value);
        if (tries.length <= 5) return tries;
        const tete = tries.slice(0, 4);
        const reste = tries.slice(4).reduce((sum, i) => sum + i.value, 0);
        return [...tete, { label: resteLabel, value: reste }];
    }

    clientsSlices = computed<DonutSlice[]>(() =>
        this.enParts(
            this.topClients().map((c) => ({ label: c.sigle || c.denomination, value: c.ca })),
            'Autres clients'
        )
    );

    totalCaClients = computed(() => this.clientsSlices().reduce((sum, s) => sum + s.value, 0));

    impayesSlices = computed<DonutSlice[]>(() =>
        this.enParts(
            this.impayesParClient().map((c) => ({ label: c.sigle || c.denomination, value: c.resteAPayer })),
            'Autres sociétés'
        )
    );

    tileClass(tone: KpiTone): string {
        return KPI_TILE_CLASS[tone];
    }

    iconClass(tone: KpiTone): string {
        return KPI_ICON_CLASS[tone];
    }

    topClients = computed<TopClient[]>(() => this.vueGenerale()?.topClients ?? []);

    panneauxStats = computed<PanneauStat[]>(() => {
        const parc = this.vueGenerale()?.etatParc;
        if (!parc) return [];
        return [
            { label: 'Total panneaux', value: parc.total, icon: 'pi pi-map', iconBg: 'bg-surface-100 text-surface-600', valueClass: 'text-surface-800' },
            { label: 'Disponibles', value: parc.disponibles, icon: 'pi pi-check-circle', iconBg: 'bg-green-100 text-green-600', valueClass: 'text-green-600' },
            { label: 'Indisponibles', value: parc.occupes, icon: 'pi pi-times-circle', iconBg: 'bg-red-100 text-red-600', valueClass: 'text-red-600' }
        ];
    });

    repartitionRegions = computed<RegionRepartition[]>(() => this.vueGenerale()?.panneauxParRegion ?? []);

    impayesParClient = computed<ImpayeClient[]>(() => [...(this.impayesData()?.impayesParSociete ?? [])].sort((a, b) => b.resteAPayer - a.resteAPayer));

    totalImpaye = computed(() => this.impayesData()?.totalImpaye ?? 0);
    totalFacturesEnRetard = computed(() => this.impayesData()?.nombreFacturesEnRetard ?? 0);
    nombreSocietesConcernees = computed(() => this.impayesData()?.nombreSocietesConcernees ?? 0);

    caLineDatasets = computed<LineChartDataset[]>(() => [
        {
            label: "Chiffre d'affaires",
            data: (this.vueGenerale()?.evolutionCA ?? []).map((e) => ({ x: `${e.mois}-01`, y: e.montant }))
        }
    ]);

    caLineLabels = computed(() => (this.vueGenerale()?.evolutionCA ?? []).map((e) => `${e.mois}-01`));

    private readonly maxRegionPanneaux = computed(() => Math.max(1, ...this.repartitionRegions().map((r) => r.nombrePanneaux)));

    regionPercent(nombrePanneaux: number): number {
        return Math.round((nombrePanneaux / this.maxRegionPanneaux()) * 100);
    }

    private currencyPipe = inject(CurrencyPipe);

    /** Passe par CurrencyPipe pour que graphiques et tableaux partagent le même format. */
    formatGNF = (value: number): string => this.currencyPipe.transform(value, 'GNF', 'symbol', '1.0-0') ?? '';

    monthFormatter = (value: any) => {
        const date = typeof value === 'string' ? new Date(value) : value;
        return format(date, 'MMM', { locale: fr });
    };
}
