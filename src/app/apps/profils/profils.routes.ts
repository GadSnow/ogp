import { Routes } from '@angular/router';
import { ProfilsHome } from '@/app/apps/profils/home/home';
import { AddProfil } from '@/app/apps/profils/add/add';
import { EditProfil } from '@/app/apps/profils/edit/edit';
import { DetailProfil } from '@/app/apps/profils/detail/detail';

export default [
    {
        path: '',
        component: ProfilsHome,
        data: { breadcrumb: 'Profils' }
    },
    {
        path: 'add',
        component: AddProfil,
        data: { breadcrumb: 'Créer un profil' }
    },
    {
        path: 'edit/:id',
        component: EditProfil,
        data: { breadcrumb: 'Modifier un profil' }
    },
    {
        path: 'detail/:id',
        component: DetailProfil,
        data: { breadcrumb: 'Détail du profil' }
    }
] as Routes;
