import { useTranslation } from "react-i18next";
import "../styles/languageSwitcher.scss";

const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "tr", label: "Türkçe" },
];
export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const current = i18n.language || localStorage.getItem("lang") || "en";

  const handleChange = (e) => {
    const selectedLang = e.target.value;
    i18n.changeLanguage(selectedLang);
    localStorage.setItem("lang", selectedLang);
  };

  return (
    <div className="container" aria-label="Language switcher">
      <div className="wrapper">
        <select
          className="select"
          value={current}
          onChange={handleChange}
          aria-label="Select language"
        >
          {LANGUAGES.map((l) => (
            <option key={l.code} value={l.code}>
              {l.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
