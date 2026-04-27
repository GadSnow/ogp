import { Routes } from '@angular/router';
import { AppLayout } from '@/app/layout/components/app.layout';
import { LandingLayout } from '@/app/layout/components/app.landinglayout';
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
                redirectTo: '/dashboard/e-commerce',
                pathMatch: 'full'
            },

            {
                path: 'dashboard/e-commerce',
                loadComponent: () => import('@/app/pages/dashboards/ecommerce/ecommercedashboard').then((c) => c.EcommerceDashboard),
                data: { breadcrumb: ['E-Commerce', 'Overview'] }
            },
            {
                path: 'dashboard/banking',
                loadComponent: () => import('@/app/pages/dashboards/banking/bankingdashboard').then((c) => c.BankingDashboard),
                data: { breadcrumb: ['Banking', 'Overview'] }
            },
            {
                path: 'dashboard/marketing',
                loadComponent: () => import('@/app/pages/dashboards/marketing/marketingdashboard').then((c) => c.MarketingDashboard),
                data: { breadcrumb: ['Marketing', 'Overview'] }
            },
            {
                path: 'apps',
                loadChildren: () => import('@/app/apps/apps.routes'),
                data: { breadcrumb: 'Apps' }
            },

            {
                path: 'ecommerce',
                loadChildren: () => import('@/app/pages/ecommerce/ecommerce.routes'),
                data: { breadcrumb: 'E-Commerce' }
            },
            {
                path: 'profile',
                loadChildren: () => import('@/app/pages/usermanagement/usermanagement.routes')
            }
        ]
    },
    {
        path: 'landing',
        component: LandingLayout,
        children: [
            {
                path: '',
                loadComponent: () => import('@/app/pages/landing/home/home').then((c) => c.Home)
            },
            {
                path: 'features',
                loadComponent: () => import('@/app/pages/landing/features/features').then((c) => c.Features)
            },
            {
                path: 'pricing',
                loadComponent: () => import('@/app/pages/landing/pricing/pricing').then((c) => c.Pricing)
            },
            {
                path: 'contact',
                loadComponent: () => import('@/app/pages/landing/contact/contact').then((c) => c.Contact)
            },
            {
                path: 'login',
                redirectTo: 'auth/login',
                pathMatch: 'full'
            },
            {
                path: 'register',
                redirectTo: 'auth/register',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: 'auth',
        component: AuthLayout,
        children: [
            {
                path: 'login',
                loadComponent: () => import('@/app/pages/auth/login').then((c) => c.Login)
            },
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
    { path: '**', redirectTo: 'auth/notfound' },


];
