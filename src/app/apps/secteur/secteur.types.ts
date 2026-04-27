export interface Secteur {
    id: string;
    secteur: string;
    btEnabled: boolean;
    quartier: import('@/app/apps/quartier/quartier.types').Quartier;
}

export interface AddSecteur {
    secteur: string;
}
