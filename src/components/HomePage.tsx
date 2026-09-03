import { AppScreen, PatientProfile, t } from "../types";

type Props = {
  lang: string;
  patient: PatientProfile;
  onNavigate: (screen: AppScreen) => void;
  onEmergency: () => void;
};

const QUICK_ACTIONS = [
  {
    screen: "interview" as AppScreen,
    icon: "💬",
    color: "#1B6CA8",
    bg: "#EEF5FC",
    labelKey: "aiInterview",
    descEn: "AI guides you through your health history",
    descHi: "AI आपके स्वास्थ्य इतिहास में मार्गदर्शन करेगा",
    badge: "Smart Interview",
  },
  {
    screen: "documents" as AppScreen,
    icon: "📷",
    color: "#0A9E74",
    bg: "#F0FDF4",
    labelKey: "scanDoc",
    descEn: "Scan prescriptions, lab reports & discharge summaries",
    descHi: "नुस्खे, लैब रिपोर्ट और डिस्चार्ज सारांश स्कैन करें",
    badge: "OCR + AI",
  },
  {
    screen: "history" as AppScreen,
    icon: "📋",
    color: "#7C3AED",
    bg: "#F5F3FF",
    labelKey: "history",
    descEn: "View & manage your complete medical timeline",
    descHi: "अपनी पूरी चिकित्सा समयरेखा देखें और प्रबंधित करें",
    badge: "ABHA Linked",
  },
  {
    screen: "documents" as AppScreen,
    icon: "📁",
    color: "#B45309",
    bg: "#FFFBEB",
    labelKey: "documents",
    descEn: "All your health documents in one place",
    descHi: "आपके सभी स्वास्थ्य दस्तावेज़ एक जगह",
    badge: "Secure",
  },
];

const HEALTH_TIPS = [
  { icon: "💊", en: "Take medicines at the same time daily", hi: "रोज़ एक ही समय पर दवा लें" },
  { icon: "💧", en: "Drink 8 glasses of water daily", hi: "रोज़ 8 गिलास पानी पिएं" },
  { icon: "🚶", en: "Walk 30 minutes every day", hi: "रोज़ 30 मिनट चलें" },
];

