import { Routes } from '@angular/router';
import { RegionHome } from '@/app/apps/region/home/home';
import { AddRegion } from '@/app/apps/region/add/add';
import { EditRegion } from '@/app/apps/region/edit/edit';

export default [
    {
        path: '',
        component: RegionHome,
        data: { breadcrumb: "Région" }
    },
    {
        path: 'add',
        component: AddRegion,
        data: { breadcrumb: "Ajouter une région" }
    },
    {
        path: 'edit/:id',
        component: EditRegion,
        data: { breadcrumb: "Modifier une région" }
    }
] as Routes;
