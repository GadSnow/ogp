import { Routes } from '@angular/router';
import { AppLayout } from '@/app/layout/components/app.layout';
import { AuthLayout } from '@/app/layout/components/app.authlayout';
import { authGuard } from '@/app/core/guards/auth.guard';

export const appRoutes: Routes = [
    {
        path: 'ogp',
        component: AppLayout,
        canActivate: [authGuard],
        data: { breadcrumb: 'Office Guinéene de Publicité' },
        children: [
            {
                path: 'dashboard',
                loadChildren: () => import('@/app/apps/dashboard-ogp/dashboard-ogp.routes')
            },
            {
                path: 'type-evenement',
                loadChildren: () => import('@/app/apps/type-evenement/type-evenement.routes')
            },
            {
                path: 'type-client',
                loadChildren: () => import('@/app/apps/type-client/type-client.routes')
            },
            {
                path: 'remise',
                loadChildren: () => import('@/app/apps/remise/remise.routes')
            },
            {
                path: 'region',
                loadChildren: () => import('@/app/apps/region/region.routes')
            },
            {
                path: 'mode-paiement',
                loadChildren: () => import('@/app/apps/mode-paiement/mode-paiement.routes')
            },
            {
                path: 'categorie-panneaux',
                loadChildren: () => import('@/app/apps/categorie-panneaux/categorie-panneaux.routes')
            },
            {
                path: 'commune',
                loadChildren: () => import('@/app/apps/commune/commune.routes')
            },
            {
                path: 'quartier',
                loadChildren: () => import('@/app/apps/quartier/quartier.routes')
            },
            {
                path: 'evenement',
                loadChildren: () => import('@/app/apps/evenement/evenement.routes')
            },
            {
                path: 'tarif',
                loadChildren: () => import('@/app/apps/tarif/tarif.routes')
            },
            {
                path: 'panneau',
                loadChildren: () => import('@/app/apps/panneau/panneau.routes')
            },
            {
                path: 'caracteristique-panneaux',
                loadChildren: () => import('@/app/apps/caracteristique-panneaux/caracteristique-panneaux.routes')
            },
            {
                path: 'client',
                loadChildren: () => import('@/app/apps/client/client.routes')
            },
            {
                path: 'secteur',
                loadChildren: () => import('@/app/apps/secteur/secteur.routes')
            },
            {
                path: 'campagne',
                loadChildren: () => import('@/app/apps/campagne/campagne.routes')
            },
            {
                path: 'devis',
                loadChildren: () => import('@/app/apps/devis/devis.routes')
            },
            {
                path: 'facture',
                loadChildren: () => import('@/app/apps/facture/facture.routes')
            },
            {
                path: 'paiement',
                loadChildren: () => import('@/app/apps/paiement/paiement.routes')
            },
            {
                path: 'profils',
                loadChildren: () => import('@/app/apps/profils/profils.routes')
            },
            {
                path: 'users',
                loadChildren: () => import('@/app/apps/users/users.routes')
            }
        ]
    },
    {
        path: '',
        component: AppLayout,
        canActivate: [authGuard],
        children: [
            {
                path: '',
                redirectTo: '/ogp/dashboard',
                pathMatch: 'full'
            }
        ]
    },
    {
        // Hors AuthLayout : l'écran de connexion occupe toute la fenêtre, alors que
        // AuthLayout contraint ses pages dans un conteneur centré de 1184px.
        path: 'auth/login',
        loadComponent: () => import('@/app/pages/auth/login').then((c) => c.Login)
    },
    {
        path: 'auth',
        component: AuthLayout,
        children: [
            {
                path: 'register',
                loadComponent: () => import('@/app/pages/auth/register').then((c) => c.Register)
            },
            {
                path: 'verification',
                loadComponent: () => import('@/app/pages/auth/verification').then((c) => c.Verification)
            },
            {
                path: 'forgot-password',
                loadComponent: () => import('@/app/pages/auth/forgotpassword').then((c) => c.ForgotPassword)
            },
            {
                path: 'new-password',
                loadComponent: () => import('@/app/pages/auth/newpassword').then((c) => c.NewPassword)
            },
            {
                path: 'lock-screen',
                loadComponent: () => import('@/app/pages/auth/lockscreen').then((c) => c.LockScreen)
            },
            {
                path: 'access-denied',
                loadComponent: () => import('@/app/pages/auth/accessdenied').then((c) => c.AccessDenied)
            },
            {
                path: 'oops',
                loadComponent: () => import('@/app/pages/auth/oops').then((c) => c.Oops)
            },
            { path: 'notfound', loadComponent: () => import('@/app/pages/notfound/notfound').then((c) => c.Notfound) }
        ]
    },
    { path: '**', redirectTo: 'auth/notfound' }
];
