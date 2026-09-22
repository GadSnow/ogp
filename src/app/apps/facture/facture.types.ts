import { Campagne } from '@/app/apps/campagne/campagne.types';
import { Remise } from '@/app/apps/remise/remise.types';
import { Regie } from '@/app/apps/regie/regie.types';

/** Type de facture renvoyé par le backend sur toute réponse Facture. */
export type TypeFacture = 'campagne' | 'autorisation' | 'redevance';

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
     * Renseigné pour une facture de régie (autorisation ou redevance),
     * null pour une facture liée uniquement à une campagne.
     */
    regies?: Regie | null;
    typeFacture?: TypeFacture;
}

/**
 * Paramètres de POST /facture/add. `idCampagne` est facultatif : sans lui, il
 * s'agit d'une facture de redevance et `idRegie` + `montantBrute` sont requis.
 */
export interface AddFactureParams {
    idCampagne?: string;
    idRemise?: string;
    idRegie?: string;
    /** Montant saisi à la main, requis pour une facture de redevance (sans campagne). */
    montantBrute?: number;
}
