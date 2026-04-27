import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@/environments/environment';
import { Observable } from 'rxjs';
import { AddTypeClient, TypeClient } from '@/app/apps/type-client/type-client.types';
import { ApiResponse } from '@/app/core/models/api-response.interface';

@Injectable({
  providedIn: 'root',
})
export class TypeClientService {

    private httpClient = inject(HttpClient);
    private apiUrl: string = environment.apiUrl;


    getTypesClient(): Observable<ApiResponse<TypeClient[]>> {
        return this.httpClient.get<ApiResponse<TypeClient[]>>(`${this.apiUrl}/typeclient/liste`);
    }

    addTypeClient(typeClient: AddTypeClient): Observable<ApiResponse<TypeClient>> {
        return this.httpClient.post<ApiResponse<TypeClient>>(`${this.apiUrl}/typeclient/add`, typeClient);
    }

    getTypeClient(id: string): Observable<ApiResponse<TypeClient>> {
        return this.httpClient.get<ApiResponse<TypeClient>>(`${this.apiUrl}/typeclient/getbyid`, {
            params: {
                idTypeClient: id
            }
        });
    }

    updateTypeClient(typeClient: Partial<TypeClient>): Observable<ApiResponse<TypeClient>> {
        return this.httpClient.put<ApiResponse<TypeClient>>(`${this.apiUrl}/typeclient/update`, typeClient);
    }



}
