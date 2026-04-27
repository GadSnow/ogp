import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@/environments/environment';
import { Observable } from 'rxjs';
import { AddQuartier, Quartier } from '@/app/apps/quartier/quartier.types';
import { ApiResponse } from '@/app/core/models/api-response.interface';

@Injectable({
    providedIn: 'root',
})
export class QuartierService {

    private httpClient = inject(HttpClient);
    private apiUrl: string = environment.apiUrl;


    getQuartiers(): Observable<ApiResponse<Quartier[]>> {
        return this.httpClient.get<ApiResponse<Quartier[]>>(`${this.apiUrl}/quartier/liste`);
    }

    addQuartier(idCommune: string, quartier: AddQuartier): Observable<ApiResponse<Quartier>> {
        return this.httpClient.post<ApiResponse<Quartier>>(`${this.apiUrl}/quartier/add`, quartier, {
            params: {
                idCommune: idCommune
            }
        });
    }

    getQuartier(id: string): Observable<ApiResponse<Quartier>> {
        return this.httpClient.get<ApiResponse<Quartier>>(`${this.apiUrl}/quartier/getbyid`, {
            params: {
                idQuartier: id
            }
        });
    }

    updateQuartier(idCommune: string, quartier: Partial<Quartier>): Observable<ApiResponse<Quartier>> {
        return this.httpClient.put<ApiResponse<Quartier>>(`${this.apiUrl}/quartier/update`, quartier, {
            params: {
                idCommune: idCommune
            }
        });
    }

    getQuartiersByCommune(idCommune: string): Observable<ApiResponse<Quartier[]>> {
        return this.httpClient.get<ApiResponse<Quartier[]>>(`${this.apiUrl}/quartier/commune`, {
            params: { idCommune }
        });
    }

}
