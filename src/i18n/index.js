import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Çeviri kaynaklarını içeren dosyalar
import enTranslation from './locales/en.json';
import trTranslation from './locales/tr.json';


i18n
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    resources: {
      en: {
        translation: require('./locales/en.json')
      },
      tr: {
        translation: require('./locales/tr.json')
      }
    },
    lng: 'tr', // varsayılan dil ayarı
    fallbackLng: 'tr', // kullanılmayan bir dil geldiğinde varsayılan dil
    interpolation: {
      escapeValue: false // HTML etiketlerini çeviriye dahil etmek için false olarak ayarlanır
    }
  });

export default i18n;

