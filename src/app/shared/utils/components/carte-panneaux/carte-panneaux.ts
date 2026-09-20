/* Carte Leaflet multi-panneaux : place un marqueur par panneau géolocalisé,
   avec infobulle au survol et popup détaillée au clic. Réutilisée à la fois
   dans la liste (modal « Carte des panneaux ») et dans la fiche d'un panneau. */

import { AfterViewInit, Component, EffectRef, ElementRef, OnDestroy, ViewChild, effect, input, output, signal } from '@angular/core';
import * as L from 'leaflet';
import { Panneau } from '@/app/apps/panneau/panneau.types';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputText } from 'primeng/inputtext';

/** Centre de la Guinée : utilisé quand aucun panneau n'a de coordonnées. */
const CENTRE_GUINEE: L.LatLngExpression = [9.9456, -9.6966];
/** Zoom par défaut = celui obtenu en appuyant une fois sur « + » au niveau du pays. */
const ZOOM_GUINEE = 7;
/** Zoom minimum : empêche de dézoomer au point de sortir du cadre de la Guinée. */
const ZOOM_MIN_GUINEE = 6;
/** Zoom max lors du recadrage automatique sur les marqueurs. */
const ZOOM_MAX_FIT = 11;
/** Cadre de la Guinée ([sud-ouest, nord-est]) : la vue reste confinée au pays. */
const BORNES_GUINEE: L.LatLngBoundsExpression = [
    [6.95, -15.5],
    [13.1, -7.4]
];

@Component({
    selector: 'app-carte-panneaux',
    standalone: true,
    imports: [IconFieldModule, InputIconModule, InputText],
    template: `
        @if (afficherRecherche()) {
        <div class="carte-panneaux-recherche">
            <p-iconfield class="w-full">
                <p-inputicon class="pi pi-search" />
                <input pInputText type="text" class="w-full" placeholder="Rechercher par référence…" (input)="onRecherche($event)" />
            </p-iconfield>
        </div>
        }
        <div #mapEl class="carte-panneaux" [style.height]="height()"></div>
    `,
    styles: [
        `
            .carte-panneaux-recherche {
                display: flex;
                align-items: center;
                padding: 0.5rem 0.5rem 0.6rem;
            }

            .carte-panneaux {
                width: 100%;
                border-radius: 0.75rem;
                overflow: hidden;
                z-index: 0;
            }
        `
    ]
})
export class CartePanneaux implements AfterViewInit, OnDestroy {
    @ViewChild('mapEl') mapEl!: ElementRef<HTMLDivElement>;

    panneaux = input.required<Panneau[]>();
    height = input<string>('30rem');
    /** Affiche le bouton « Voir le détail » dans la popup (masqué dans la fiche panneau). */
    afficherLienDetail = input<boolean>(true);
    /** Affiche la barre de recherche par référence au-dessus de la carte. */
    afficherRecherche = input<boolean>(false);
    /** Recadrage par défaut : colle le paysage puis recentre légèrement. */
    defautZoomPaysage = input<'rapprocher' | 'eloigner'>('rapprocher');
    /** Dézoom appliqué après le recadrage automatique (valeurs plus grandes = vue plus large). */
    ajustementZoom = input<number>(-0.9);
    /** Marge (px) autour des marqueurs lors du recadrage auto : plus elle est petite, plus la vue est serrée. */
    paddingFit = input<number>(36);
    /** Zoom initial quand aucun panneau n'a de coordonnées (défaut : niveau du pays). */
    zoomInitial = input<number>(ZOOM_GUINEE);
    /** Zoom minimum autorisé : empêche de sortir du cadre de la Guinée. */
    zoomMin = input<number>(ZOOM_MIN_GUINEE);
    /** Zoom max lors du recadrage automatique sur les marqueurs. */
    zoomMaxFit = input<number>(ZOOM_MAX_FIT);

    /** Filtre courant de la recherche par référence. */
    recherche = signal('');

    voirDetail = output<Panneau>();

    private map: L.Map | null = null;
    private marqueurs: L.Marker[] = [];
    private effectInit: EffectRef | null = null;
    private resizeObserver: ResizeObserver | null = null;

    constructor() {
        this.effectInit = effect(() => {
            /* Lecture des signaux au niveau racine pour que l'effet en dépende
               même quand la carte n'est pas encore initialisée : les changements
               de panneaux ou de recherche re-déclenchent bien la mise à jour. */
            this.panneaux();
            this.recherche();
            if (this.map) this.renderMarqueurs();
        });
    }

