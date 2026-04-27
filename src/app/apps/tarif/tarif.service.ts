import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@/environments/environment';
import { Observable } from 'rxjs';
import { AddTarif, Tarif } from '@/app/apps/tarif/tarif.types';
import { ApiResponse } from '@/app/core/models/api-response.interface';

@Injectable({
    providedIn: 'root',
})
export class TarifService {

    private httpClient = inject(HttpClient);
    private apiUrl: string = environment.apiUrl;

    getTarifs(): Observable<ApiResponse<Tarif[]>> {
        return this.httpClient.get<ApiResponse<Tarif[]>>(`${this.apiUrl}/tarifs/liste`);
    }

    addTarif(idCaracteristique: string, tarif: AddTarif): Observable<ApiResponse<Tarif>> {
        return this.httpClient.post<ApiResponse<Tarif>>(`${this.apiUrl}/tarifs/add`, tarif, {
            params: {
                idCaracteristique: idCaracteristique
            }
        });
    }

    getTarif(id: string): Observable<ApiResponse<Tarif>> {
        return this.httpClient.get<ApiResponse<Tarif>>(`${this.apiUrl}/tarifs/getbyid`, {
            params: {
                idTarif: id
            }
        });
    }

    updateTarif(idCaracteristique: string, tarif: Partial<Tarif>): Observable<ApiResponse<Tarif>> {
        return this.httpClient.put<ApiResponse<Tarif>>(`${this.apiUrl}/tarifs/update`, tarif, {
            params: {
                idCaracteristique: idCaracteristique
            }
        });
    }

}
