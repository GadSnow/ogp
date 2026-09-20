import { Campagne } from '@/app/apps/campagne/campagne.types';
import { Remise } from '@/app/apps/remise/remise.types';
import { Regie } from '@/app/apps/regie/regie.types';

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
    /**
     * Renseigné pour une « facture de régie » (somme des prix par défaut, sans
     * remise), null pour une « facture historique » liée à une campagne.
     */
    regies?: Regie | null;
}

/** Type de facture, déduit du champ `regies` : régie si présent, sinon historique. */
export type TypeFacture = 'regie' | 'historique';
