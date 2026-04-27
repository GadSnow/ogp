import { Routes } from '@angular/router';
import { SecteurHome } from '@/app/apps/secteur/home/home';
import { AddSecteur } from '@/app/apps/secteur/add/add';
import { EditSecteur } from '@/app/apps/secteur/edit/edit';

export default [
    {
        path: '',
        component: SecteurHome,
        data: { breadcrumb: "Secteur" }
    },
    {
        path: 'add',
        component: AddSecteur,
        data: { breadcrumb: "Ajouter un secteur" }
    },
    {
        path: 'edit/:id',
        component: EditSecteur,
        data: { breadcrumb: "Modifier un secteur" }
    }
] as Routes;
