import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@/environments/environment';
import { Observable } from 'rxjs';
import { AddCommune, Commune } from '@/app/apps/commune/commune.types';
import { ApiResponse } from '@/app/core/models/api-response.interface';

@Injectable({
    providedIn: 'root',
})
export class CommuneService {

    private httpClient = inject(HttpClient);
    private apiUrl: string = environment.apiUrl;


    getCommunes(): Observable<ApiResponse<Commune[]>> {
        return this.httpClient.get<ApiResponse<Commune[]>>(`${this.apiUrl}/commune/liste`);
    }

    addCommune(idRegion: string, commune: AddCommune): Observable<ApiResponse<Commune>> {
        return this.httpClient.post<ApiResponse<Commune>>(`${this.apiUrl}/commune/add`, commune, {
            params: {
                idRegion: idRegion
            }
        });
    }

    getCommune(id: string): Observable<ApiResponse<Commune>> {
        return this.httpClient.get<ApiResponse<Commune>>(`${this.apiUrl}/commune/getbyid`, {
            params: {
                idCommune: id
            }
        });
    }

    updateCommune(idRegion: string, commune: Partial<Commune>): Observable<ApiResponse<Commune>> {
        return this.httpClient.put<ApiResponse<Commune>>(`${this.apiUrl}/commune/edit`, commune, {
            params: {
                idRegion: idRegion
            }
        });
    }

    getCommunesByRegion(idRegion: string): Observable<ApiResponse<Commune[]>> {
        return this.httpClient.get<ApiResponse<Commune[]>>(`${this.apiUrl}/commune/region`, {
            params: { idRegion }
        });
    }

}
