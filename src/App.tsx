import { useState } from "react";
import { AppScreen, PatientProfile } from "./types";
import LoginScreen from "./components/LoginScreen";
import Taskbar from "./components/Taskbar";
import HomePage from "./components/HomePage";
import AIChat from "./components/AIChat";
import EmergencyModal from "./components/EmergencyModal";
import ClinicalInterview from "./components/ClinicalInterview";
import DocumentManager from "./components/DocumentManager";
import MedicalHistory from "./components/MedicalHistory";
import SettingsScreen from "./components/SettingsScreen";

export default function App() {
  const [lang, setLang] = useState("en");
  const [screen, setScreen] = useState<AppScreen>("login");
  const [patient, setPatient] = useState<PatientProfile | null>(null);
  const [showEmergency, setShowEmergency] = useState(false);

  const handleLogin = (profile: PatientProfile) => {
    setPatient(profile);
    setLang(profile.language);
    setScreen("home");
  };

  const handleLogout = () => {
    setPatient(null);
    setScreen("login");
    setLang("en");
  };

  if (screen === "login" || !patient) {
    return (
      <LoginScreen
        lang={lang}
        onLangChange={setLang}
        onLogin={handleLogin}
      />
    );
  }

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: "#EEF5FC", fontFamily: "Nunito, 'Noto Sans Devanagari', sans-serif" }}
    >
      <Taskbar
        currentScreen={screen}
        onNavigate={setScreen}
        onEmergency={() => setShowEmergency(true)}
        lang={lang}
        onLangChange={setLang}
        patientName={patient.name.split(" ")[0]}
      />

      <main className="flex-1 overflow-y-auto">
        {screen === "home" && (
          <HomePage
            lang={lang}
            patient={patient}
            onNavigate={setScreen}
            onEmergency={() => setShowEmergency(true)}
          />
        )}
        {screen === "interview" && (
          <ClinicalInterview
            lang={lang}
            onComplete={() => setScreen("home")}
          />
        )}
        {screen === "documents" && (
          <DocumentManager lang={lang} />
        )}
        {screen === "history" && (
          <MedicalHistory lang={lang} />
        )}
        {screen === "settings" && (
          <SettingsScreen
            lang={lang}
            onLangChange={setLang}
            onLogout={handleLogout}
          />
        )}
        {screen === "account" && (
          <div className="max-w-2xl mx-auto px-4 py-6">
            <h2
              className="text-2xl font-black mb-5"
              style={{ fontFamily: "Poppins, sans-serif", color: "#1A2332" }}
            >
              {lang === "hi" ? "मेरा खाता" : "My Account"}
            </h2>
            <div
              className="rounded-2xl p-6 mb-4"
              style={{ background: "linear-gradient(135deg, #1B6CA8, #0A9E74)", color: "#fff" }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center text-3xl font-black"
                  style={{ backgroundColor: "rgba(255,255,255,0.25)", fontFamily: "Poppins, sans-serif" }}
                >
                  {patient.name[0]}
                </div>
                <div>
                  <p className="text-xl font-black" style={{ fontFamily: "Poppins, sans-serif" }}>{patient.name}</p>
                  <p className="opacity-80 text-sm">ABHA: {patient.abhaId}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: lang === "hi" ? "आयु" : "Age", value: `${patient.age} yrs` },
                  { label: lang === "hi" ? "लिंग" : "Gender", value: patient.gender },
                  { label: lang === "hi" ? "मोबाइल" : "Mobile", value: patient.phone },
                  { label: lang === "hi" ? "भाषा" : "Language", value: lang.toUpperCase() },
                ].map((s) => (
                  <div key={s.label} className="bg-white/20 rounded-xl p-3">
                    <p className="text-xs opacity-70">{s.label}</p>
                    <p className="font-bold text-sm">{s.value}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              {[
                { icon: "✏️", label: lang === "hi" ? "प्रोफाइल संपादित करें" : "Edit Profile" },
                { icon: "📱", label: lang === "hi" ? "मोबाइल नंबर बदलें" : "Change Mobile Number" },
                { icon: "🔑", label: lang === "hi" ? "ABHA पासवर्ड बदलें" : "Change ABHA Password" },
              ].map((item) => (
                <button
                  key={item.label}
                  className="w-full touch-target flex items-center gap-3 rounded-xl px-4 py-3.5 text-left"
                  style={{ backgroundColor: "#fff", border: "1.5px solid #C5DCF0" }}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="font-semibold text-sm" style={{ color: "#1A2332" }}>{item.label}</span>
                  <span className="ml-auto" style={{ color: "#5A7896" }}>›</span>
                </button>
              ))}
            </div>
          </div>
        )}
        {screen === "summary" && (
          <div className="max-w-2xl mx-auto px-4 py-6 text-center">
            <div className="text-6xl mb-4">📋</div>
            <h2
              className="text-2xl font-black"
              style={{ fontFamily: "Poppins, sans-serif", color: "#1A2332" }}
            >
              {lang === "hi" ? "डॉक्टर के लिए सारांश" : "Summary for Doctor"}
            </h2>
            <p className="mt-2 text-base" style={{ color: "#5A7896" }}>
              {lang === "hi"
                ? "आपका सारांश तैयार हो गया है और डॉक्टर के स्क्रीन पर भेज दिया गया है।"
                : "Your summary is ready and has been sent to the doctor's screen."}
            </p>
          </div>
        )}
      </main>

      {/* AI Chat widget */}
      <AIChat lang={lang} />

      {/* Emergency modal */}
      {showEmergency && (
        <EmergencyModal
          lang={lang}
          onClose={() => setShowEmergency(false)}
        />
      )}
    </div>
  );
}
