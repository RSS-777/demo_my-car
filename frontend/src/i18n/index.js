import i18n from 'i18next';
import { initReactI18next, Translation } from 'react-i18next';
import en from './en.json';
import ru from './ru.json';
import ua from './ua.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
        ua: {
            translation: ua
        },
        ru: {
           translation: ru 
        },
        en: {
            translation: en
        }
    },
    lng: 'ua',
    fallbackLng: 'ua',
    interpolation: {
        escapeValue: false
    }
  })