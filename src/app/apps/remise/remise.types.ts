export interface Remise {
    id: string;
    dtCreated: Date;
    dtLastUpdate: Date;
    typeRemise: string;
    valeurRemise: number;
    btEnabled: boolean;
}

export interface AddRemise {
    typeRemise: string;
    valeurRemise: number;
}
