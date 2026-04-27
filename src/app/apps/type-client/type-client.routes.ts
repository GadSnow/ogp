import { Routes } from '@angular/router';
import { TypeClientHome } from '@/app/apps/type-client/home/home';
import { AddTypeClient } from '@/app/apps/type-client/add/add';
import { EditTypeClient } from '@/app/apps/type-client/edit/edit';

export default [
    {
        path: '',
        component: TypeClientHome,
        data: { breadcrumb: "Type client" }
    },
    {
        path: 'add',
        component: AddTypeClient,
        data: { breadcrumb: "Ajouter un type de client" }
    },
    {
        path: 'edit/:id',
        component: EditTypeClient,
        data: { breadcrumb: "Modifier un type de client" }
    }
] as Routes;
