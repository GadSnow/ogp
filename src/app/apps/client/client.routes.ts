import { Routes } from '@angular/router';
import { ClientHome } from '@/app/apps/client/home/home';
import { AddClient } from '@/app/apps/client/add/add';
import { EditClient } from '@/app/apps/client/edit/edit';
import { DetailClient } from '@/app/apps/client/detail/detail';

export default [
    {
        path: '',
        component: ClientHome,
        data: { breadcrumb: "Client" }
    },
    {
        path: 'add',
        component: AddClient,
        data: { breadcrumb: "Ajouter un client" }
    },
    {
        path: 'edit/:id',
        component: EditClient,
        data: { breadcrumb: "Modifier un client" }
    },
    {
        path: 'detail/:id',
        component: DetailClient,
        data: { breadcrumb: "Détail" }
    }
] as Routes;
