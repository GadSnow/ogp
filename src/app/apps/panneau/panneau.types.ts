import { Secteur } from '@/app/apps/secteur/secteur.types';
import { CaracteristiquePanneaux } from '@/app/apps/caracteristique-panneaux/caracteristique-panneaux.types';
import { Regie } from '@/app/apps/regie/regie.types';

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
    /** Facultatif. */
    latitude?: number;
    /** Facultatif. */
    longitude?: number;
    nombreFace: number;
    face: string;
    btValide: boolean;
    btAvailable: boolean;
    hasSpecialPrice: boolean;
    priceDay: number;
    priceWeek: number;
    priceMonth: number;
    /** Prix par défaut de la régie (par cycle). */
    defaultPrice?: number;
    /** Régie propriétaire du panneau ; null pour les anciens panneaux. */
    regies: Regie | null;
    idUser?: string;
    caracteristiquePanneaux: CaracteristiquePanneaux;
    secteur: Secteur;
}

export interface AddPanneau {
    reference: string;
    /** Facultatif. */
    latitude?: number;
    /** Facultatif. */
    longitude?: number;
    nombreFace: number;
    face: string;
    btValide: boolean;
    btAvailable: boolean;
    hasSpecialPrice: boolean;
    priceDay: number;
    priceWeek: number;
    priceMonth: number;
    defaultPrice: number;
}

/**
 * Filtre géographique de /panneau/getbylocalisation.
 * Les quatre niveaux sont optionnels et cumulables.
 */
export interface LocalisationFiltre {
    idRegion?: string;
    idCommune?: string;
    idQuartier?: string;
    idSecteur?: string;
}
