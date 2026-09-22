import { Facture } from '@/app/apps/facture/facture.types';
import { ModePaiement } from '@/app/apps/mode-paiement/mode-paiement.types';

export interface Paiement {
    id: string;
    dtCreated?: string;
    dtLastUpdate?: string;
    montant: number;
    reference?: string | null;
    referenceExterne?: string | null;
    statut?: string;
    message?: string | null;
    modePaiement?: ModePaiement;
    facture?: Facture;
    user?: any;
    /** Nom d'origine du justificatif (Chèque / Virement) ; absent sinon. */
    justificatifNomFichier?: string | null;
    /** Type MIME du justificatif, pour l'affichage/téléchargement. */
    justificatifTypeMime?: string | null;
}

export interface AddPaiement {
    referenceFacture: string;
    montant: number;
    modePaiement: string;
    message?: string | null;
    /** Obligatoire si `modePaiement` vaut Chèque ou Virement. */
    justificatif?: File | null;
}
