import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@/environments/environment';
import { Observable } from 'rxjs';
import { AddClient, Client } from '@/app/apps/client/client.types';
import { ApiResponse } from '@/app/core/models/api-response.interface';

@Injectable({
    providedIn: 'root',
})
export class ClientService {

    private httpClient = inject(HttpClient);
    private apiUrl: string = environment.apiUrl;


    getClients(): Observable<ApiResponse<Client[]>> {
        return this.httpClient.get<ApiResponse<Client[]>>(`${this.apiUrl}/clients/liste`);
    }

    addClient(idTypeClient: string, client: AddClient): Observable<ApiResponse<Client>> {
        return this.httpClient.post<ApiResponse<Client>>(`${this.apiUrl}/clients/add`, client, {
            params: {
                idTypeClient: idTypeClient
            }
        });
    }

    getClient(id: string): Observable<ApiResponse<Client>> {
        return this.httpClient.get<ApiResponse<Client>>(`${this.apiUrl}/clients/getbyid`, {
            params: {
                idClient: id
            }
        });
    }

    updateClient(idTypeClient: string, client: Partial<Client>): Observable<ApiResponse<Client>> {
        return this.httpClient.put<ApiResponse<Client>>(`${this.apiUrl}/clients/edit`, client, {
            params: {
                idTypeClient: idTypeClient
            }
        });
    }

}
