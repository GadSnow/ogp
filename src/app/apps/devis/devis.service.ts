import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@/environments/environment';
import { Observable } from 'rxjs';
import { ApiResponse } from '@/app/core/models/api-response.interface';
import { Devis } from '@/app/apps/devis/devis.types';

@Injectable({
    providedIn: 'root',
})
export class DevisService {

    private httpClient = inject(HttpClient);
    private apiUrl: string = environment.apiUrl;

    getDevis(): Observable<ApiResponse<Devis[]>> {
        return this.httpClient.get<ApiResponse<Devis[]>>(`${this.apiUrl}/devis/liste`);
    }

    getDevisByClient(idClient: string): Observable<ApiResponse<Devis[]>> {
        return this.httpClient.get<ApiResponse<Devis[]>>(`${this.apiUrl}/devis/getbyclient`, {
            params: { idClient }
        });
    }

    getDevisById(id: string): Observable<ApiResponse<Devis>> {
        return this.httpClient.get<ApiResponse<Devis>>(`${this.apiUrl}/devis/getbyid`, {
            params: { idDevis: id }
        });
    }

    addDevis(idCampagne: string, idRemise?: string): Observable<ApiResponse<Devis>> {
        const params: Record<string, string> = { idCampagne };
        if (idRemise) params['idRemise'] = idRemise;
        return this.httpClient.post<ApiResponse<Devis>>(`${this.apiUrl}/devis/add`, null, { params });
    }

}
