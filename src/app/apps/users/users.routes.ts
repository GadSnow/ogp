import { Routes } from '@angular/router';
import { UsersHome } from '@/app/apps/users/home/home';
import { AddUser } from '@/app/apps/users/add/add';
import { EditUser } from '@/app/apps/users/edit/edit';
import { DetailUser } from '@/app/apps/users/detail/detail';

export default [
    {
        path: '',
        component: UsersHome,
        data: { breadcrumb: 'Utilisateurs' }
    },
    {
        path: 'add',
        component: AddUser,
        data: { breadcrumb: 'Créer un utilisateur' }
    },
    {
        path: 'edit/:id',
        component: EditUser,
        data: { breadcrumb: 'Modifier un utilisateur' }
    },
    {
        path: 'detail/:id',
        component: DetailUser,
        data: { breadcrumb: 'Détail de l\'utilisateur' }
    }
] as Routes;
