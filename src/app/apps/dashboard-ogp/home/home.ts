import { Component, DestroyRef, computed, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomCard } from '@/app/layout/components/ui/customcard';
import { Tag } from 'primeng/tag';
import { TableModule } from 'primeng/table';
import { Select } from 'primeng/select';
import { DatePicker } from 'primeng/datepicker';
import { TabsModule } from 'primeng/tabs';
import { LineChart, LineChartDataset } from '@/app/layout/components/ui/charts/linechart';
import { subMonths, startOfMonth, format, differenceInCalendarMonths } from 'date-fns';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DashboardOgpService } from '@/app/apps/dashboard-ogp/dashboard-ogp.service';

type PeriodValue = 3 | 6 | 12 | 'custom';

interface Kpi {
    label: string;
    value: string;
    icon: string;
    iconBg: string;
    trend?: { percent: number; increase: boolean; text: string };
}

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
    imports: [CommonModule, FormsModule, CustomCard, Tag, TableModule, Select, DatePicker, TabsModule, LineChart],
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

    constructor() {
        effect(() => {
            const dateDebut = this.dateDebut();
            const dateFin = this.dateFin();

            this.dashboardService
                .getVueGenerale(dateDebut, dateFin)
                .pipe(takeUntilDestroyed(this.destroyRef))
                .subscribe({
                    next: (res) => {
                        console.log('dashboard/vue-generale', res);
                        this.vueGenerale.set(res?.data ?? null);
                    },
                    error: (err) => console.error('dashboard/vue-generale - erreur', err)
                });

            this.dashboardService
                .getImpayes(dateDebut, dateFin)
                .pipe(takeUntilDestroyed(this.destroyRef))
                .subscribe({
                    next: (res) => {
                        console.log('dashboard/impayes', res);
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

    private trend(actuel: number, precedent: number): { percent: number; increase: boolean; text: string } {
        const percent = precedent === 0 ? (actuel === 0 ? 0 : 100) : Math.round(((actuel - precedent) / precedent) * 100);
        return { percent: Math.abs(percent), increase: actuel >= precedent, text: 'vs mois dernier' };
    }

    kpis = computed<Kpi[]>(() => {
        const data = this.vueGenerale();
        if (!data) return [];
        return [
            {
                label: "Taux d'occupation des panneaux",
                value: `${Math.round(data.tauxOccupation.tauxOccupation)}%`,
                icon: 'pi pi-map',
                iconBg: 'bg-blue-100 text-blue-600'
            },
            {
                label: 'Chiffre d\'affaires du mois',
                value: this.formatGNF(data.chiffreAffairesMois.moisCourant),
                icon: 'pi pi-wallet',
                iconBg: 'bg-green-100 text-green-600',
                trend: this.trend(data.chiffreAffairesMois.moisCourant, data.chiffreAffairesMois.moisPrecedent)
            },
            {
                label: 'Reste à payer',
                value: this.formatGNF(data.resteAPayer.montantActuel),
                icon: 'pi pi-exclamation-circle',
                iconBg: 'bg-amber-100 text-amber-600',
                trend: this.trend(data.resteAPayer.montantActuel, data.resteAPayer.montantMoisPrecedent)
            },
            {
                label: 'Campagnes actives',
                value: `${data.campagnesActives.nombre}`,
                icon: 'pi pi-megaphone',
                iconBg: 'bg-purple-100 text-purple-600'
            }
        ];
    });

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

    formatGNF(value: number): string {
        return `${value.toLocaleString('fr-FR')} GNF`;
    }

    monthFormatter = (value: any) => {
        const date = typeof value === 'string' ? new Date(value) : value;
        return format(date, 'MMM');
    };
}
