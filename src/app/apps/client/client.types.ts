import { TypeClient } from '@/app/apps/type-client/type-client.types';

export interface Client {
    id: string;
    denomination: string;
    sigle: string;
    domaineActivite: string;
    nomResponsable: string;
    prenomResponsable: string;
    emailResponsable: string;
    telephoneResponsable: string;
    adresse: string;
    btEnabled: boolean;
    typeClient: TypeClient;
}

export interface AddClient {
    denomination: string;
    sigle: string;
    domaineActivite: string;
    nomResponsable: string;
    prenomResponsable: string;
    emailResponsable: string;
    telephoneResponsable: string;
    adresse: string;
}
