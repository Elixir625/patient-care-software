import { useState } from "react";
import { PatientProfile, t, LANGUAGES } from "../types";
import LanguageSelector from "./LanguageSelector";

type Props = {
  lang: string;
  onLangChange: (code: string) => void;
  onLogin: (profile: PatientProfile) => void;
};

type Step = "language" | "auth" | "consent" | "register";

const DEMO_PATIENT: PatientProfile = {
  name: "Ramesh Kumar",
  abhaId: "91-1234-5678-9012",
  age: 58,
  gender: "Male",
  language: "hi",
  phone: "98765 43210",
};

export default function LoginScreen({ lang, onLangChange, onLogin }: Props) {
  const [step, setStep] = useState<Step>("language");
  const [authMode, setAuthMode] = useState<"abha" | "aadhaar">("abha");
  const [abhaValue, setAbhaValue] = useState("");
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [registerData, setRegisterData] = useState({
    name: "", age: "", phone: "", gender: "Male",
  });

  const playAudio = () => {
    setAudioPlaying(true);
    setTimeout(() => setAudioPlaying(false), 3000);
  };

  if (step === "language") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6" style={{ backgroundColor: "#EEF5FC" }}>
        {/* Logo */}
        <div className="text-center mb-8 animate-float-up">
          <div
            className="w-24 h-24 rounded-3xl mx-auto mb-4 flex items-center justify-center text-5xl"
            style={{ background: "linear-gradient(135deg, #1B6CA8 0%, #0A9E74 100%)", boxShadow: "0 8px 32px rgba(27,108,168,0.3)" }}
          >
            ✚
          </div>
          <h1
            className="text-4xl font-black text-blue-900"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            MediKiosk
          </h1>
          <p className="text-lg font-semibold mt-1" style={{ color: "#5A7896" }}>
            {t("subtitle", lang)}
          </p>
          <div className="flex items-center justify-center gap-2 mt-2">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: "#0A9E74" }} />
            <span className="text-sm font-medium" style={{ color: "#0A9E74" }}>ABDM • FHIR Compliant • DPDP 2023</span>
          </div>
        </div>

        <div
          className="w-full max-w-lg rounded-2xl p-6 shadow-xl"
          style={{ backgroundColor: "#fff", border: "1.5px solid #C5DCF0" }}
        >
          <h2
            className="text-xl font-bold mb-2 text-center"
            style={{ fontFamily: "Poppins, sans-serif", color: "#1A2332" }}
          >
            {t("selectLang", lang)}
          </h2>
          <p className="text-center text-sm mb-4" style={{ color: "#5A7896" }}>
            Choose your preferred language • अपनी भाषा चुनें
          </p>
          <div className="grid grid-cols-2 gap-3">
            {LANGUAGES.map((language) => (
              <button
                key={language.code}
                className="touch-target flex items-center gap-3 rounded-xl px-4 py-3 font-semibold text-left transition-all active:scale-95"
                style={{
                  backgroundColor: lang === language.code ? "#1B6CA8" : "#EEF5FC",
                  color: lang === language.code ? "#fff" : "#1A2332",
                  border: `2px solid ${lang === language.code ? "#1B6CA8" : "#C5DCF0"}`,
                }}
                onClick={() => onLangChange(language.code)}
              >
                <span className="text-2xl">{language.flag}</span>
                <div>
                  <div className="text-base">{language.nativeLabel}</div>
                  <div className="text-xs opacity-70">{language.label}</div>
                </div>
              </button>
            ))}
          </div>
          <button
            className="w-full touch-target mt-5 rounded-xl py-4 text-lg font-bold text-white transition-transform active:scale-95"
            style={{
              background: "linear-gradient(135deg, #1B6CA8 0%, #0A9E74 100%)",
              fontFamily: "Poppins, sans-serif",
            }}
            onClick={() => setStep("auth")}
          >
            {t("start", lang)} →
          </button>
        </div>

        <p className="text-center text-xs mt-4" style={{ color: "#5A7896" }}>
          🔒 Secured by ABDM • ISO 27001 Certified
        </p>
      </div>
    );
  }

  if (step === "auth") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6" style={{ backgroundColor: "#EEF5FC" }}>
        <div className="w-full max-w-md">
          <button
            className="flex items-center gap-2 text-sm font-semibold mb-6"
            style={{ color: "#1B6CA8" }}
            onClick={() => setStep("language")}
          >
            ← {t("back", lang)}
          </button>

          <div
            className="rounded-2xl p-7 shadow-xl"
            style={{ backgroundColor: "#fff", border: "1.5px solid #C5DCF0" }}
          >
            <div className="text-center mb-6">
              <div className="text-4xl mb-2">🏥</div>
              <h2
                className="text-2xl font-bold"
                style={{ fontFamily: "Poppins, sans-serif", color: "#1A2332" }}
              >
                {t("loginWith", lang)}
              </h2>
            </div>

            {/* Toggle */}
            <div
              className="flex rounded-xl p-1 mb-6"
              style={{ backgroundColor: "#EEF5FC" }}
            >
              {(["abha", "aadhaar"] as const).map((mode) => (
                <button
                  key={mode}
                  className="flex-1 py-2.5 rounded-lg font-bold text-sm transition-all"
                  style={{
                    backgroundColor: authMode === mode ? "#1B6CA8" : "transparent",
                    color: authMode === mode ? "#fff" : "#5A7896",
                  }}
                  onClick={() => setAuthMode(mode)}
                >
                  {mode === "abha" ? "ABHA ID" : "Aadhaar"}
                </button>
              ))}
            </div>

            <input
              className="w-full touch-target rounded-xl px-4 py-3.5 text-base font-semibold outline-none mb-3"
              style={{
                border: "2px solid #C5DCF0",
                backgroundColor: "#EEF5FC",
                color: "#1A2332",
              }}
              placeholder={authMode === "abha" ? t("abhaPlaceholder", lang) : t("aadhaarPlaceholder", lang)}
              value={abhaValue}
              onChange={(e) => setAbhaValue(e.target.value)}
              inputMode="numeric"
            />

            <p className="text-center text-sm mb-4" style={{ color: "#5A7896" }}>
              {t("orScan", lang)} — 📷 QR Code
            </p>

            <button
              className="w-full touch-target rounded-xl py-4 text-lg font-bold text-white mb-3 transition-transform active:scale-95"
              style={{
                background: "linear-gradient(135deg, #1B6CA8 0%, #0A9E74 100%)",
                fontFamily: "Poppins, sans-serif",
              }}
              onClick={() => setStep("consent")}
            >
              {t("next", lang)} →
            </button>

            <button
              className="w-full touch-target rounded-xl py-3 text-base font-semibold transition-colors"
              style={{ color: "#1B6CA8", border: "2px solid #C5DCF0" }}
              onClick={() => setStep("register")}
            >
              {t("newPatient", lang)}
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (step === "register") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6" style={{ backgroundColor: "#EEF5FC" }}>
        <div className="w-full max-w-md">
          <button
            className="flex items-center gap-2 text-sm font-semibold mb-6"
            style={{ color: "#1B6CA8" }}
            onClick={() => setStep("auth")}
          >
            ← {t("back", lang)}
          </button>
          <div
            className="rounded-2xl p-7 shadow-xl"
            style={{ backgroundColor: "#fff", border: "1.5px solid #C5DCF0" }}
          >
            <h2
              className="text-2xl font-bold mb-6 text-center"
              style={{ fontFamily: "Poppins, sans-serif", color: "#1A2332" }}
            >
              {t("registerNew", lang)}
            </h2>

            {[
              { key: "name", placeholder: t("namePlaceholder", lang), type: "text" },
              { key: "age", placeholder: t("agePlaceholder", lang), type: "number" },
              { key: "phone", placeholder: t("phonePlaceholder", lang), type: "tel" },
            ].map(({ key, placeholder, type }) => (
              <input
                key={key}
                className="w-full touch-target rounded-xl px-4 py-3.5 text-base font-semibold outline-none mb-3"
                style={{ border: "2px solid #C5DCF0", backgroundColor: "#EEF5FC", color: "#1A2332" }}
                placeholder={placeholder}
                type={type}
                value={(registerData as any)[key]}
                onChange={(e) => setRegisterData((d) => ({ ...d, [key]: e.target.value }))}
              />
            ))}

            <div className="flex gap-3 mb-4">
              {["Male", "Female", "Other"].map((g) => (
                <button
                  key={g}
                  className="flex-1 touch-target rounded-xl py-3 font-semibold text-sm transition-all"
                  style={{
                    backgroundColor: registerData.gender === g ? "#1B6CA8" : "#EEF5FC",
                    color: registerData.gender === g ? "#fff" : "#5A7896",
                    border: `2px solid ${registerData.gender === g ? "#1B6CA8" : "#C5DCF0"}`,
                  }}
                  onClick={() => setRegisterData((d) => ({ ...d, gender: g }))}
                >
                  {lang === "hi"
                    ? g === "Male" ? "पुरुष" : g === "Female" ? "महिला" : "अन्य"
                    : g}
                </button>
              ))}
            </div>

            <button
              className="w-full touch-target rounded-xl py-4 text-lg font-bold text-white transition-transform active:scale-95"
              style={{
                background: "linear-gradient(135deg, #1B6CA8 0%, #0A9E74 100%)",
                fontFamily: "Poppins, sans-serif",
              }}
              onClick={() => setStep("consent")}
            >
              {t("next", lang)} →
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Consent screen
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6" style={{ backgroundColor: "#EEF5FC" }}>
      <div className="w-full max-w-md">
        <div
          className="rounded-2xl p-7 shadow-xl"
          style={{ backgroundColor: "#fff", border: "2px solid #0A9E74" }}
        >
          <div className="text-center mb-5">
            <div className="text-5xl mb-2">🔒</div>
            <h2
              className="text-2xl font-bold"
              style={{ fontFamily: "Poppins, sans-serif", color: "#1A2332" }}
            >
              {t("consentTitle", lang)}
            </h2>
          </div>

          <button
            className="w-full flex items-center gap-3 rounded-xl px-4 py-3 mb-4 font-semibold transition-all active:scale-95"
            style={{ backgroundColor: "#EEF5FC", color: "#1B6CA8", border: "1.5px solid #C5DCF0" }}
            onClick={playAudio}
          >
            {audioPlaying ? (
              <>
                <div className="flex gap-0.5">
                  <div className="w-1 h-5 rounded animate-wave-1" style={{ backgroundColor: "#1B6CA8" }} />
                  <div className="w-1 h-5 rounded animate-wave-2" style={{ backgroundColor: "#1B6CA8" }} />
                  <div className="w-1 h-5 rounded animate-wave-3" style={{ backgroundColor: "#1B6CA8" }} />
                </div>
                <span>{lang === "hi" ? "चल रहा है..." : "Playing..."}</span>
              </>
            ) : (
              <>
                <span className="text-xl">🔊</span>
                <span>{t("consentAudio", lang)}</span>
              </>
            )}
          </button>

          <div
            className="rounded-xl p-4 mb-5 space-y-3 text-sm"
            style={{ backgroundColor: "#F0FDF4", border: "1px solid #BBF7D0" }}
          >
            {[
              lang === "hi" ? "आपका डेटा केवल इस अस्पताल में उपयोग किया जाएगा" : "Your data will only be used within this hospital",
              lang === "hi" ? "आप किसी भी समय सहमति वापस ले सकते हैं" : "You can withdraw consent at any time",
              lang === "hi" ? "कोई भी तीसरे पक्ष के साथ साझा नहीं किया जाएगा" : "No data shared with third parties without consent",
              lang === "hi" ? "ABHA Health Record से लिंक किया जाएगा" : "Linked to your ABHA Health Record",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="text-green-600 font-bold mt-0.5">✓</span>
                <span style={{ color: "#15803D" }}>{item}</span>
              </div>
            ))}
          </div>

          <p
            className="text-xs text-center mb-4"
            style={{ color: "#5A7896" }}
          >
            {t("consentText", lang)}
          </p>

          <button
            className="w-full touch-target rounded-xl py-4 text-lg font-bold text-white transition-transform active:scale-95"
            style={{
              background: "linear-gradient(135deg, #0A9E74 0%, #1B6CA8 100%)",
              fontFamily: "Poppins, sans-serif",
            }}
            onClick={() => onLogin({ ...DEMO_PATIENT, language: lang })}
          >
            {t("iConsent", lang)}
          </button>
        </div>

        <p className="text-center text-xs mt-3" style={{ color: "#5A7896" }}>
          Digital Personal Data Protection Act 2023 • ABDM Consent Framework
        </p>
      </div>
    </div>
  );
}
