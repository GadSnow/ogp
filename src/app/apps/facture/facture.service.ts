import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@/environments/environment';
import { Observable } from 'rxjs';
import { Facture } from '@/app/apps/facture/facture.types';
import { ApiResponse } from '@/app/core/models/api-response.interface';

@Injectable({
    providedIn: 'root',
})
export class FactureService {

    private httpClient = inject(HttpClient);
    private apiUrl: string = environment.apiUrl;

    getFactures(): Observable<ApiResponse<Facture[]>> {
        return this.httpClient.get<ApiResponse<Facture[]>>(`${this.apiUrl}/facture/liste`);
    }

    /**
     * Les N dernières factures, déjà ordonnées par le backend.
     * `limit` vaut 10 côté serveur ; on l'envoie explicitement pour que l'appelant
     * maîtrise la taille de la réponse.
     */
    getDernieresFactures(limit: number = 10): Observable<ApiResponse<Facture[]>> {
        return this.httpClient.get<ApiResponse<Facture[]>>(`${this.apiUrl}/facture/dernieres`, {
            params: { limit }
        });
    }

    addFacture(idCampagne: string, idRemise?: string): Observable<ApiResponse<Facture>> {
        const params: Record<string, string> = { idCampagne };
        if (idRemise) params['idRemise'] = idRemise;
        return this.httpClient.post<ApiResponse<Facture>>(`${this.apiUrl}/facture/add`, null, { params });
    }
}
