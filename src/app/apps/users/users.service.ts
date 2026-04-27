import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@/environments/environment';
import { Observable } from 'rxjs';
import { AddUserPayload, GetUserResponse, UpdateUserPayload, User } from '@/app/apps/users/users.types';
import { ApiResponse } from '@/app/core/models/api-response.interface';

@Injectable({
    providedIn: 'root',
})
export class UsersService {

    private httpClient = inject(HttpClient);
    private apiUrl: string = environment.apiUrl;

    getUsers(): Observable<ApiResponse<User[]>> {
        return this.httpClient.get<ApiResponse<User[]>>(`${this.apiUrl}/api/users/liste`);
    }

    getUser(id: string): Observable<ApiResponse<GetUserResponse>> {
        return this.httpClient.get<ApiResponse<GetUserResponse>>(`${this.apiUrl}/api/users/getbyid`, {
            params: { id_user: id }
        });
    }

    addUser(idProfile: string, payload: AddUserPayload): Observable<ApiResponse<User>> {
        return this.httpClient.post<ApiResponse<User>>(`${this.apiUrl}/api/users/users`, payload, {
            params: { idProfile }
        });
    }

    updateUser(idProfile: string, payload: UpdateUserPayload): Observable<ApiResponse<User>> {
        return this.httpClient.put<ApiResponse<User>>(`${this.apiUrl}/api/users/update`, payload, {
            params: { idProfile }
        });
    }

    deleteUser(id: string): Observable<ApiResponse<any>> {
        return this.httpClient.delete<ApiResponse<any>>(`${this.apiUrl}/api/users/delete`, {
            params: { idUser: id }
        });
    }
}
