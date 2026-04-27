import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, tap, catchError, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface User {
    token: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface AuthResponse {
    status: number;
    message: string;
    data: {
        data: {
            id: string;
            dtCreated: string;
            dtLastUpdate: string;
            nom: string;
            prenom: string;
            msisdn: string;
            email: string;
            password: string;
            role: any;
            btEnabled: boolean;
            isFirstLogin: boolean;
            idUser: any;
            profils: any;
        };
        permissions: any[];
        email: string;
        token: string;
    };
}

export interface AuthError {
    error: string;
    message: string;
    status: number;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private http = inject(HttpClient);
    private currentUserSubject = new BehaviorSubject<User | null>(null);
    public currentUser$ = this.currentUserSubject.asObservable();

    private apiUrl = environment.apiUrl;

    constructor() {
        // Check if token is already in localStorage
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            this.currentUserSubject.next({ token: storedToken });
        }
    }

    get isAuthenticated(): boolean {
        return !!this.currentUserSubject.value;
    }

    login(credentials: LoginRequest): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(`${this.apiUrl}/auth/login`, credentials).pipe(
            tap(response => {
                // Extract token from response structure
                const token = response.data.token;

                // Store token directly in localStorage
                localStorage.setItem('token', token);
                this.currentUserSubject.next({ token });
            }),
            catchError((error: HttpErrorResponse) => {
                console.error('Login error:', error);
                let errorMessage = 'Authentication failed. Please try again.';

                if (error.status === 0) {
                    errorMessage = 'Unable to connect to the server. Please check your network connection.';
                } else if (error.status === 401) {
                    errorMessage = 'Invalid email or password.';
                } else if (error.status === 403) {
                    errorMessage = 'Access denied. Your account may be locked.';
                } else if (error.error?.message) {
                    errorMessage = error.error.message;
                }

                return throwError(() => new Error(errorMessage));
            })
        );
    }

    logout(): void {
        localStorage.removeItem('token');
        this.currentUserSubject.next(null);
    }

    getCurrentUser(): User | null {
        return this.currentUserSubject.value;
    }
}
