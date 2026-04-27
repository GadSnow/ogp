import { Injectable, inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { HttpInterceptorFn } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, tap, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (request, next) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    const token = localStorage.getItem('token');

    let authRequest = request;

    if (token) {
        authRequest = request.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
    } else {
        authRequest = request.clone({
            setHeaders: {
                'Content-Type': 'application/json'
            }
        });
    }

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
