/* Mapper central des statuts — une seule source pour les libellés lisibles et
   les severities de Tag. Le backend renvoie des valeurs brutes (« pending_payment »,
   « terminee »…) qu'on traduit ici une bonne fois pour toutes. */

/** Transforme une valeur brute en libellé humain : minuscules, séparateurs →
   espaces, initiales capitalisées. */
function humanize(value?: string | null): string {
    if (!value) return '—';
    const str = String(value).trim().toLowerCase();
    if (!str) return '—';
    return str
        .replace(/[_-]+/g, ' ')
        .replace(/\s+/g, ' ')
        .split(' ')
        .map((mot) => mot.charAt(0).toUpperCase() + mot.slice(1))
        .join(' ');
}

/** Severities acceptées par <p-tag>. */
export type TagSeverity = 'success' | 'info' | 'warn' | 'danger' | 'secondary' | 'contrast';

const LIBELLES_STATUT_CAMPAGNE: Record<string, string> = {
    proposition: 'Proposition',
    actif: 'Active',
    'en cours': 'En cours',
    en_cours: 'En cours',
    terminee: 'Terminée',
    terminée: 'Terminée',
    annulee: 'Annulée',
    annulée: 'Annulée'
};

const SEVERITE_STATUT_CAMPAGNE: Record<string, TagSeverity> = {
    actif: 'success',
    'en cours': 'info',
    en_cours: 'info',
    terminee: 'success',
    annulee: 'danger',
    proposition: 'warn'
};

const LIBELLES_STATUT_PAIEMENT: Record<string, string> = {
    paye: 'Payé',
    payée: 'Payée',
    payee: 'Payé',
    partial: 'Partiel',
    partiel: 'Partiel',
    pending: 'En attente',
    pending_payment: 'En attente de paiement',
    'en attente': 'En attente',
    en_attente: 'En attente',
    en_attente_paiement: 'En attente de paiement'
};

const SEVERITE_STATUT_PAIEMENT: Record<string, TagSeverity> = {
    paye: 'success',
    partial: 'warn',
    partiel: 'warn',
    pending: 'warn',
    pending_payment: 'warn',
    'en attente': 'warn',
    en_attente: 'warn',
    en_attente_paiement: 'warn'
};

const LIBELLES_STATUT_TRANSACTION: Record<string, string> = {
    success: 'Réussi',
    paye: 'Payé',
    pending: 'En attente',
    failed: 'Échoué'
};

const SEVERITE_STATUT_TRANSACTION: Record<string, TagSeverity> = {
    success: 'success',
    paye: 'success',
    pending: 'warn',
    failed: 'danger'
};

export function getCampagneStatutLabel(statut?: string | null): string {
    return LIBELLES_STATUT_CAMPAGNE[statut?.toLowerCase() ?? ''] ?? humanize(statut);
}

export function getCampagneStatutSeverity(statut?: string | null): TagSeverity {
    return SEVERITE_STATUT_CAMPAGNE[statut?.toLowerCase() ?? ''] ?? 'secondary';
}

/** Statut de paiement d'une campagne (statutPaiement). */
export function getStatutPaiementLabel(statut?: string | null): string {
    return LIBELLES_STATUT_PAIEMENT[statut?.toLowerCase() ?? ''] ?? humanize(statut);
}

export function getStatutPaiementSeverity(statut?: string | null): TagSeverity {
    return SEVERITE_STATUT_PAIEMENT[statut?.toLowerCase() ?? ''] ?? 'secondary';
}

/** Statut d'une transaction de paiement (success / pending / failed). */
export function getPaiementStatutLabel(statut?: string | null): string {
    return LIBELLES_STATUT_TRANSACTION[statut?.toLowerCase() ?? ''] ?? humanize(statut);
}

export function getPaiementStatutSeverity(statut?: string | null): TagSeverity {
    return SEVERITE_STATUT_TRANSACTION[statut?.toLowerCase() ?? ''] ?? 'info';
}

/** Type d'une facture : liée à une campagne, à une autorisation, ou de redevance (montant saisi à la main). */
const LIBELLES_TYPE_FACTURE: Record<string, string> = {
    campagne: 'Campagne',
    autorisation: 'Autorisation',
    redevance: 'Redevance'
};

const SEVERITE_TYPE_FACTURE: Record<string, TagSeverity> = {
    campagne: 'secondary',
    autorisation: 'info',
    redevance: 'warn'
};

export function getFactureTypeLabel(type?: string | null): string {
    return LIBELLES_TYPE_FACTURE[type?.toLowerCase() ?? ''] ?? humanize(type);
}

export function getFactureTypeSeverity(type?: string | null): TagSeverity {
    return SEVERITE_TYPE_FACTURE[type?.toLowerCase() ?? ''] ?? 'secondary';
}
