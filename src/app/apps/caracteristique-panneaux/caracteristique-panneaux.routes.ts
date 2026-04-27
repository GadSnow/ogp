import { Routes } from '@angular/router';
import { CaracteristiquePanneauxHome } from '@/app/apps/caracteristique-panneaux/home/home';
import { AddCaracteristiquePanneaux } from '@/app/apps/caracteristique-panneaux/add/add';
import { EditCaracteristiquePanneaux } from '@/app/apps/caracteristique-panneaux/edit/edit';

export default [
    {
        path: '',
        component: CaracteristiquePanneauxHome,
        data: { breadcrumb: "Caractéristique panneaux" }
    },
    {
        path: 'add',
        component: AddCaracteristiquePanneaux,
        data: { breadcrumb: "Ajouter" }
    },
    {
        path: 'edit/:id',
        component: EditCaracteristiquePanneaux,
        data: { breadcrumb: "Modifier" }
    }
] as Routes;
