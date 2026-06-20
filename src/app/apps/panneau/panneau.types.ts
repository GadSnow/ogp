import { Secteur } from '@/app/apps/secteur/secteur.types';
import { CaracteristiquePanneaux } from '@/app/apps/caracteristique-panneaux/caracteristique-panneaux.types';

export interface Tarif {
    id: string;
    dtCreated?: string;
    dtLastUpdate?: string;
    priceDay: number;
    priceWeek: number;
    priceMonth: number;
    btEnabled: boolean;
    caracteristiquePanneaux?: CaracteristiquePanneaux;
}

export interface PanneauDetail {
    panneau: Panneau;
    tarif: Tarif | null;
}

export interface Panneau {
    id: string;
    dtCreated?: string;
    dtLastUpdate?: string;
    reference: string;
    latitude: number;
    longitude: number;
    nombreFace: number;
    face: string;
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
    nombreFace: number;
    face: string;
    btValide: boolean;
    btAvailable: boolean;
    hasSpecialPrice: boolean;
    priceDay: number;
    priceWeek: number;
    priceMonth: number;
}
