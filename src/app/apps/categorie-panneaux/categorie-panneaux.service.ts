import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@/environments/environment';
import { Observable } from 'rxjs';
import { AddCategoriePanneaux, CategoriePanneaux } from '@/app/apps/categorie-panneaux/categorie-panneaux.types';
import { ApiResponse } from '@/app/core/models/api-response.interface';

@Injectable({
  providedIn: 'root',
})
export class CategoriePanneauxService {

    private httpClient = inject(HttpClient);
    private apiUrl: string = environment.apiUrl;


    getCategoriesPanneaux(): Observable<ApiResponse<CategoriePanneaux[]>> {
        return this.httpClient.get<ApiResponse<CategoriePanneaux[]>>(`${this.apiUrl}/categorie-panneaux/liste`);
    }

    addCategoriePanneaux(categoriePanneaux: AddCategoriePanneaux): Observable<ApiResponse<CategoriePanneaux>> {
        return this.httpClient.post<ApiResponse<CategoriePanneaux>>(`${this.apiUrl}/categorie-panneaux/add`, categoriePanneaux);
    }

    getCategoriePanneaux(id: string): Observable<ApiResponse<CategoriePanneaux>> {
        return this.httpClient.get<ApiResponse<CategoriePanneaux>>(`${this.apiUrl}/categorie-panneaux/getbyid`, {
            params: {
                idCategorie : id
            }
        });
    }

    updateCategoriePanneaux(categoriePanneaux: Partial<CategoriePanneaux>): Observable<ApiResponse<CategoriePanneaux>> {
        return this.httpClient.put<ApiResponse<CategoriePanneaux>>(`${this.apiUrl}/categorie-panneaux/update`, categoriePanneaux);
    }



}
