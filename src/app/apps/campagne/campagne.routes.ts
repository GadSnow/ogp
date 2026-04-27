import { Routes } from '@angular/router';
import { HomeCampagne } from '@/app/apps/campagne/home/home';
import { AddCampagne } from '@/app/apps/campagne/add/add';
import { EditCampagne } from '@/app/apps/campagne/edit/edit';
import { DetailCampagne } from '@/app/apps/campagne/detail/detail';

export default [
    {
        path: '',
        component: HomeCampagne,
        data: { breadcrumb: "Liste des campagnes" }
    },
    {
        path: 'add',
        component: AddCampagne,
        data: { breadcrumb: "Ajouter une campagne" }
    },
    {
        path: 'edit/:id',
        component: EditCampagne,
        data: { breadcrumb: "Modifier la campagne" }
    },
    {
        path: 'detail/:id',
        component: DetailCampagne,
        data: { breadcrumb: "Détail de la campagne" }
    }
] as Routes;
