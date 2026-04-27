import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@/environments/environment';
import { Observable } from 'rxjs';
import { AddRegion, Region } from '@/app/apps/region/region.types';
import { ApiResponse } from '@/app/core/models/api-response.interface';

@Injectable({
  providedIn: 'root',
})
export class RegionService {

    private httpClient = inject(HttpClient);
    private apiUrl: string = environment.apiUrl;


    getRegions(): Observable<ApiResponse<Region[]>> {
        return this.httpClient.get<ApiResponse<Region[]>>(`${this.apiUrl}/region/liste`);
    }

    addRegion(region: AddRegion): Observable<ApiResponse<Region>> {
        return this.httpClient.post<ApiResponse<Region>>(`${this.apiUrl}/region/add`, region);
    }

    getRegion(id: string): Observable<ApiResponse<Region>> {
        return this.httpClient.get<ApiResponse<Region>>(`${this.apiUrl}/region/getbyid`, {
            params: {
                idRegion: id
            }
        });
    }

    updateRegion(region: Partial<Region>): Observable<ApiResponse<Region>> {
        return this.httpClient.put<ApiResponse<Region>>(`${this.apiUrl}/region/update`, region);
    }



}
