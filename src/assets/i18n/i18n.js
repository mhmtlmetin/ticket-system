import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        welcome: "Welcome",
        login: "Login",
        username: "Usenname",
        password: "Password",
        search: "Search by title, category or status...",
        addNewTicket: "Add New Ticket",
        detail: "Detail",
        username_required: "Username is required",
        password_required: "Password is required",
        description: "Description",
        category: "Category",
        status: "Status",
        createdAt: "Created-at",
        createdBy: "created-by",
        save: "Save",
        comments:"Comments",
        addComment:"Add Comment",
        writeComment:"Write a comment..."
      },
    },
    tr: {
      translation: {
        welcome: "Hoşgeldiniz",
        login: "Giriş Yap",
        username: "Kullanıcı Adı",
        password: "Şifre",
        search: "Başlık, kategori veya statuse göre ara",
        addNewTicket: "Yeni Talep Ekle",
        detail: "Detay",
        username_required: "Kullanıcı adı boş olamaz",
        password_required: "Şifre alanı boş olamaz",
        description: "Açıklama",
        category: "Kategori",
        status: "Statü",
        createdAt: "Oluşturma Tarihi",
        createdBy: "Oluşturan",
        save: "Kaydet",
        comments:"Yorumlar",
        addComment:"Yorum Yap",
        writeComment:"Bir yorum yaz..."
      },
    },
  },
  lng: localStorage.getItem("lang") || "tr",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
