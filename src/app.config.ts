import { provideHttpClient, withFetch, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { ApplicationConfig, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, withEnabledBlockingInitialNavigation, withInMemoryScrolling } from '@angular/router';
import Aura from '@primeuix/themes/aura';
import { definePreset } from '@primeuix/themes';
import { providePrimeNG } from 'primeng/config';
import { appRoutes } from './app.routes';
import { authInterceptor } from '@/app/core/interceptors/auth.interceptor';
import { apiResponseInterceptor } from '@/app/core/interceptors/api-response.interceptor';
import { MessageService } from 'primeng/api';

const MyPreset = definePreset(Aura, {
    semantic: {
        select: {
            borderRadius: '{border.radius.lg}',
            height: '2rem'
        },
        primary: {
            50: '{blue.50}',
            100: '{blue.100}',
            200: '{blue.200}',
            300: '{blue.300}',
            400: '{blue.400}',
            500: '{blue.500}',
            600: '{blue.600}',
            700: '{blue.700}',
            800: '{blue.800}',
            900: '{blue.900}',
            950: '{blue.950}'
        }
    }
});

export const appConfig: ApplicationConfig = {
    providers: [
        MessageService,
        provideRouter(appRoutes, withInMemoryScrolling({ anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled' }), withEnabledBlockingInitialNavigation()),
        provideHttpClient(withInterceptorsFromDi(), withInterceptors([authInterceptor, apiResponseInterceptor])),
        provideZonelessChangeDetection(),
        providePrimeNG({ theme: { preset: MyPreset, options: { darkModeSelector: '.app-dark' } } }),
    ]
};
