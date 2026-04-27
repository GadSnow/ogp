import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@/environments/environment';
import { Observable } from 'rxjs';
import { AddSecteur, Secteur } from '@/app/apps/secteur/secteur.types';
import { ApiResponse } from '@/app/core/models/api-response.interface';

@Injectable({
    providedIn: 'root',
})
export class SecteurService {

    private httpClient = inject(HttpClient);
    private apiUrl: string = environment.apiUrl;


    getSecteurs(): Observable<ApiResponse<Secteur[]>> {
        return this.httpClient.get<ApiResponse<Secteur[]>>(`${this.apiUrl}/secteur/liste`);
    }

    addSecteur(idQuartier: string, secteur: AddSecteur): Observable<ApiResponse<Secteur>> {
        return this.httpClient.post<ApiResponse<Secteur>>(`${this.apiUrl}/secteur/add`, secteur, {
            params: {
                idQuartier: idQuartier
            }
        });
    }

    getSecteur(id: string): Observable<ApiResponse<Secteur>> {
        return this.httpClient.get<ApiResponse<Secteur>>(`${this.apiUrl}/secteur/getbyid`, {
            params: {
                idSecteur: id
            }
        });
    }

    updateSecteur(idQuartier: string, secteur: Partial<Secteur>): Observable<ApiResponse<Secteur>> {
        return this.httpClient.put<ApiResponse<Secteur>>(`${this.apiUrl}/secteur/edit`, secteur, {
            params: {
                idQuartier: idQuartier
            }
        });
    }
    getSecteursByQuartier(idQuartier: string): Observable<ApiResponse<Secteur[]>> {
        return this.httpClient.get<ApiResponse<Secteur[]>>(`${this.apiUrl}/secteur/quartier`, {
            params: { idQuartier }
        });
    }
}
