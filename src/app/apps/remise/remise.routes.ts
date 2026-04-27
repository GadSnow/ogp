import { Routes } from '@angular/router';
import { RemiseHome } from '@/app/apps/remise/home/home';
import { AddRemise } from '@/app/apps/remise/add/add';
import { EditRemise } from '@/app/apps/remise/edit/edit';

export default [
    {
        path: '',
        component: RemiseHome,
        data: { breadcrumb: "Remise" }
    },
    {
        path: 'add',
        component: AddRemise,
        data: { breadcrumb: "Ajouter une remise" }
    },
    {
        path: 'edit/:id',
        component: EditRemise,
        data: { breadcrumb: "Modifier une remise" }
    }
] as Routes;
