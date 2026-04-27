import { Routes } from '@angular/router';
import { HomeDevis } from '@/app/apps/devis/home/home';
import { AddDevis } from '@/app/apps/devis/add/add';
import { DetailDevis } from '@/app/apps/devis/detail/detail';

export default [
    {
        path: '',
        component: HomeDevis,
        data: { breadcrumb: 'Devis' }
    },
    {
        path: 'add',
        component: AddDevis,
        data: { breadcrumb: 'Nouveau Devis' }
    },
    {
        path: 'detail/:id',
        component: DetailDevis,
        data: { breadcrumb: 'Détail' }
    }
] as Routes;
