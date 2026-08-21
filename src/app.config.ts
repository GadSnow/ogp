import { provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { ApplicationConfig, DEFAULT_CURRENCY_CODE, LOCALE_ID, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, withEnabledBlockingInitialNavigation, withInMemoryScrolling } from '@angular/router';
import { providePrimeNG } from 'primeng/config';
import { appRoutes } from './app.routes';
import { authInterceptor } from '@/app/core/interceptors/auth.interceptor';
import { apiResponseInterceptor } from '@/app/core/interceptors/api-response.interceptor';
import { OgpPreset } from '@/app/layout/theme/ogp-theme';
import { primeNgFr } from '@/app/layout/theme/primeng-fr';
import { MessageService } from 'primeng/api';
import { HashLocationStrategy, LocationStrategy, registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

// Référence francophone : séparateur de milliers en espace insécable,
// virgule décimale, symbole monétaire après le montant.
registerLocaleData(localeFr);

export const appConfig: ApplicationConfig = {
    providers: [
        MessageService,
        { provide: LOCALE_ID, useValue: 'fr-FR' },
        { provide: DEFAULT_CURRENCY_CODE, useValue: 'GNF' },
        provideRouter(appRoutes, withInMemoryScrolling({ anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled' }), withEnabledBlockingInitialNavigation()),
        provideHttpClient(withInterceptorsFromDi(), withInterceptors([authInterceptor, apiResponseInterceptor])),
        provideZonelessChangeDetection(),
        providePrimeNG({ theme: { preset: OgpPreset, options: { darkModeSelector: '.app-dark' } }, translation: primeNgFr }),
        { provide: LocationStrategy, useClass: HashLocationStrategy }
    ]
};
