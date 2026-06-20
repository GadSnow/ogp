import { Routes } from '@angular/router';
import { HomeFacture } from '@/app/apps/facture/home/home';

export default [
    {
        path: '',
        component: HomeFacture,
        data: { breadcrumb: 'Factures' }
    }
] as Routes;
