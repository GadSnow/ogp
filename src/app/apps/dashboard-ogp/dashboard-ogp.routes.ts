import { Routes } from '@angular/router';
import { HomeDashboardOgp } from '@/app/apps/dashboard-ogp/home/home';

export default [
    {
        path: '',
        component: HomeDashboardOgp,
        data: { breadcrumb: 'Statistiques' }
    }
] as Routes;
