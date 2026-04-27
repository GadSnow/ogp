import { CaracteristiquePanneaux } from '@/app/apps/caracteristique-panneaux/caracteristique-panneaux.types';

export interface Tarif {
    id: string;
    dtCreated?: string;
    dtLastUpdate?: string;
    priceDay: number;
    priceWeek: number;
    priceMonth: number;
    btEnabled: boolean;
    caracteristiquePanneaux: CaracteristiquePanneaux;
}

export interface AddTarif {
    priceDay: number;
    priceWeek: number;
    priceMonth: number;
    btEnabled: boolean;
}
