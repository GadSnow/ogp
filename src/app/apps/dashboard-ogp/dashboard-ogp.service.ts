import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DashboardOgpService {
    private httpClient = inject(HttpClient);
    private apiUrl: string = environment.apiUrl;

    getVueGenerale(dateDebut: string, dateFin: string): Observable<any> {
        return this.httpClient.get<any>(`${this.apiUrl}/dashboard/vue-generale`, {
            params: { dateDebut, dateFin }
        });
    }

    getImpayes(dateDebut: string, dateFin: string): Observable<any> {
        return this.httpClient.get<any>(`${this.apiUrl}/dashboard/impayes`, {
            params: { dateDebut, dateFin }
        });
    }
}
