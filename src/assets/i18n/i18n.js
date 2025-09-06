import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        welcome: "Welcome",
        login: "Login",
        username:"Usenname",
        password:"Password"
      },
    },
    tr: {
      translation: {
        welcome: "Hoşgeldiniz",
        login: "Giriş Yap",
        username:"Kullanıcı Adı",
        password:"Şifre"
      },
    }
  },
  lng: localStorage.getItem("lang") || "tr",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;