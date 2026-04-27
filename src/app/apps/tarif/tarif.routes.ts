import { Routes } from '@angular/router';
import { TarifHome } from '@/app/apps/tarif/home/home';
import { AddTarif } from '@/app/apps/tarif/add/add';
import { EditTarif } from '@/app/apps/tarif/edit/edit';

export default [
    {
        path: '',
        component: TarifHome,
        data: { breadcrumb: "Tarif" }
    },
    {
        path: 'add',
        component: AddTarif,
        data: { breadcrumb: "Ajouter" }
    },
    {
        path: 'edit/:id',
        component: EditTarif,
        data: { breadcrumb: "Modifier" }
    }
] as Routes;
