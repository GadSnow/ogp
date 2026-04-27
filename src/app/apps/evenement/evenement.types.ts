import { TypeEvenement } from '@/app/apps/type-evenement/type-evenement.types';
import { Panneau } from '@/app/apps/panneau/panneau.types';

export interface Profil {
    id: string;
    profil: string;
    dtCreated?: string;
    description: string;
    btEnabled: boolean;
}

export interface User {
    id: string;
    dtCreated?: string;
    dtLastUpdate?: string;
    nom: string;
    prenom: string;
    msisdn: string;
    email: string;
    password?: string;
    role: string;
    btEnabled: boolean;
    isFirstLogin: boolean;
    idUser?: string;
    profils?: Profil;
}

export interface Evenement {
    id: string;
    dtCreated?: string;
    dtLastUpdate?: string;
    dateEvenement: string | Date;
    commentaire: string;
    coutTotal: number;
    typeEvenement: TypeEvenement;
    user?: User;
    panneau: Panneau;
}

export interface AddEvenement {
    dateEvenement: string | Date;
    commentaire: string;
    coutTotal: number;
}
