import { Routes } from '@angular/router';
import { EvenementHome } from '@/app/apps/evenement/home/home';
import { AddEvenement } from '@/app/apps/evenement/add/add';
import { EditEvenement } from '@/app/apps/evenement/edit/edit';
import { DetailEvenement } from '@/app/apps/evenement/detail/detail';

export default [
    {
        path: '',
        component: EvenementHome,
        data: { breadcrumb: "Événement" }
    },
    {
        path: 'add',
        component: AddEvenement,
        data: { breadcrumb: "Ajouter" }
    },
    {
        path: 'edit/:id',
        component: EditEvenement,
        data: { breadcrumb: "Modifier" }
    },
    {
        path: 'detail/:id',
        component: DetailEvenement,
        data: { breadcrumb: "Détail" }
    }
] as Routes;
