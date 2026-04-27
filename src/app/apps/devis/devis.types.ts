import { Campagne } from '@/app/apps/campagne/campagne.types';
import { Remise } from '@/app/apps/remise/remise.types';

export interface Devis {
    id: string;
    dtCreated?: string;
    dtLastUpdate?: string;
    campagne?: Campagne;
    remise?: Remise;
}
