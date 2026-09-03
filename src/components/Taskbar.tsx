import { AppScreen, t } from "../types";
import LanguageSelector from "./LanguageSelector";

type Props = {
  currentScreen: AppScreen;
  onNavigate: (screen: AppScreen) => void;
  onEmergency: () => void;
  lang: string;
  onLangChange: (code: string) => void;
  patientName?: string;
};

export default function Taskbar({
  currentScreen,
  onNavigate,
  onEmergency,
  lang,
  onLangChange,
  patientName,
}: Props) {
  const navItems: { screen: AppScreen; icon: string; labelKey: string }[] = [
    { screen: "home", icon: "🏠", labelKey: "home" },
    { screen: "interview", icon: "💬", labelKey: "aiInterview" },
    { screen: "documents", icon: "📁", labelKey: "documents" },
    { screen: "history", icon: "📋", labelKey: "history" },
  ];

  return (
    <header
      className="sticky top-0 z-30 w-full"
      style={{
        background: "linear-gradient(135deg, #1B6CA8 0%, #0E4D7B 100%)",
        boxShadow: "0 2px 16px rgba(27,108,168,0.25)",
      }}
    >
      {/* Top strip */}
      <div className="flex items-center justify-between px-4 py-2">
        {/* Logo + name */}
        <button
          className="flex items-center gap-2.5 transition-opacity hover:opacity-90"
          onClick={() => onNavigate("home")}
        >
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-xl font-black"
            style={{ backgroundColor: "rgba(255,255,255,0.2)", fontFamily: "Poppins, sans-serif" }}
          >
            ✚
          </div>
          <div>
            <p className="text-white font-black text-lg leading-none" style={{ fontFamily: "Poppins, sans-serif" }}>
              MediKiosk
            </p>
            <p className="text-white/70 text-xs">ABDM Connected</p>
          </div>
        </button>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <LanguageSelector currentLang={lang} onChange={onLangChange} compact />

          <button
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-white/90 hover:bg-white/10 transition-colors text-sm font-semibold"
            onClick={() => onNavigate("account")}
          >
            <span className="text-xl">👤</span>
            <span className="hidden sm:inline">{patientName || t("account", lang)}</span>
          </button>

          <button
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-white/90 hover:bg-white/10 transition-colors text-sm font-semibold"
            onClick={() => onNavigate("settings")}
          >
            <span className="text-xl">⚙️</span>
          </button>

          {/* Camera OCR */}
          <button
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-white/90 hover:bg-white/10 transition-colors text-sm font-semibold"
            onClick={() => onNavigate("documents")}
            title={t("camera", lang)}
          >
            <span className="text-xl">📷</span>
          </button>

          {/* Emergency */}
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-sm text-white transition-transform active:scale-95"
            style={{ backgroundColor: "#DC2626" }}
            onClick={onEmergency}
          >
            <span className="text-lg">🚨</span>
            <span className="hidden sm:inline">{t("emergency", lang)}</span>
          </button>
        </div>
      </div>

      {/* Bottom nav */}
      <nav
        className="flex items-center px-4 pb-0 gap-1"
        style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}
      >
        {navItems.map((item) => {
          const active = currentScreen === item.screen;
          return (
            <button
              key={item.screen}
              className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold transition-all relative"
              style={{
                color: active ? "#fff" : "rgba(255,255,255,0.65)",
                borderBottom: active ? "3px solid #0A9E74" : "3px solid transparent",
              }}
              onClick={() => onNavigate(item.screen)}
            >
              <span>{item.icon}</span>
              <span>{t(item.labelKey, lang)}</span>
            </button>
          );
        })}
      </nav>
    </header>
  );
}
