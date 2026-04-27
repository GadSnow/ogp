export interface Region {
    id: string;
    region: string;
    btEnabled: boolean;
}

export interface Commune {
    id: string;
    commune: string;
    btEnabled: boolean;
    region: Region;
}

export interface AddCommune {
    commune: string;
}
