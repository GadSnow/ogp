import { Routes } from '@angular/router';
import { PanneauHome } from '@/app/apps/panneau/home/home';
import { AddPanneau } from '@/app/apps/panneau/add/add';
import { EditPanneau } from '@/app/apps/panneau/edit/edit';
import { DetailsPanneau } from '@/app/apps/panneau/details/details';

export default [
    {
        path: '',
        component: PanneauHome,
        data: { breadcrumb: "Panneau" }
    },
    {
        path: 'add',
        component: AddPanneau,
        data: { breadcrumb: "Ajouter" }
    },
    {
        path: 'edit/:id',
        component: EditPanneau,
        data: { breadcrumb: "Modifier" }
    },
    {
        path: 'details/:id',
        component: DetailsPanneau,
        data: { breadcrumb: "Détails" }
    }
] as Routes;
