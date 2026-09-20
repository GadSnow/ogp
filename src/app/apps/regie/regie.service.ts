import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@/environments/environment';
import { Observable } from 'rxjs';
import { AddRegie, Regie } from '@/app/apps/regie/regie.types';
import { ApiResponse } from '@/app/core/models/api-response.interface';

@Injectable({
    providedIn: 'root'
})
export class RegieService {
    private httpClient = inject(HttpClient);
    private apiUrl: string = environment.apiUrl;

    getRegies(): Observable<ApiResponse<Regie[]>> {
        return this.httpClient.get<ApiResponse<Regie[]>>(`${this.apiUrl}/regie/liste`);
    }

    getRegie(id: string): Observable<ApiResponse<Regie>> {
        return this.httpClient.get<ApiResponse<Regie>>(`${this.apiUrl}/regie/getbyid`, {
            params: { idRegie: id }
        });
    }

    addRegie(regie: AddRegie): Observable<ApiResponse<Regie>> {
        return this.httpClient.post<ApiResponse<Regie>>(`${this.apiUrl}/regie/add`, regie);
    }

    updateRegie(regie: Partial<Regie> & { id: string }): Observable<ApiResponse<Regie>> {
        return this.httpClient.put<ApiResponse<Regie>>(`${this.apiUrl}/regie/update`, regie);
    }
}
