export type Langue = 'fr' | 'en' | 'pt';

export interface Regie {
    id: string;
    dtCreated?: string;
    dtLastUpdate?: string;
    denomination: string;
    sigle: string;
    nomResponsable: string;
    prenomResponsable: string;
    emailResponsable: string;
    telephoneResponsable: string;
    adresse: string;
    btEnabled: boolean;
    langue: Langue;
}

export interface AddRegie {
    denomination: string;
    /** Facultatif. */
    sigle?: string;
    nomResponsable: string;
    prenomResponsable: string;
    /** Facultatif. */
    emailResponsable?: string;
    telephoneResponsable: string;
    adresse: string;
    /** Non géré côté formulaire (plus de champ d'activation). */
    btEnabled?: boolean;
    /** Non géré côté formulaire (champ supprimé). */
    langue?: Langue;
    /** Envoyé en écriture uniquement, jamais renvoyé par l'API. */
    password?: string;
}
