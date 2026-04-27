import { Secteur } from '@/app/apps/secteur/secteur.types';
import { CaracteristiquePanneaux } from '@/app/apps/caracteristique-panneaux/caracteristique-panneaux.types';

export interface Panneau {
    id: string;
    dtCreated?: string;
    dtLastUpdate?: string;
    reference: string;
    latitude: number;
    longitude: number;
    btValide: boolean;
    btAvailable: boolean;
    hasSpecialPrice: boolean;
    priceDay: number;
    priceWeek: number;
    priceMonth: number;
    idUser?: string;
    caracteristiquePanneaux: CaracteristiquePanneaux;
    secteur: Secteur;
}

export interface AddPanneau {
    reference: string;
    latitude: number;
    longitude: number;
    btValide: boolean;
    btAvailable: boolean;
    hasSpecialPrice: boolean;
    priceDay: number;
    priceWeek: number;
    priceMonth: number;
}
