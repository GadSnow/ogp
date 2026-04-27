export interface ModePaiement {
    id: string;
    mode: string;
    description: string;
    btEnabled: boolean;
}

export interface AddModePaiement {
    mode: string;
    description: string;
}
