import { Routes } from '@angular/router';
import { ModePaiementHome } from '@/app/apps/mode-paiement/home/home';
import { AddModePaiement } from '@/app/apps/mode-paiement/add/add';
import { EditModePaiement } from '@/app/apps/mode-paiement/edit/edit';

export default [
    {
        path: '',
        component: ModePaiementHome,
        data: { breadcrumb: "Mode de paiement" }
    },
    {
        path: 'add',
        component: AddModePaiement,
        data: { breadcrumb: "Ajouter un mode de paiement" }
    },
    {
        path: 'edit/:id',
        component: EditModePaiement,
        data: { breadcrumb: "Modifier un mode de paiement" }
    }
] as Routes;
