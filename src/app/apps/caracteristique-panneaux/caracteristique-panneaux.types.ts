import { CategoriePanneaux } from '@/app/apps/categorie-panneaux/categorie-panneaux.types';

export interface CaracteristiquePanneaux {
    id: string;
    dtCreated: string;
    dtLastUpdate: string;
    type: string;
    caracteristique: string;
    dimenssion: string;
    longeur: number;
    largeur: number;
    btEnabled: boolean;
    categoriePanneaux: CategoriePanneaux;
}

export interface AddCaracteristiquePanneaux {
    type: string;
    caracteristique: string;
    dimenssion: string;
    longeur: number;
    largeur: number;
}
