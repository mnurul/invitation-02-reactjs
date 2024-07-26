import { useTranslation } from "react-i18next";
import { useContext, useState } from "react";
import i18next from "i18next";
import { DarkMode } from "../../context/DarkMode";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";

export default function Header() {
  const [t, i18n] = useTranslation("global");
  const [activeLang, setActiveLang] = useState(i18next.language);

  const handleChangeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    setActiveLang(lang);
  };

  const { isDarkMode, setIsDarkMode } = useContext(DarkMode);

  return (
    <div className="flex flex-row items-center justify-end w-full max-w-screen-sm gap-3 h-[75px] px-4">
      {/* btn dark mode */}
      <button
        onClick={() => setIsDarkMode(!isDarkMode)}
        className="px-2 text-sm font-medium border border-white rounded text-soft-white h-7"
      >
        {isDarkMode === true ? <MdOutlineLightMode /> : <MdOutlineDarkMode />}
      </button>

      {/* btn language */}
      <div className="flex flex-row items-center justify-center gap-2 px-2 text-sm bg-transparent border border-white rounded h-7 text-soft-white">
        <button
          className={`flex justify-center items-center ${
            activeLang === "eng" ? "font-medium" : "font-light"
          }`}
          onClick={() => handleChangeLanguage("eng")}
        >
          EN
        </button>
        <span className="pb-1">|</span>
        <button
          className={`flex justify-center items-center ${
            activeLang === "idn" ? "font-medium" : "font-light"
          }`}
          onClick={() => handleChangeLanguage("idn")}
        >
          ID
        </button>
      </div>
    </div>
  );
}