export default function HomePage({ lang, patient, onNavigate, onEmergency }: Props) {
  const hour = new Date().getHours();
  const greeting = lang === "hi"
    ? hour < 12 ? "सुप्रभात" : hour < 18 ? "नमस्ते" : "शुभ संध्या"
    : hour < 12 ? "Good Morning" : hour < 18 ? "Good Afternoon" : "Good Evening";

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      {/* Welcome banner */}
      <div
        className="rounded-2xl p-6 relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #1B6CA8 0%, #0A9E74 100%)",
          boxShadow: "0 8px 32px rgba(27,108,168,0.25)",
        }}
      >
        <div className="relative z-10">
          <p className="text-white/80 text-base font-semibold">{greeting},</p>
          <h2
            className="text-3xl font-black text-white mt-1"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            {patient.name}
          </h2>
          <div className="flex flex-wrap items-center gap-3 mt-3">
            <span
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold"
              style={{ backgroundColor: "rgba(255,255,255,0.2)", color: "#fff" }}
            >
              🆔 ABHA: {patient.abhaId}
            </span>
            <span
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold"
              style={{ backgroundColor: "rgba(255,255,255,0.2)", color: "#fff" }}
            >
              👤 {patient.age}y • {patient.gender}
            </span>
            <span
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-bold"
              style={{ backgroundColor: "#0A9E74", color: "#fff" }}
            >
              ✓ ABDM Verified
            </span>
          </div>
        </div>
        {/* Decorative circles */}
        <div
          className="absolute -right-8 -top-8 w-40 h-40 rounded-full opacity-10"
          style={{ backgroundColor: "#fff" }}
        />
        <div
          className="absolute -right-4 bottom-0 w-24 h-24 rounded-full opacity-10"
          style={{ backgroundColor: "#fff" }}
        />
      </div>

      {/* Red flag alert strip */}
      <div
        className="rounded-xl px-5 py-3 flex items-center gap-3"
        style={{ backgroundColor: "#FFF7ED", border: "1.5px solid #FED7AA" }}
      >
        <span className="text-2xl">💡</span>
        <p className="text-sm font-semibold" style={{ color: "#92400E" }}>
          {lang === "hi"
            ? "अगर आपको सीने में दर्द, सांस लेने में तकलीफ, या चक्कर आ रहे हैं, तो तुरंत 🚨 Emergency बटन दबाएं"
            : "If you experience chest pain, breathlessness, or dizziness, press the 🚨 Emergency button immediately"}
        </p>
      </div>

      {/* Quick action grid */}
      <div>
        <h3
          className="text-lg font-bold mb-3"
          style={{ fontFamily: "Poppins, sans-serif", color: "#1A2332" }}
        >
          {lang === "hi" ? "क्या करना है?" : "What would you like to do?"}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {QUICK_ACTIONS.map((action, i) => (
            <button
              key={i}
              className="flex items-start gap-4 rounded-2xl p-5 text-left transition-all hover:shadow-lg active:scale-98 group"
              style={{
                backgroundColor: "#fff",
                border: `1.5px solid ${action.color}30`,
                boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
              }}
              onClick={() => onNavigate(action.screen)}
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shrink-0 group-hover:scale-110 transition-transform"
                style={{ backgroundColor: action.bg }}
              >
                {action.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className="text-xs font-bold px-2 py-0.5 rounded-full"
                    style={{ backgroundColor: action.bg, color: action.color }}
                  >
                    {action.badge}
                  </span>
                </div>
                <p
                  className="font-bold text-base mb-0.5"
                  style={{ color: "#1A2332", fontFamily: "Poppins, sans-serif" }}
                >
                  {t(action.labelKey, lang)}
                </p>
                <p className="text-sm" style={{ color: "#5A7896" }}>
                  {lang === "hi" ? action.descHi : action.descEn}
                </p>
              </div>
              <span style={{ color: action.color }} className="text-xl mt-1">→</span>
            </button>
          ))}
        </div>
      </div>

      {/* Health status cards */}
      <div>
        <h3
          className="text-lg font-bold mb-3"
          style={{ fontFamily: "Poppins, sans-serif", color: "#1A2332" }}
        >
          {lang === "hi" ? "आपकी स्वास्थ्य स्थिति" : "Your Health Status"}
        </h3>
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: lang === "hi" ? "रक्तचाप" : "Blood Pressure", value: "138/88", unit: "mmHg", status: "warning", icon: "❤️" },
            { label: lang === "hi" ? "ग्लूकोज" : "Blood Glucose", value: "142", unit: "mg/dL", status: "high", icon: "🩸" },
            { label: "HbA1c", value: "7.2", unit: "%", status: "ok", icon: "💉" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl p-4 text-center"
              style={{
                backgroundColor: "#fff",
                border: `1.5px solid ${stat.status === "high" ? "#FCA5A5" : stat.status === "warning" ? "#FED7AA" : "#BBF7D0"}`,
                boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
              }}
            >
              <div className="text-2xl mb-1">{stat.icon}</div>
              <p
                className="text-xl font-black"
                style={{ color: stat.status === "high" ? "#DC2626" : stat.status === "warning" ? "#D97706" : "#16A34A" }}
              >
                {stat.value}
              </p>
              <p className="text-xs font-semibold" style={{ color: "#5A7896" }}>{stat.unit}</p>
              <p className="text-xs mt-1 font-semibold" style={{ color: "#1A2332" }}>{stat.label}</p>
              {stat.status === "high" && (
                <span className="text-xs font-bold" style={{ color: "#DC2626" }}>⚠️ High</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Health tips */}
      <div
        className="rounded-2xl p-5"
        style={{ backgroundColor: "#fff", border: "1.5px solid #C5DCF0" }}
      >
        <h3
          className="text-base font-bold mb-3"
          style={{ fontFamily: "Poppins, sans-serif", color: "#1A2332" }}
        >
          {lang === "hi" ? "आज का स्वास्थ्य सुझाव" : "Health Tips for Today"}
        </h3>
        <div className="space-y-2">
          {HEALTH_TIPS.map((tip, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="text-xl">{tip.icon}</span>
              <span className="text-sm font-medium" style={{ color: "#5A7896" }}>
                {lang === "hi" ? tip.hi : tip.en}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Emergency big button */}
      <button
        className="w-full touch-target rounded-2xl py-5 flex items-center justify-center gap-3 font-black text-xl text-white transition-transform active:scale-95 emergency-pulse"
        style={{
          background: "linear-gradient(135deg, #DC2626 0%, #991B1B 100%)",
          fontFamily: "Poppins, sans-serif",
          boxShadow: "0 4px 20px rgba(220,38,38,0.4)",
        }}
        onClick={onEmergency}
      >
        <span className="text-3xl">🚨</span>
        {t("emergency", lang)} — 108 / 112
      </button>

      <div className="h-4" />
    </div>
  );
}
