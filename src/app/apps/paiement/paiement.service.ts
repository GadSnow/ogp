import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '@/environments/environment';
import { Observable } from 'rxjs';
import { AddPaiement, Paiement } from '@/app/apps/paiement/paiement.types';
import { ApiResponse } from '@/app/core/models/api-response.interface';

@Injectable({
    providedIn: 'root'
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

    /**
     * Justificatif obligatoire (et donc requête multipart) pour les modes Chèque
     * et Virement ; pour Cash, la requête reste inchangée (params + corps vide).
     */
    addPaiement(paiement: AddPaiement): Observable<ApiResponse<Paiement>> {
        if (paiement.justificatif) {
            const formData = new FormData();
            formData.append('referenceFacture', paiement.referenceFacture);
            formData.append('montant', String(paiement.montant));
            formData.append('modePaiement', paiement.modePaiement);
            if (paiement.message) formData.append('message', paiement.message);
            formData.append('justificatif', paiement.justificatif);
            return this.httpClient.post<ApiResponse<Paiement>>(`${this.apiUrl}/paiement/add`, formData);
        }

        let params = new HttpParams().set('referenceFacture', paiement.referenceFacture).set('montant', paiement.montant).set('modePaiement', paiement.modePaiement);

        if (paiement.message) {
            params = params.set('message', paiement.message);
        }

        return this.httpClient.post<ApiResponse<Paiement>>(`${this.apiUrl}/paiement/add`, null, { params });
    }

    /**
     * Fichier brut (pas de JSON) : réponse en blob pour déclencher un téléchargement
     * direct côté front plutôt que de naviguer vers l'URL (qui perdrait l'en-tête d'auth).
     */
    telechargerJustificatif(idPaiement: string): Observable<Blob> {
        return this.httpClient.get(`${this.apiUrl}/paiement/justificatif`, {
            params: { idPaiement },
            responseType: 'blob'
        });
    }
}
