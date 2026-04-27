import { Routes } from '@angular/router';
import { CategoriePanneauxHome } from '@/app/apps/categorie-panneaux/home/home';
import { AddCategoriePanneaux } from '@/app/apps/categorie-panneaux/add/add';
import { EditCategoriePanneaux } from '@/app/apps/categorie-panneaux/edit/edit';

export default [
    {
        path: '',
        component: CategoriePanneauxHome,
        data: { breadcrumb: "Catégorie panneaux" }
    },
    {
        path: 'add',
        component: AddCategoriePanneaux,
        data: { breadcrumb: "Ajouter une catégorie de panneaux" }
    },
    {
        path: 'edit/:id',
        component: EditCategoriePanneaux,
        data: { breadcrumb: "Modifier une catégorie de panneaux" }
    }
] as Routes;
