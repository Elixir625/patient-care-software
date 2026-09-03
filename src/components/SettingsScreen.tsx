import { t, LANGUAGES } from "../types";

type Props = { lang: string; onLangChange: (code: string) => void; onLogout: () => void };

export default function SettingsScreen({ lang, onLangChange, onLogout }: Props) {
  return (
    <div className="max-w-2xl mx-auto px-4 py-6 space-y-5">
      <h2
        className="text-2xl font-black"
        style={{ fontFamily: "Poppins, sans-serif", color: "#1A2332" }}
      >
        {t("settings", lang)}
      </h2>

      {/* Language */}
      <Section title={lang === "hi" ? "भाषा सेटिंग्स" : "Language Settings"} icon="🌐">
        <div className="grid grid-cols-2 gap-2">
          {LANGUAGES.map((l) => (
            <button
              key={l.code}
              className="touch-target flex items-center gap-2 rounded-xl px-3 py-3 font-semibold text-sm transition-all"
              style={{
                backgroundColor: lang === l.code ? "#1B6CA8" : "#EEF5FC",
                color: lang === l.code ? "#fff" : "#1A2332",
                border: `1.5px solid ${lang === l.code ? "#1B6CA8" : "#C5DCF0"}`,
              }}
              onClick={() => onLangChange(l.code)}
            >
              <span>{l.flag}</span>
              <div>
                <div>{l.nativeLabel}</div>
                <div className="text-xs opacity-70">{l.label}</div>
              </div>
              {lang === l.code && <span className="ml-auto">✓</span>}
            </button>
          ))}
        </div>
      </Section>

      {/* Accessibility */}
      <Section title={lang === "hi" ? "सुलभता" : "Accessibility"} icon="♿">
        <div className="space-y-3">
          {[
            { label: lang === "hi" ? "बड़े बटन" : "Large Buttons", checked: true },
            { label: lang === "hi" ? "आवाज मार्गदर्शन" : "Voice Guidance", checked: true },
            { label: lang === "hi" ? "उच्च कंट्रास्ट" : "High Contrast", checked: false },
            { label: lang === "hi" ? "स्वत: पढ़ना" : "Auto-read Text", checked: false },
          ].map((item) => (
            <div key={item.label} className="flex items-center justify-between px-4 py-3 rounded-xl" style={{ backgroundColor: "#fff", border: "1.5px solid #C5DCF0" }}>
              <span className="font-semibold text-sm" style={{ color: "#1A2332" }}>{item.label}</span>
              <div
                className="w-12 h-7 rounded-full transition-colors relative cursor-pointer"
                style={{ backgroundColor: item.checked ? "#0A9E74" : "#D8E8F4" }}
              >
                <div
                  className="absolute top-1 w-5 h-5 rounded-full bg-white shadow transition-all"
                  style={{ left: item.checked ? "calc(100% - 24px)" : "4px" }}
                />
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Security */}
      <Section title={lang === "hi" ? "सुरक्षा और गोपनीयता" : "Security & Privacy"} icon="🔒">
        <div className="space-y-2">
          {[
            { icon: "🔐", label: lang === "hi" ? "ABDM Consent प्रबंधन" : "ABDM Consent Management" },
            { icon: "📋", label: lang === "hi" ? "डेटा उपयोग की जानकारी" : "Data Usage Log" },
            { icon: "🗑️", label: lang === "hi" ? "मेरा डेटा हटाएं" : "Delete My Data" },
          ].map((item) => (
            <button
              key={item.label}
              className="w-full touch-target flex items-center gap-3 rounded-xl px-4 py-3 text-left transition-colors hover:bg-blue-50"
              style={{ backgroundColor: "#fff", border: "1.5px solid #C5DCF0" }}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="font-semibold text-sm" style={{ color: "#1A2332" }}>{item.label}</span>
              <span className="ml-auto" style={{ color: "#5A7896" }}>›</span>
            </button>
          ))}
        </div>
      </Section>

      <div
        className="rounded-xl p-4 text-center"
        style={{ backgroundColor: "#EEF5FC", border: "1.5px solid #C5DCF0" }}
      >
        <p className="text-xs font-semibold" style={{ color: "#5A7896" }}>
          MediKiosk v2.4.1 • ABDM Certified • ISO 27001 • DPDP 2023 Compliant
        </p>
        <p className="text-xs mt-1" style={{ color: "#5A7896" }}>
          Secure session • Data encrypted at rest and in transit
        </p>
      </div>

      <button
        className="w-full touch-target rounded-xl py-4 font-bold text-base transition-colors"
        style={{ backgroundColor: "#FEF2F2", color: "#DC2626", border: "1.5px solid #FCA5A5" }}
        onClick={onLogout}
      >
        {lang === "hi" ? "लॉग आउट करें" : "Log Out"}
      </button>
    </div>
  );
}

function Section({ title, icon, children }: { title: string; icon: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <span>{icon}</span>
        <h3 className="font-bold text-base" style={{ fontFamily: "Poppins, sans-serif", color: "#1A2332" }}>{title}</h3>
      </div>
      {children}
    </div>
  );
}
