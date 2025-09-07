import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        welcome: "Welcome",
        login: "Login",
        username:"Usenname",
        password:"Password",
        search:"Search by title, category or status...",
        addNewTicket:"Add New Ticket",
        detail:"Detail",
        username_required:"Username is required",
        password_required:"Password is required"
      },
    },
    tr: {
      translation: {
        welcome: "Hoşgeldiniz",
        login: "Giriş Yap",
        username:"Kullanıcı Adı",
        password:"Şifre",
        search:"Başlık, kategori veya statuse göre ara",
        addNewTicket:"Yeni Talep Ekle",
        detail:"Detay",
        username_required:"Kullanıcı adı boş olamaz",
        password_required:"Şifre alanı boş olamaz"
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