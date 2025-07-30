import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import languageKeys from './language.keys';

import en from './locales/en.json';
import al from './locales/al.json';

const resources = {
    en,
    al
};

i18n.use(initReactI18next).init({
    resources,
    lng: languageKeys.english,
    fallbackLng: languageKeys.english,
    interpolation: {
        escapeValue: false
    }
});

export default i18n;
