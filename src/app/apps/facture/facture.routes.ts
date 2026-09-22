import { Routes } from '@angular/router';
import { HomeFacture } from '@/app/apps/facture/home/home';

export default [
    {
        path: '',
        component: HomeFacture,
        data: { breadcrumb: 'Factures' }
    },
    {
        path: 'add',
        loadComponent: () => import('@/app/apps/facture/add/add').then((c) => c.AddFacture),
        data: { breadcrumb: 'Facture de redevance' }
    }
] as Routes;
