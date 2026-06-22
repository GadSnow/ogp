import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AppMenuitem } from './app.menuitem';

@Component({
    selector: '[app-menu]',
    standalone: true,
    imports: [CommonModule, AppMenuitem, RouterModule],
    template: `<ul class="layout-menu">
        @for (item of model; track $index) {
            @if (!item.separator) {
                <li app-menuitem [item]="item" [root]="true"></li>
            } @else {
                <li class="menu-separator"></li>
            }
        }
    </ul> `
})
export class AppMenu {
    model: any[] = [
        {
            label: 'Tableau de bord',
            icon: 'pi pi-fw pi-chart-bar',
            path: '/ogp/dashboard',
            items: [
                {
                    label: 'Tableau de bord',
                    icon: 'pi pi-fw pi-chart-bar',
                    routerLink: ['/ogp/dashboard']
                }
            ]
        },
        { separator: true },
        {
            label: 'Opérations',
            icon: 'pi pi-fw pi-briefcase',
            items: [
                {
                    label: "Client",
                    icon: 'pi pi-fw pi-users',
                    routerLink: ['/ogp/client']
                },
                {
                    label: "Panneau",
                    icon: 'pi pi-fw pi-map',
                    routerLink: ['/ogp/panneau']
                },
                {
                    label: "Événement",
                    icon: 'pi pi-fw pi-calendar-plus',
                    routerLink: ['/ogp/evenement']
                },
                {
                    label: "Campagne",
                    icon: 'pi pi-fw pi-megaphone',
                    routerLink: ['/ogp/campagne']
                },
                {
                    label: "Devis",
                    icon: 'pi pi-fw pi-file-edit',
                    routerLink: ['/ogp/devis']
                },
                {
                    label: "Facture",
                    icon: 'pi pi-fw pi-receipt',
                    routerLink: ['/ogp/facture']
                },
                {
                    label: "Paiement",
                    icon: 'pi pi-fw pi-wallet',
                    routerLink: ['/ogp/paiement']
                }
            ]
        },
        { separator: true },
        {
            label: 'Configuration',
            icon: 'pi pi-fw pi-cog',
            items: [
                {
                    label: "Catégorie panneaux",
                    icon: 'pi pi-fw pi-table',
                    routerLink: ['/ogp/categorie-panneaux']
                },
                {
                    label: "Caractéristiques",
                    icon: 'pi pi-fw pi-table',
                    routerLink: ['/ogp/caracteristique-panneaux']
                },
                {
                    label: "Type d'évènement",
                    icon: 'pi pi-fw pi-calendar',
                    routerLink: ['/ogp/type-evenement']
                },
                {
                    label: "Type client",
                    icon: 'pi pi-fw pi-users',
                    routerLink: ['/ogp/type-client']
                },
                {
                    label: "Mode de paiement",
                    icon: 'pi pi-fw pi-credit-card',
                    routerLink: ['/ogp/mode-paiement']
                },
                {
                    label: "Tarif",
                    icon: 'pi pi-fw pi-money-bill',
                    routerLink: ['/ogp/tarif']
                },
                {
                    label: "Remise",
                    icon: 'pi pi-fw pi-percentage',
                    routerLink: ['/ogp/remise']
                }
            ]
        },
        { separator: true },
        {
            label: 'Localisation',
            icon: 'pi pi-fw pi-map-marker',
            items: [
                {
                    label: "Region",
                    icon: 'pi pi-fw pi-map',
                    routerLink: ['/ogp/region']
                },
                {
                    label: "Commune",
                    icon: 'pi pi-fw pi-map-marker',
                    routerLink: ['/ogp/commune']
                },
                {
                    label: "Quartier",
                    icon: 'pi pi-fw pi-map-marker',
                    routerLink: ['/ogp/quartier']
                },
                {
                    label: "Secteur",
                    icon: 'pi pi-fw pi-briefcase',
                    routerLink: ['/ogp/secteur']
                }
            ]
        },
        { separator: true },
        {
            label: 'Administration',
            icon: 'pi pi-fw pi-shield',
            items: [
                {
                    label: "Profils",
                    icon: 'pi pi-fw pi-id-card',
                    routerLink: ['/ogp/profils']
                },
                {
                    label: "Utilisateurs",
                    icon: 'pi pi-fw pi-user',
                    routerLink: ['/ogp/users']
                }
            ]
        },

    ];
}
