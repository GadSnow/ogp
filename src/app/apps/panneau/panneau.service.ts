import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@/environments/environment';
import { Observable } from 'rxjs';
import { AddPanneau, Panneau } from '@/app/apps/panneau/panneau.types';
import { ApiResponse } from '@/app/core/models/api-response.interface';

@Injectable({
    providedIn: 'root',
})
export class PanneauService {

    private httpClient = inject(HttpClient);
    private apiUrl: string = environment.apiUrl;

    getPanneaux(): Observable<ApiResponse<Panneau[]>> {
        return this.httpClient.get<ApiResponse<Panneau[]>>(`${this.apiUrl}/panneau/liste`);
    }

    getDisponibles(): Observable<ApiResponse<Panneau[]>> {
        return this.httpClient.get<ApiResponse<Panneau[]>>(`${this.apiUrl}/panneau/getdisponibles`);
    }

    addPanneau(idCaracteristique: string, idSecteur: string, panneau: AddPanneau): Observable<ApiResponse<Panneau>> {
        return this.httpClient.post<ApiResponse<Panneau>>(`${this.apiUrl}/panneau/add`, panneau, {
            params: {
                idCaracteristique: idCaracteristique,
                idSecteur: idSecteur
            }
        });
    }

    getPanneau(id: string): Observable<ApiResponse<Panneau>> {
        return this.httpClient.get<ApiResponse<Panneau>>(`${this.apiUrl}/panneau/getbyid`, {
            params: {
                idPanneau: id
            }
        });
    }

    updatePanneau(idCaracteristique: string, idSecteur: string, panneau: Partial<Panneau>): Observable<ApiResponse<Panneau>> {
        return this.httpClient.put<ApiResponse<Panneau>>(`${this.apiUrl}/panneau/update`, panneau, {
            params: {
                idCaracteristique: idCaracteristique,
                idSecteur: idSecteur
            }
        });
    }

}
