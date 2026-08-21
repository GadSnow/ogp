import Aura from '@primeuix/themes/aura';
import { definePreset } from '@primeuix/themes';

/**
 * Charte graphique OGP — source unique de vérité.
 *
 * Ces palettes sont consommées à deux endroits qui doivent rester d'accord :
 *   - `appConfig` (providePrimeNG) pour le rendu initial ;
 *   - `AppConfigurator`, qui réapplique un preset au démarrage et écraserait
 *     silencieusement la marque s'il ne partageait pas les mêmes valeurs.
 */

/** Bleu roi du logo — porte les actions (boutons, liens, focus). 600 = couleur de référence. */
export const OGP_PRIMARY: Record<string, string> = {
    50: '#f3f6fc',
    100: '#e2e9f8',
    200: '#c5d3f1',
    300: '#9cb4e8',
    400: '#6a8edc',
    500: '#3063cf',
    600: '#1f4493',
    700: '#1a387a',
    800: '#152d61',
    900: '#10234c',
    950: '#0b1732'
};

/**
 * Jaune d'or du logo — accent uniquement. 500 plafonne à 1,56:1 sur blanc :
 * jamais en texte, jamais en fond de bouton avec un libellé blanc.
 * Usages : sélection active, liseré de ligne, badges (texte foncé), séries de graphiques.
 */
export const OGP_ACCENT: Record<string, string> = {
    50: '#fffaeb',
    100: '#fff4d1',
    200: '#ffe9a8',
    300: '#ffde7a',
    400: '#ffd147',
    500: '#ffc71f',
    600: '#f5b800',
    700: '#cc9900',
    800: '#a37a00',
    900: '#745906',
    950: '#493704'
};

/** Neutres — surfaces, bordures, texte. */
export const OGP_SURFACE: Record<string, string> = {
    0: '#ffffff',
    50: '#f9fafb',
    100: '#f4f4f6',
    200: '#e5e7eb',
    300: '#d1d4db',
    400: '#a4a9b7',
    500: '#798196',
    600: '#5c6475',
    700: '#464b59',
    800: '#31353f',
    900: '#22242b',
    950: '#14161a'
};

/**
 * Extension sémantique de la marque. Le configurator la réutilise telle quelle
 * via `getPresetExt()` lorsque la couleur primaire sélectionnée est « ogp ».
 */
export const ogpPresetExt = {
    semantic: {
        primary: OGP_PRIMARY,
        colorScheme: {
            light: {
                surface: OGP_SURFACE,
                primary: {
                    color: '{primary.600}',
                    contrastColor: '#ffffff',
                    hoverColor: '{primary.700}',
                    activeColor: '{primary.800}'
                },
                highlight: {
                    background: '{primary.50}',
                    focusBackground: '{primary.100}',
                    color: '{primary.700}',
                    focusColor: '{primary.800}'
                }
            },
            dark: {
                surface: OGP_SURFACE,
                primary: {
                    color: '{primary.400}',
                    contrastColor: '{surface.950}',
                    hoverColor: '{primary.300}',
                    activeColor: '{primary.200}'
                },
                highlight: {
                    background: 'color-mix(in srgb, {primary.400}, transparent 84%)',
                    focusBackground: 'color-mix(in srgb, {primary.400}, transparent 76%)',
                    color: 'rgba(255,255,255,.87)',
                    focusColor: 'rgba(255,255,255,.87)'
                }
            }
        }
    }
};

/**
 * Couleurs sémantiques de la charte. On ne surcharge que les nuances réellement
 * utilisées par les Tag / Message de PrimeNG (fond 50-100, texte 500-700) :
 * `definePreset` fusionne en profondeur, le reste de l'échelle Aura est conservé.
 */
const semanticPrimitives = {
    green: { 50: '#f3fcf8', 100: '#e7f8f0', 500: '#2c9664', 700: '#1b6a45' },
    blue: { 50: '#f2f8fd', 100: '#e5f1fa', 500: '#2280c3', 700: '#175582' },
    orange: { 50: '#fef9f0', 100: '#fef3e2', 500: '#f59f0a', 700: '#97520c' },
    red: { 50: '#fdf2f2', 100: '#fbeaea', 500: '#c1252a', 700: '#81181c' },
    yellow: OGP_ACCENT
};

/** Preset complet : Aura + marque OGP + densité back-office. */
export const OgpPreset = definePreset(Aura, {
    primitive: semanticPrimitives,
    semantic: {
        ...ogpPresetExt.semantic,
        borderRadius: {
            none: '0',
            xs: '2px',
            sm: '4px',
            md: '6px',
            lg: '10px',
            xl: '14px'
        },
        // Densité : champ de saisie 34px (6 + 20 de ligne + 6 + 2 de bordure).
        formField: {
            paddingX: '0.625rem',
            paddingY: '0.375rem',
            borderRadius: '{border.radius.md}'
        }
    }
});
