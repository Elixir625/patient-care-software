import { useState } from "react";
import { LANGUAGES, t } from "../types";

type Props = {
  currentLang: string;
  onChange: (code: string) => void;
  compact?: boolean;
};

export default function LanguageSelector({ currentLang, onChange, compact }: Props) {
  const [open, setOpen] = useState(false);
  const current = LANGUAGES.find((l) => l.code === currentLang) || LANGUAGES[0];

  if (compact) {
    return (
      <div className="relative">
        <button
          className="flex items-center gap-2 px-3 py-2 rounded-xl font-semibold text-sm transition-all"
          style={{ backgroundColor: "#EEF5FC", color: "#1B6CA8", border: "1.5px solid #C5DCF0" }}
          onClick={() => setOpen(!open)}
        >
          <span>{current.flag}</span>
          <span>{current.nativeLabel}</span>
          <span style={{ fontSize: "10px" }}>▼</span>
        </button>

        {open && (
          <div
            className="absolute right-0 top-full mt-2 rounded-xl shadow-xl z-50 overflow-hidden animate-float-up"
            style={{
              backgroundColor: "#fff",
              border: "1.5px solid #C5DCF0",
              minWidth: "180px",
            }}
          >
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                className="w-full flex items-center gap-3 px-4 py-3 text-left text-sm font-semibold transition-colors hover:bg-blue-50"
                style={{
                  color: lang.code === currentLang ? "#1B6CA8" : "#1A2332",
                  backgroundColor: lang.code === currentLang ? "#EEF5FC" : "transparent",
                }}
                onClick={() => {
                  onChange(lang.code);
                  setOpen(false);
                }}
              >
                <span className="text-base">{lang.flag}</span>
                <div>
                  <div>{lang.nativeLabel}</div>
                  <div className="text-xs font-normal" style={{ color: "#5A7896" }}>{lang.label}</div>
                </div>
                {lang.code === currentLang && <span className="ml-auto text-blue-600">✓</span>}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="p-6">
      <h3
        className="text-xl font-bold mb-4"
        style={{ fontFamily: "Poppins, sans-serif", color: "#1A2332" }}
      >
        {t("selectLang", currentLang)}
      </h3>
      <div className="grid grid-cols-2 gap-3">
        {LANGUAGES.map((lang) => (
          <button
            key={lang.code}
            className="touch-target flex items-center gap-3 rounded-xl px-4 py-3 font-semibold text-left transition-all active:scale-95"
            style={{
              backgroundColor: lang.code === currentLang ? "#1B6CA8" : "#EEF5FC",
              color: lang.code === currentLang ? "#fff" : "#1A2332",
              border: lang.code === currentLang ? "2px solid #1B6CA8" : "2px solid #C5DCF0",
            }}
            onClick={() => onChange(lang.code)}
          >
            <span className="text-2xl">{lang.flag}</span>
            <div>
              <div className="text-base">{lang.nativeLabel}</div>
              <div className="text-xs font-normal opacity-70">{lang.label}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
