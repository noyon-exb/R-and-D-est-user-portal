import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { resources } from './constants/translationConstants';

i18n.use(initReactI18next).init({
    fallbackLng: 'en',
    react: {
        useSuspense: false,
    },
    resources: resources,
});

export default i18n;
