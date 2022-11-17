import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import translationEN from "./en/en.json";
import translationPT from "./pt/pt.json";
import translationES from "./es/es.json";
const resources = {
    en: {
        translation: translationEN,
    },
    pt: {
        translation: translationPT,
    },
    es: {
        translation: translationES,
    },
};
i18n
   
    .use(LanguageDetector) // detect user language
    .use(initReactI18next) // pass the i18n instance to react-i18next.
    .init({
       
        resources,
        lng: localStorage.getItem('i18nextLng') || "pt",
        interpolation: {
            escapeValue: false,
        },
        keySeparator: ".",
    });
export default i18n;
