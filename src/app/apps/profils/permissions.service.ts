import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@/environments/environment';
import { Observable } from 'rxjs';
import { Permission } from '@/app/apps/profils/profils.types';
import { ApiResponse } from '@/app/core/models/api-response.interface';

@Injectable({
    providedIn: 'root',
})
export class PermissionsService {

    private httpClient = inject(HttpClient);
    private apiUrl: string = environment.apiUrl;

    getPermissions(): Observable<ApiResponse<Permission[]>> {
        return this.httpClient.get<ApiResponse<Permission[]>>(`${this.apiUrl}/permissions/liste`);
    }

}
