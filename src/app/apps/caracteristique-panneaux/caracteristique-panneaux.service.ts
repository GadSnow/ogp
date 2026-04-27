import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@/environments/environment';
import { Observable } from 'rxjs';
import { AddCaracteristiquePanneaux, CaracteristiquePanneaux } from '@/app/apps/caracteristique-panneaux/caracteristique-panneaux.types';
import { ApiResponse } from '@/app/core/models/api-response.interface';

@Injectable({
    providedIn: 'root',
})
export class CaracteristiquePanneauxService {

    private httpClient = inject(HttpClient);
    private apiUrl: string = environment.apiUrl;


    getCaracteristiques(): Observable<ApiResponse<CaracteristiquePanneaux[]>> {
        return this.httpClient.get<ApiResponse<CaracteristiquePanneaux[]>>(`${this.apiUrl}/caracteristique-panneaux/liste`);
    }

    addCaracteristique(idCategoriePanneaux: string, caracteristique: AddCaracteristiquePanneaux): Observable<ApiResponse<CaracteristiquePanneaux>> {
        return this.httpClient.post<ApiResponse<CaracteristiquePanneaux>>(`${this.apiUrl}/caracteristique-panneaux/add`, caracteristique, {
            params: {
                idCategorie: idCategoriePanneaux
            }
        });
    }

    getCaracteristique(id: string): Observable<ApiResponse<CaracteristiquePanneaux>> {
        return this.httpClient.get<ApiResponse<CaracteristiquePanneaux>>(`${this.apiUrl}/caracteristique-panneaux/getbyid`, {
            params: {
                idCaracteristique: id
            }
        });
    }

    updateCaracteristique(idCategoriePanneaux: string, caracteristique: Partial<CaracteristiquePanneaux>): Observable<ApiResponse<CaracteristiquePanneaux>> {
        return this.httpClient.put<ApiResponse<CaracteristiquePanneaux>>(`${this.apiUrl}/caracteristique-panneaux/update`, caracteristique, {
            params: {
                idCategorie: idCategoriePanneaux
            }
        });
    }
    getCaracteristiquesByCategorie(idCategorie: string): Observable<ApiResponse<CaracteristiquePanneaux[]>> {
        return this.httpClient.get<ApiResponse<CaracteristiquePanneaux[]>>(`${this.apiUrl}/caracteristique-panneaux/getbycategorie`, {
            params: { idCategorie }
        });
    }
}
