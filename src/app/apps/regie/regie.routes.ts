import { Routes } from '@angular/router';
import { RegieHome } from '@/app/apps/regie/home/home';
import { AddRegie } from '@/app/apps/regie/add/add';
import { EditRegie } from '@/app/apps/regie/edit/edit';

export default [
    {
        path: '',
        component: RegieHome,
        data: { breadcrumb: 'Régies' }
    },
    {
        path: 'add',
        component: AddRegie,
        data: { breadcrumb: 'Ajouter une régie' }
    },
    {
        path: 'edit/:id',
        component: EditRegie,
        data: { breadcrumb: 'Modifier une régie' }
    }
] as Routes;
