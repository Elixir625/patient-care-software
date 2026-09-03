import { t } from "../types";

type Props = { lang: string };

const HISTORY = {
  conditions: [
    { name: "Type 2 Diabetes Mellitus", since: "2019", controlled: false, icon: "🩸" },
    { name: "Hypertension Stage 1", since: "2021", controlled: true, icon: "❤️" },
    { name: "Ischaemic Heart Disease (Post-PTCA)", since: "2023", controlled: true, icon: "🫀" },
  ],
  surgeries: [
    { name: "Percutaneous Transluminal Coronary Angioplasty (PTCA)", date: "Jul 2023", hospital: "AIIMS Delhi" },
    { name: "Appendicectomy", date: "Mar 2008", hospital: "District Hospital, Varanasi" },
  ],
  medications: [
    { name: "Metformin 500mg", frequency: "Twice daily", since: "2019", color: "#1B6CA8" },
    { name: "Amlodipine 5mg", frequency: "Once daily (morning)", since: "2021", color: "#0A9E74" },
    { name: "Aspirin 75mg", frequency: "Once daily (night)", since: "2023", color: "#DC2626" },
    { name: "Atorvastatin 10mg", frequency: "Once daily (night)", since: "2021", color: "#7C3AED" },
    { name: "Clopidogrel 75mg", frequency: "Once daily", since: "2023", color: "#D97706" },
  ],
  allergies: [
    { substance: "Penicillin", reaction: "Urticaria", severity: "Moderate" },
  ],
  family: [
    { relation: "Father", conditions: "Diabetes, Hypertension" },
    { relation: "Mother", conditions: "Hypertension" },
    { relation: "Brother", conditions: "Diabetes" },
  ],
};

export default function MedicalHistory({ lang }: Props) {
  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2
          className="text-2xl font-black"
          style={{ fontFamily: "Poppins, sans-serif", color: "#1A2332" }}
        >
          {t("history", lang)}
        </h2>
        <span
          className="px-3 py-1.5 rounded-full text-xs font-bold"
          style={{ backgroundColor: "#EEF5FC", color: "#1B6CA8" }}
        >
          🔒 ABHA Linked
        </span>
      </div>

      {/* ABHA summary card */}
      <div
        className="rounded-2xl p-5"
        style={{
          background: "linear-gradient(135deg, #1B6CA8 0%, #0A9E74 100%)",
          color: "#fff",
        }}
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="text-3xl">🆔</div>
          <div>
            <p className="font-bold text-lg" style={{ fontFamily: "Poppins, sans-serif" }}>Ramesh Kumar</p>
            <p className="opacity-80 text-sm">ABHA: 91-1234-5678-9012</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: lang === "hi" ? "आयु" : "Age", value: "58 yrs" },
            { label: lang === "hi" ? "रक्त समूह" : "Blood Group", value: "B+" },
            { label: lang === "hi" ? "पिछली विजिट" : "Last Visit", value: "Nov 2024" },
          ].map((s) => (
            <div key={s.label} className="bg-white/20 rounded-xl p-3 text-center">
              <p className="font-black text-lg">{s.value}</p>
              <p className="opacity-80 text-xs">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Conditions */}
      <Section title={lang === "hi" ? "मौजूदा बीमारियां" : "Current Conditions"} icon="🏥">
        <div className="space-y-3">
          {HISTORY.conditions.map((c) => (
            <div
              key={c.name}
              className="flex items-center gap-4 rounded-xl p-4"
              style={{ backgroundColor: "#fff", border: "1.5px solid #C5DCF0" }}
            >
              <span className="text-2xl">{c.icon}</span>
              <div className="flex-1">
                <p className="font-bold text-sm" style={{ color: "#1A2332" }}>{c.name}</p>
                <p className="text-xs" style={{ color: "#5A7896" }}>
                  {lang === "hi" ? "से" : "Since"} {c.since}
                </p>
              </div>
              <span
                className="text-xs font-bold px-2 py-1 rounded-full"
                style={{
                  backgroundColor: c.controlled ? "#F0FDF4" : "#FEF2F2",
                  color: c.controlled ? "#16A34A" : "#DC2626",
                }}
              >
                {c.controlled ? (lang === "hi" ? "नियंत्रित" : "Controlled") : (lang === "hi" ? "ध्यान चाहिए" : "Needs Attention")}
              </span>
            </div>
          ))}
        </div>
      </Section>

      {/* Current medications */}
      <Section title={lang === "hi" ? "वर्तमान दवाएं" : "Current Medications"} icon="💊">
        <div className="space-y-2">
          {HISTORY.medications.map((med) => (
            <div
              key={med.name}
              className="flex items-center gap-3 rounded-xl p-3.5"
              style={{ backgroundColor: "#fff", border: "1.5px solid #C5DCF0" }}
            >
              <div className="w-3 h-8 rounded-full shrink-0" style={{ backgroundColor: med.color }} />
              <div className="flex-1">
                <p className="font-bold text-sm" style={{ color: "#1A2332" }}>{med.name}</p>
                <p className="text-xs" style={{ color: "#5A7896" }}>{med.frequency}</p>
              </div>
              <p className="text-xs" style={{ color: "#5A7896" }}>
                {lang === "hi" ? "से" : "Since"} {med.since}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Allergies */}
      <Section title={lang === "hi" ? "एलर्जी" : "Allergies"} icon="⚠️">
        {HISTORY.allergies.map((a) => (
          <div
            key={a.substance}
            className="rounded-xl p-4 flex items-center gap-3"
            style={{ backgroundColor: "#FEF2F2", border: "1.5px solid #FCA5A5" }}
          >
            <span className="text-2xl">🚫</span>
            <div>
              <p className="font-bold text-sm" style={{ color: "#DC2626" }}>{a.substance}</p>
              <p className="text-xs" style={{ color: "#B91C1C" }}>{a.reaction} • {a.severity}</p>
            </div>
          </div>
        ))}
      </Section>

      {/* Surgeries */}
      <Section title={lang === "hi" ? "शल्य चिकित्सा इतिहास" : "Surgical History"} icon="🔬">
        <div className="space-y-2">
          {HISTORY.surgeries.map((s) => (
            <div
              key={s.name}
              className="rounded-xl p-4"
              style={{ backgroundColor: "#fff", border: "1.5px solid #C5DCF0" }}
            >
              <p className="font-bold text-sm" style={{ color: "#1A2332" }}>{s.name}</p>
              <p className="text-xs mt-0.5" style={{ color: "#5A7896" }}>{s.date} • {s.hospital}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Family history */}
      <Section title={lang === "hi" ? "पारिवारिक इतिहास" : "Family History"} icon="👨‍👩‍👧">
        <div className="space-y-2">
          {HISTORY.family.map((f) => (
            <div
              key={f.relation}
              className="flex gap-3 rounded-xl p-3.5"
              style={{ backgroundColor: "#fff", border: "1.5px solid #C5DCF0" }}
            >
              <span className="font-bold text-sm w-20 shrink-0" style={{ color: "#1B6CA8" }}>
                {f.relation}
              </span>
              <span className="text-sm" style={{ color: "#5A7896" }}>{f.conditions}</span>
            </div>
          ))}
        </div>
      </Section>

      <div className="h-6" />
    </div>
  );
}

function Section({ title, icon, children }: { title: string; icon: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xl">{icon}</span>
        <h3
          className="font-bold text-base"
          style={{ fontFamily: "Poppins, sans-serif", color: "#1A2332" }}
        >
          {title}
        </h3>
      </div>
      {children}
    </div>
  );
}
