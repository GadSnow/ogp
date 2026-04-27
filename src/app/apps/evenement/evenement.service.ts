import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@/environments/environment';
import { Observable } from 'rxjs';
import { AddEvenement, Evenement } from '@/app/apps/evenement/evenement.types';
import { ApiResponse } from '@/app/core/models/api-response.interface';

@Injectable({
    providedIn: 'root',
})
export class EvenementService {

    private httpClient = inject(HttpClient);
    private apiUrl: string = environment.apiUrl;

    getEvenements(): Observable<ApiResponse<Evenement[]>> {
        return this.httpClient.get<ApiResponse<Evenement[]>>(`${this.apiUrl}/evenement/liste`);
    }

    addEvenement(idTypeEvenement: string, idPanneau: string, idUser: string, evenement: AddEvenement): Observable<ApiResponse<Evenement>> {
        return this.httpClient.post<ApiResponse<Evenement>>(`${this.apiUrl}/evenement/add`, evenement, {
            params: {
                idTypeEvenement,
                idPanneau,
                idUser
            }
        });
    }

    getEvenement(id: string): Observable<ApiResponse<Evenement>> {
        return this.httpClient.get<ApiResponse<Evenement>>(`${this.apiUrl}/evenement/getbyid`, {
            params: {
                idEvenement: id
            }
        });
    }

    updateEvenement(idTypeEvenement: string, idPanneau: string, idUser: string, evenement: Partial<Evenement>): Observable<ApiResponse<Evenement>> {
        return this.httpClient.put<ApiResponse<Evenement>>(`${this.apiUrl}/evenement/update`, evenement, {
            params: {
                idTypeEvenement,
                idPanneau,
                idUser
            }
        });
    }

}
