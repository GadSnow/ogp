import { Campagne } from '@/app/apps/campagne/campagne.types';
import { Remise } from '@/app/apps/remise/remise.types';

export interface Facture {
    id: string;
    dtCreated?: string;
    dtLastUpdate?: string;
    dateEcheance?: string;
    montantBrute?: number;
    montantRemise?: number;
    montantNet?: number;
    montantPaye?: number;
    montantResteAPaye?: number;
    reference?: string | null;
    user?: null;
    remise?: Remise | null;
    campagne?: Campagne;
}
