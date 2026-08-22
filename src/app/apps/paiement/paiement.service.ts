import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '@/environments/environment';
import { Observable } from 'rxjs';
import { AddPaiement, Paiement } from '@/app/apps/paiement/paiement.types';
import { ApiResponse } from '@/app/core/models/api-response.interface';

@Injectable({
    providedIn: 'root',
})
export class PaiementService {

    private httpClient = inject(HttpClient);
    private apiUrl: string = environment.apiUrl;

    getPaiements(): Observable<ApiResponse<Paiement[]>> {
        return this.httpClient.get<ApiResponse<Paiement[]>>(`${this.apiUrl}/paiement/liste`);
    }

    /**
     * Les N derniers paiements, déjà ordonnés par le backend.
     * `limit` vaut 10 côté serveur ; on l'envoie explicitement pour que l'appelant
     * maîtrise la taille de la réponse.
     */
    getDerniersPaiements(limit: number = 10): Observable<ApiResponse<Paiement[]>> {
        return this.httpClient.get<ApiResponse<Paiement[]>>(`${this.apiUrl}/paiement/derniers`, {
            params: { limit }
        });
    }

    getPaiement(id: string): Observable<ApiResponse<Paiement>> {
        return this.httpClient.get<ApiResponse<Paiement>>(`${this.apiUrl}/paiement/getbyid`, {
            params: { idPaiement: id }
        });
    }

    addPaiement(paiement: AddPaiement): Observable<ApiResponse<Paiement>> {
        let params = new HttpParams()
            .set('referenceFacture', paiement.referenceFacture)
            .set('montant', paiement.montant)
            .set('modePaiement', paiement.modePaiement);

        if (paiement.message) {
            params = params.set('message', paiement.message);
        }

        return this.httpClient.post<ApiResponse<Paiement>>(`${this.apiUrl}/paiement/add`, null, { params });
    }
}
