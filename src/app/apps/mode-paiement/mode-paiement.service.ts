import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@/environments/environment';
import { Observable } from 'rxjs';
import { AddModePaiement, ModePaiement } from '@/app/apps/mode-paiement/mode-paiement.types';
import { ApiResponse } from '@/app/core/models/api-response.interface';

@Injectable({
  providedIn: 'root',
})
export class ModePaiementService {

    private httpClient = inject(HttpClient);
    private apiUrl: string = environment.apiUrl;


    getModesPaiement(): Observable<ApiResponse<ModePaiement[]>> {
        return this.httpClient.get<ApiResponse<ModePaiement[]>>(`${this.apiUrl}/modepaiement/liste`);
    }

    addModePaiement(modePaiement: AddModePaiement): Observable<ApiResponse<ModePaiement>> {
        return this.httpClient.post<ApiResponse<ModePaiement>>(`${this.apiUrl}/modepaiement/add`, modePaiement);
    }

    getModePaiement(id: string): Observable<ApiResponse<ModePaiement>> {
        return this.httpClient.get<ApiResponse<ModePaiement>>(`${this.apiUrl}/modepaiement/getbyid`, {
            params: {
                idModePaiement: id
            }
        });
    }

    updateModePaiement(modePaiement: Partial<ModePaiement>): Observable<ApiResponse<ModePaiement>> {
        return this.httpClient.put<ApiResponse<ModePaiement>>(`${this.apiUrl}/modepaiement/update`, modePaiement);
    }



}