    ngAfterViewInit() {
        this.map = L.map(this.mapEl.nativeElement, {
            center: CENTRE_GUINEE,
            zoom: this.zoomInitial(),
            minZoom: this.zoomMin(),
            maxBounds: BORNES_GUINEE,
            maxBoundsViscosity: 1,
            /* Permet les niveaux de zoom fractionnaires (pas de 0.05). */
            zoomSnap: 0.05,
            scrollWheelZoom: false
        });

        /** Plan OpenStreetMap : seule couche affichée. */
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: 19
        }).addTo(this.map);

        /* La carte peut être initialisée dans un conteneur encore non dimensionné
           (modal, drawer, requête sortie avant affichage…) : Leaflet calcule alors
           une taille erronée et tuiles/marqueurs restent invisibles ou mal placés
           tant qu'on ne redimensionne pas. Un ResizeObserver + un premier
           invalidateSize d'un tick corrigent cela automatiquement. */
        this.resizeObserver = new ResizeObserver(() => this.map?.invalidateSize());
        this.resizeObserver.observe(this.mapEl.nativeElement);
        setTimeout(() => this.map?.invalidateSize(), 0);

        this.renderMarqueurs();
    }

    ngOnDestroy() {
        this.resizeObserver?.disconnect();
        this.effectInit?.destroy();
        this.map?.remove();
    }

    /** Recadre la carte quand son conteneur change de taille ou devient visible
        (appelé notamment à l'ouverture du modal de la liste). */
    rafraichirTaille(): void {
        if (!this.map) return;
        this.map.invalidateSize();
        this.renderMarqueurs();
    }

    /** Saisie de recherche : filtre les marqueurs par référence (insensible à la casse). */
    onRecherche(event: Event): void {
        this.recherche.set((event.target as HTMLInputElement).value);
    }

    /** Index visible pour la pin (numérotation 1..n, parmi les panneaux filtrés). */
    private numPanneau(index: number): string {
        return String(index + 1);
    }

    private renderMarqueurs(): void {
        if (!this.map) return;

        this.marqueurs.forEach((m) => m.remove());
        this.marqueurs = [];

        const filtre = this.recherche().trim().toLowerCase();
        const panneauxGeolocalises = this.panneaux().filter(
            (p) =>
                p.latitude != null &&
                p.longitude != null &&
                (filtre === '' || (p.reference ?? '').toLowerCase().includes(filtre))
        );

        if (panneauxGeolocalises.length === 0) {
            this.map.setView(CENTRE_GUINEE, this.zoomInitial());
            return;
        }

        const positions: L.LatLngExpression[] = [];

        panneauxGeolocalises.forEach((panneau, index) => {
            const pos: L.LatLngExpression = [panneau.latitude!, panneau.longitude!];
            positions.push(pos);

            const icon = L.divIcon({
                className: 'carte-panneaux-pin-wrap',
                html: `<div class="carte-panneaux-pin">${this.numPanneau(index)}</div>`,
                iconSize: [22, 22],
                iconAnchor: [11, 11]
            });

            const marker = L.marker(pos, { icon });
            marker.bindTooltip(panneau.reference, { direction: 'top', offset: [0, -14], opacity: 1, className: 'carte-panneaux-tooltip' });
            marker.bindPopup(this.popupHtml(panneau), {
                maxWidth: 300,
                closeButton: true,
                className: 'carte-panneaux-popup'
            });

            if (this.afficherLienDetail()) {
                marker.on('popupopen', () => this.activerLienDetail(marker, panneau));
            }

            marker.addTo(this.map!);
            this.marqueurs.push(marker);
        });

        this.map.fitBounds(L.latLngBounds(positions), {
            padding: [this.paddingFit(), this.paddingFit()],
            maxZoom: this.zoomMaxFit()
        });

        /* Après fitBounds : ajustement selon l'usage. Valeur positive = rapprochement
           (plafonné au zoom max de recadrage), négative = dézoom (plancher Guinée). */
        const zoomAjuste = this.map.getZoom() + this.ajustementZoom();
        const zoomBorne =
            this.ajustementZoom() >= 0
                ? Math.min(zoomAjuste, this.zoomMaxFit())
                : Math.max(zoomAjuste, this.zoomMin());
        this.map.setZoom(zoomBorne);
    }

    /** Câble le bouton « Voir le détail » injecté dans le DOM du popup. */
    private activerLienDetail(marker: L.Marker, panneau: Panneau): void {
        const bouton = marker.getPopup()?.getElement()?.querySelector<HTMLAnchorElement>('.carte-panneaux-popup-btn');
        if (!bouton) return;
        bouton.addEventListener('click', (e) => {
            e.preventDefault();
            this.map?.closePopup();
            this.voirDetail.emit(panneau);
        });
    }

    /** HTML du popup Leaflet (CSS global, voir assets/tailwind.css). */
    private popupHtml(panneau: Panneau): string {
        const type = panneau.caracteristiquePanneaux?.type ?? '';
        const categorie = panneau.caracteristiquePanneaux?.categoriePanneaux?.categorie ?? '';
        const localisation = [panneau.secteur?.quartier?.commune?.region?.region, panneau.secteur?.quartier?.commune?.commune, panneau.secteur?.quartier?.quartier, panneau.secteur?.secteur].filter(Boolean).join(' · ');
        const prixJour = (panneau.priceDay ?? 0).toLocaleString('fr-FR');

        return `
            <div class="carte-panneaux-popup-title">
                <span class="carte-panneaux-popup-ref">#${panneau.reference}</span>
                <span class="carte-panneaux-popup-badge ${panneau.btValide ? 'carte-panneaux-popup-badge-ok' : 'carte-panneaux-popup-badge-ko'}">${panneau.btValide ? 'Validé' : 'Non validé'}</span>
            </div>
            <div class="carte-panneaux-popup-body">
                ${panneau.regies ? `<div class="carte-panneaux-popup-row"><span class="carte-panneaux-popup-label">Régie</span>${panneau.regies.denomination}</div>` : ''}
                ${localisation ? `<div class="carte-panneaux-popup-row"><span class="carte-panneaux-popup-label">Localisation</span>${localisation}</div>` : ''}
                ${type || categorie ? `<div class="carte-panneaux-popup-row"><span class="carte-panneaux-popup-label">Type</span>${[type, categorie].filter(Boolean).join(' · ')}</div>` : ''}
                <div class="carte-panneaux-popup-row"><span class="carte-panneaux-popup-label">Faces</span>${panneau.nombreFace} face${panneau.nombreFace > 1 ? 's' : ''} · ${panneau.face}</div>
                <div class="carte-panneaux-popup-row"><span class="carte-panneaux-popup-label">Prix</span>${prixJour} GNF / jour</div>
            </div>
            ${this.afficherLienDetail() ? '<a href="#" class="carte-panneaux-popup-btn">Voir le détail</a>' : ''}
        `;
    }
}
