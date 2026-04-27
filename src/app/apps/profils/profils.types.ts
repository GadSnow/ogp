export interface Profil {
    id: string;
    profil: string;
    code: string;
    dtCreated: string;
    description: string;
    btEnabled: boolean;
}

export interface Permission {
    id: string;
    code: string;
    description: string;
    module: string;
    displayedLabel: string;
    btEnabled: boolean;
}

export interface PermissionGroup {
    module: string;
    displayedLabel: string;
    viewOnlyId: string | null;
    fullAccessId: string | null;
    selection: 'view_only' | 'full_access' | null;
}

export interface AddProfilPayload {
    profils: {
        id?: string;
        profil: string;
        description: string;
    };
    permissions: {
        idPermission: string;
        btEnabled: boolean;
    }[];
}

export interface GetProfilResponse {
    profils: Profil;
    permission: Permission[];
}
