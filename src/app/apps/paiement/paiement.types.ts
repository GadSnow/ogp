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
}

export interface AddPaiement {
    referenceFacture: string;
    montant: number;
    modePaiement: string;
    message?: string | null;
}
