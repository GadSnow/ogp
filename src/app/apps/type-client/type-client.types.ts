export interface TypeClient {
    id: string;
    typeClient: string;
    description: string;
    btEnabled: boolean;
}

export interface AddTypeClient {
    typeClient: string;
    description: string;
}
