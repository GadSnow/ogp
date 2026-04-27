import { Routes } from '@angular/router';
import { QuartierHome } from '@/app/apps/quartier/home/home';
import { AddQuartier } from '@/app/apps/quartier/add/add';
import { EditQuartier } from '@/app/apps/quartier/edit/edit';

export default [
    {
        path: '',
        component: QuartierHome,
        data: { breadcrumb: "Quartier" }
    },
    {
        path: 'add',
        component: AddQuartier,
        data: { breadcrumb: "Ajouter un quartier" }
    },
    {
        path: 'edit/:id',
        component: EditQuartier,
        data: { breadcrumb: "Modifier un quartier" }
    }
] as Routes;
