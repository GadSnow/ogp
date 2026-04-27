import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@/environments/environment';
import { Observable } from 'rxjs';
import { AddRemise, Remise } from '@/app/apps/remise/remise.types';
import { ApiResponse } from '@/app/core/models/api-response.interface';

@Injectable({
  providedIn: 'root',
})
export class RemiseService {

    private httpClient = inject(HttpClient);
    private apiUrl: string = environment.apiUrl;


    getRemises(): Observable<ApiResponse<Remise[]>> {
        return this.httpClient.get<ApiResponse<Remise[]>>(`${this.apiUrl}/remise/liste`);
    }

    addRemise(remise: AddRemise): Observable<ApiResponse<Remise>> {
        return this.httpClient.post<ApiResponse<Remise>>(`${this.apiUrl}/remise/add`, remise);
    }

    getRemise(id: string): Observable<ApiResponse<Remise>> {
        return this.httpClient.get<ApiResponse<Remise>>(`${this.apiUrl}/remise/getbyid`, {
            params: {
                idRemise: id
            }
        });
    }

    updateRemise(remise: Partial<Remise>): Observable<ApiResponse<Remise>> {
        return this.httpClient.put<ApiResponse<Remise>>(`${this.apiUrl}/remise/update`, remise);
    }



}
