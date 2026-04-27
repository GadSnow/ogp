import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@/environments/environment';
import { Observable } from 'rxjs';
import { StatutCampagne } from '@/app/apps/campagne/statut-campagne.types';
import { ApiResponse } from '@/app/core/models/api-response.interface';

@Injectable({
    providedIn: 'root',
})
export class StatutCampagneService {

    private httpClient = inject(HttpClient);
    private apiUrl: string = environment.apiUrl;

    getStatuts(): Observable<ApiResponse<StatutCampagne[]>> {
        return this.httpClient.get<ApiResponse<StatutCampagne[]>>(`${this.apiUrl}/statut/liste-ordonnee`);
    }

}
