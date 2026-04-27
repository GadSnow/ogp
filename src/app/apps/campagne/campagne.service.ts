import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@/environments/environment';
import { Observable } from 'rxjs';
import { Campagne, CampagnePayload } from '@/app/apps/campagne/campagne.types';
import { ApiResponse } from '@/app/core/models/api-response.interface';

@Injectable({
    providedIn: 'root',
})
export class CampagneService {

    private httpClient = inject(HttpClient);
    private apiUrl: string = environment.apiUrl;

    getCampagnes(): Observable<ApiResponse<Campagne[]>> {
        return this.httpClient.get<ApiResponse<Campagne[]>>(`${this.apiUrl}/campagne/liste`);
    }

    addCampagne(clientMsisdn: string, payload: CampagnePayload): Observable<ApiResponse<Campagne>> {
        return this.httpClient.post<ApiResponse<Campagne>>(`${this.apiUrl}/campagne/add`, payload, {
            params: { clientMsisdn: clientMsisdn }
        });
    }

    getCampagnesByClient(idClient: string): Observable<ApiResponse<Campagne[]>> {
        return this.httpClient.get<ApiResponse<Campagne[]>>(`${this.apiUrl}/campagne/getbyclient`, {
            params: { idClient }
        });
    }

    getCampagne(id: string): Observable<ApiResponse<Campagne>> {
        return this.httpClient.get<ApiResponse<Campagne>>(`${this.apiUrl}/campagne/getbyid`, {
            params: { idCampagne: id }
        });
    }

    updateCampagne(clientMsisdn: string, payload: CampagnePayload): Observable<ApiResponse<Campagne>> {
        return this.httpClient.put<ApiResponse<Campagne>>(`${this.apiUrl}/campagne/update`, payload, {
            params: { clientMsisdn: clientMsisdn }
        });
    }

    deleteCampagne(id: string): Observable<ApiResponse<any>> {
        return this.httpClient.delete<ApiResponse<any>>(`${this.apiUrl}/campagne/delete`, {
            params: { idCampagne: id }
        });
    }

}
