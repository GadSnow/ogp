import { Routes } from '@angular/router';
import { CommuneHome } from '@/app/apps/commune/home/home';
import { AddCommune } from '@/app/apps/commune/add/add';
import { EditCommune } from '@/app/apps/commune/edit/edit';

export default [
    {
        path: '',
        component: CommuneHome,
        data: { breadcrumb: "Commune" }
    },
    {
        path: 'add',
        component: AddCommune,
        data: { breadcrumb: "Ajouter une commune" }
    },
    {
        path: 'edit/:id',
        component: EditCommune,
        data: { breadcrumb: "Modifier une commune" }
    }
] as Routes;
