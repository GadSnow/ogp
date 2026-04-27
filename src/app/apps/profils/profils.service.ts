import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@/environments/environment';
import { Observable } from 'rxjs';
import { AddProfilPayload, GetProfilResponse, Profil } from '@/app/apps/profils/profils.types';
import { ApiResponse } from '@/app/core/models/api-response.interface';

@Injectable({
    providedIn: 'root',
})
export class ProfilsService {

    private httpClient = inject(HttpClient);
    private apiUrl: string = environment.apiUrl;

    getProfils(): Observable<ApiResponse<Profil[]>> {
        return this.httpClient.get<ApiResponse<Profil[]>>(`${this.apiUrl}/profils/liste`);
    }

    getProfil(id: string): Observable<ApiResponse<GetProfilResponse>> {
        return this.httpClient.get<ApiResponse<GetProfilResponse>>(`${this.apiUrl}/profils/getbyid`, {
            params: { idProfil: id }
        });
    }

    addProfil(payload: AddProfilPayload): Observable<ApiResponse<Profil>> {
        return this.httpClient.post<ApiResponse<Profil>>(`${this.apiUrl}/profils/add`, payload);
    }

    updateProfil(payload: AddProfilPayload): Observable<ApiResponse<Profil>> {
        return this.httpClient.put<ApiResponse<Profil>>(`${this.apiUrl}/profils/update`, payload);
    }

    deleteProfil(id: string): Observable<ApiResponse<any>> {
        return this.httpClient.delete<ApiResponse<any>>(`${this.apiUrl}/profils/delete`, {
            params: { idProfil: id }
        });
    }

}
