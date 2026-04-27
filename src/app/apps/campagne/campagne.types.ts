import { Client } from '@/app/apps/client/client.types';
import { User } from '@/app/apps/evenement/evenement.types';
import { Panneau } from '@/app/apps/panneau/panneau.types';

export interface Campagne {
    id: string;
    dtCreated?: string;
    dtLastUpdate?: string;
    dateDebut: string | Date;
    dateFin: string | Date;
    nomCampagne: string;
    description: string;
    cycle: string;
    statut: string;
    statutPaiement: string;
    client: Client;
    user?: User;
}

export interface AddCampagne {
    dateDebut: string | Date;
    dateFin: string | Date;
    nomCampagne: string;
    description: string;
    cycle: string;
    statut: string;
    statutPaiement?: string;
}

export interface CampagnePayload {
    campagne: AddCampagne | Partial<Campagne>;
    panneauxIds: string[];
}
