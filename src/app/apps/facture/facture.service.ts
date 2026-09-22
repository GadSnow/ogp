import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@/environments/environment';
import { Observable } from 'rxjs';
import { AddFactureParams, Facture } from '@/app/apps/facture/facture.types';
import { ApiResponse } from '@/app/core/models/api-response.interface';

@Injectable({
    providedIn: 'root'
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

    /**
     * `idCampagne` est facultatif : sans lui, il s'agit d'une facture de redevance
     * et le backend exige alors `idRegie` + `montantBrute` (montant saisi à la main).
     */
    addFacture(params: AddFactureParams): Observable<ApiResponse<Facture>> {
        const httpParams: Record<string, string> = {};
        if (params.idCampagne) httpParams['idCampagne'] = params.idCampagne;
        if (params.idRemise) httpParams['idRemise'] = params.idRemise;
        if (params.idRegie) httpParams['idRegie'] = params.idRegie;
        if (params.montantBrute != null) httpParams['montantBrute'] = String(params.montantBrute);
        return this.httpClient.post<ApiResponse<Facture>>(`${this.apiUrl}/facture/add`, null, { params: httpParams });
    }

    /**
     * Mise à jour d'une facture. Pour une facture de régie (regies renseigné),
     * idRemise est ignoré par le backend.
     */
    updateFacture(idFacture: string, idRemise?: string): Observable<ApiResponse<Facture>> {
        const params: Record<string, string> = { idFacture };
        if (idRemise) params['idRemise'] = idRemise;
        return this.httpClient.put<ApiResponse<Facture>>(`${this.apiUrl}/facture/update`, null, { params });
    }
}
