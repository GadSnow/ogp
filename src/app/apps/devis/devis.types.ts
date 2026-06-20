import { Campagne } from '@/app/apps/campagne/campagne.types';
import { Client } from '@/app/apps/client/client.types';
import { Remise } from '@/app/apps/remise/remise.types';

export interface Devis {
    id: string;
    dtCreated?: string;
    dtLastUpdate?: string;
    numeroDevis?: string;
    dateEmission?: string;
    dateValidite?: string;
    dateDebutPrevu?: string;
    dateFinPrevu?: string;
    montantBrute?: number;
    montantRemise?: number;
    montantNet?: number;
    observations?: string | null;
    btEnabled?: boolean;
    client?: Client;
    user?: null;
    remise?: Remise;
    campagne?: Campagne;
}
