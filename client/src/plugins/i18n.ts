import i18n from 'i18next'
import {initReactI18next} from 'react-i18next'
import en from '../assets/locales/en.json'

const FALLBACK_LANG = 'en'

const resources = {
    en: en
}

await i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: FALLBACK_LANG,
        interpolation: {
            escapeValue: false
        }
    })

export default i18n