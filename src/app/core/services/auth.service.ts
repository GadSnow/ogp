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
                const token = response.data?.token;

                if (!token) {
                    throw new Error(response.message || 'Réponse invalide du serveur.');
                }

                // Store token directly in localStorage
                localStorage.setItem('token', token);
                this.currentUserSubject.next({ token });
            }),
            catchError((error: unknown) => {
                return throwError(() => new Error(this.buildErrorMessage(error)));
            })
        );
    }

    /** Le message du backend prime ; sinon on retombe sur un libellé lié au code HTTP. */
    private buildErrorMessage(error: unknown): string {
        if (error instanceof HttpErrorResponse) {
            const backendMessage = error.error?.message;
            if (typeof backendMessage === 'string' && backendMessage.trim()) {
                return backendMessage;
            }

            if (error.status === 0) {
                return 'Impossible de joindre le serveur. Vérifiez votre connexion.';
            }
            if (error.status === 400) {
                return 'Identifiants incorrects.';
            }
            if (error.status === 401) {
                return 'Email ou mot de passe incorrect.';
            }
            if (error.status === 403) {
                return 'Accès refusé. Votre compte est peut-être désactivé.';
            }
        }

        if (error instanceof Error && error.message) {
            return error.message;
        }

        return "Échec de l'authentification. Veuillez réessayer.";
    }

    logout(): void {
        localStorage.removeItem('token');
        this.currentUserSubject.next(null);
    }

    getCurrentUser(): User | null {
        return this.currentUserSubject.value;
    }
}
