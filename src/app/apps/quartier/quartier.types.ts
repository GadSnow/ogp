export interface Commune {
    id: string;
    commune: string;
    btEnabled: boolean;
    region: Region;
}

export interface Region {
    id: string;
    region: string;
    btEnabled: boolean;
}

export interface Quartier {
    id: string;
    quartier: string;
    btEnabled: boolean;
    commune: Commune;
}

export interface AddQuartier {
    quartier: string;
}
