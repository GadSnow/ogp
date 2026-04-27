import { Permission, Profil } from '@/app/apps/profils/profils.types';

export type { Permission };

export interface GetUserResponse {
    user: User;
    permissions: Permission[];
}

export interface User {
    id: string;
    dtCreated: string;
    dtLastUpdate: string;
    nom: string;
    prenom: string;
    msisdn: string;
    email: string;
    password: string;
    role: string;
    btEnabled: boolean;
    isFirstLogin: boolean;
    idUser: string;
    profils: Profil;
}

export interface AddUserPayload {
    nom: string;
    prenom: string;
    msisdn: string;
    email: string;
    password: string;
    role: string;
}

export interface UpdateUserPayload {
    id: string;
    nom: string;
    prenom: string;
    msisdn: string;
    email: string;
    password: string;
    role: string;
}
