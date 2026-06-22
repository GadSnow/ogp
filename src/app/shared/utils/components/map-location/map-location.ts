import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild, computed, input } from '@angular/core';
import * as L from 'leaflet';

@Component({
    selector: 'app-map-location',
    standalone: true,
    template: `<div #mapEl class="map-location" [style.height]="height()"></div>`,
    styles: [
        `
            .map-location {
                width: 100%;
                border-radius: 0.75rem;
                overflow: hidden;
                z-index: 0;
            }
        `
    ]
})
export class MapLocation implements AfterViewInit, OnDestroy {
    @ViewChild('mapEl') mapEl!: ElementRef<HTMLDivElement>;

    latitude = input.required<number>();
    longitude = input.required<number>();
    zoom = input<number>(15);
    height = input<string>('20rem');
    label = input<string>('');

    private map: L.Map | null = null;

    private readonly pinIcon = L.divIcon({
        className: 'map-location-pin',
        html: `<div class="map-location-pin-dot"></div>`,
        iconSize: [22, 22],
        iconAnchor: [11, 11]
    });

    private readonly position = computed<L.LatLngExpression>(() => [this.latitude(), this.longitude()]);

    ngAfterViewInit() {
        this.map = L.map(this.mapEl.nativeElement, {
            center: this.position(),
            zoom: this.zoom(),
            scrollWheelZoom: false
        });

        L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; OpenStreetMap &copy; CARTO',
            maxZoom: 20
        }).addTo(this.map);

        L.marker(this.position(), { icon: this.pinIcon }).addTo(this.map).bindPopup(this.label() || 'Emplacement du panneau');
    }

    ngOnDestroy() {
        this.map?.remove();
    }
}
