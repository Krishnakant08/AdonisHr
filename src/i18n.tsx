import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './data/en.json';
import fr from './data/fr.json';

i18n
    .use(LanguageDetector) // Automatically detect browser language
    .use(initReactI18next)
    .init({
        resources: {
            en: { translation: en },
            fr: { translation: fr }
        },
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false // React already escapes
        }
    });

export default i18n;
