import { Injectable, inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { HttpInterceptorFn } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, tap, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (request, next) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    const token = localStorage.getItem('token');
    // FormData (upload de justificatif) : le navigateur doit fixer lui-même le
    // Content-Type avec sa boundary, un `multipart/form-data` forcé ici casserait le parsing.
    const isFormData = request.body instanceof FormData;

    const headers: Record<string, string> = {};
    if (token) headers['Authorization'] = `Bearer ${token}`;
    if (!isFormData) headers['Content-Type'] = 'application/json';

    const authRequest = request.clone({ setHeaders: headers });

    return next(authRequest).pipe(
        tap((response: any) => {
            // Check if response has status field indicating error
            if (response && response?.body?.status === 100) {
                authService.logout();
                router.navigate(['/auth/login'], {
                    queryParams: { returnUrl: router.url }
                });
            }
        }),
        catchError((error) => {
            // Handle HTTP error status codes
            if (error.status === 401) {
                authService.logout();
                router.navigate(['/auth/login'], {
                    queryParams: { returnUrl: router.url }
                });
            }
            return throwError(() => error);
        })
    );
};
