import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '@/environments/environment';
import { Observable } from 'rxjs';
import { AddPanneau, LocalisationFiltre, Panneau, PanneauDetail } from '@/app/apps/panneau/panneau.types';
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

    /**
     * Panneaux d'une zone geographique. Les quatre parametres sont optionnels et
     * cumulables : on n'envoie que ceux qui sont renseignes, une chaine vide etant
     * interpretee par le backend comme un identifiant a matcher.
     */
    getByLocalisation(filtre: LocalisationFiltre = {}): Observable<ApiResponse<Panneau[]>> {
        let params = new HttpParams();
        for (const [cle, valeur] of Object.entries(filtre)) {
            if (valeur) {
                params = params.set(cle, valeur);
            }
        }
        return this.httpClient.get<ApiResponse<Panneau[]>>(`${this.apiUrl}/panneau/getbylocalisation`, { params });
    }

    addPanneau(idCaracteristique: string, idSecteur: string, panneau: AddPanneau): Observable<ApiResponse<Panneau>> {
        return this.httpClient.post<ApiResponse<Panneau>>(`${this.apiUrl}/panneau/add`, panneau, {
            params: {
                idCaracteristique: idCaracteristique,
                idSecteur: idSecteur
            }
        });
    }

    getPanneau(id: string): Observable<ApiResponse<PanneauDetail>> {
        return this.httpClient.get<ApiResponse<PanneauDetail>>(`${this.apiUrl}/panneau/getbyid`, {
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
