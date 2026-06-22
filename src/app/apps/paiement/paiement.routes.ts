import { Routes } from '@angular/router';
import { HomePaiement } from '@/app/apps/paiement/home/home';
import { AddPaiement } from '@/app/apps/paiement/add/add';
import { DetailPaiement } from '@/app/apps/paiement/detail/detail';

export default [
    {
        path: '',
        component: HomePaiement,
        data: { breadcrumb: 'Paiements' }
    },
    {
        path: 'add',
        component: AddPaiement,
        data: { breadcrumb: 'Ajouter un paiement' }
    },
    {
        path: 'detail/:id',
        component: DetailPaiement,
        data: { breadcrumb: 'Détail du paiement' }
    }
] as Routes;
