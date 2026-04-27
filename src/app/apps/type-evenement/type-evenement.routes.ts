import { Routes } from '@angular/router';
import { TypeEvenementHome } from '@/app/apps/type-evenement/home/home';
import { AddTypeEvenement } from '@/app/apps/type-evenement/add/add';
import { EditTypeEvenement } from '@/app/apps/type-evenement/edit/edit';

export default [
    {
        path: '',
        component: TypeEvenementHome,
        data: { breadcrumb: "Type évènement" }
    },
    {
        path: 'add',
        component: AddTypeEvenement,
        data: { breadcrumb: "Ajouter un type d'évènement" }
    },
    {
        path: 'edit/:id',
        component: EditTypeEvenement,
        data: { breadcrumb: "Modifier un type d'évènement" }
    }
] as Routes;
