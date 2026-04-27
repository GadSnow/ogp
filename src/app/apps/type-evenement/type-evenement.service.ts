import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@/environments/environment';
import { Observable } from 'rxjs';
import { AddTypeEvenement, TypeEvenement } from '@/app/apps/type-evenement/type-evenement.types';
import { ApiResponse } from '@/app/core/models/api-response.interface';

@Injectable({
  providedIn: 'root',
})
export class TypeEvenementService {

    private httpClient = inject(HttpClient);
    private apiUrl: string = environment.apiUrl;


    getTypesEvenement(): Observable<ApiResponse<TypeEvenement[]>> {
        return this.httpClient.get<ApiResponse<TypeEvenement[]>>(`${this.apiUrl}/typeevenement/liste`);
    }

    addTypeEvenement(typeEvenement: AddTypeEvenement): Observable<ApiResponse<TypeEvenement>> {
        return this.httpClient.post<ApiResponse<TypeEvenement>>(`${this.apiUrl}/typeevenement/add`, typeEvenement);
    }

    getTypeEvenement(id: string): Observable<ApiResponse<TypeEvenement>> {
        return this.httpClient.get<ApiResponse<TypeEvenement>>(`${this.apiUrl}/typeevenement/getbyid`, {
            params: {
                idTypeEvenement: id
            }
        });
    }

    updateTypeEvenement(typeEvenement: Partial<TypeEvenement>): Observable<ApiResponse<TypeEvenement>> {
        return this.httpClient.put<ApiResponse<TypeEvenement>>(`${this.apiUrl}/typeevenement/update`, typeEvenement);
    }



}
