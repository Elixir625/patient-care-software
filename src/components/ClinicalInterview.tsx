import { useState } from "react";
import { t } from "../types";

type Props = {
  lang: string;
  onComplete: () => void;
};

type Question = {
  id: string;
  textEn: string;
  textHi: string;
  type: "text" | "choice" | "scale" | "multiChoice";
  options?: { en: string; hi: string }[];
  redFlag?: string[];
};

const STANDARD_QUESTIONS: Question[] = [
  {
    id: "chief",
    textEn: "What is the main health problem bringing you here today?",
    textHi: "आज आप यहाँ किस मुख्य स्वास्थ्य समस्या के लिए आए हैं?",
    type: "choice",
    options: [
      { en: "Chest pain / Heart problem", hi: "सीने में दर्द / दिल की समस्या" },
      { en: "Fever / Cold", hi: "बुखार / जुकाम" },
      { en: "Stomach pain", hi: "पेट दर्द" },
      { en: "Joint / Bone pain", hi: "जोड़ों / हड्डियों का दर्द" },
      { en: "Breathlessness", hi: "सांस लेने में तकलीफ" },
      { en: "Other / Tell me more", hi: "अन्य / और बताएं" },
    ],
    redFlag: ["Chest pain / Heart problem", "Breathlessness"],
  },
  {
    id: "duration",
    textEn: "How long have you had this problem?",
    textHi: "यह समस्या कितने समय से है?",
    type: "choice",
    options: [
      { en: "Just started today", hi: "आज ही शुरू हुई" },
      { en: "2-3 days", hi: "2-3 दिन" },
      { en: "1 week", hi: "1 सप्ताह" },
      { en: "1 month", hi: "1 महीना" },
      { en: "More than 1 month", hi: "1 महीने से ज़्यादा" },
    ],
  },
  {
    id: "severity",
    textEn: "On a scale of 1 to 10, how severe is your pain or discomfort?",
    textHi: "1 से 10 के पैमाने पर, आपका दर्द या तकलीफ कितनी गंभीर है?",
    type: "scale",
  },
  {
    id: "pastHistory",
    textEn: "Do you have any of these conditions?",
    textHi: "क्या आपको इनमें से कोई बीमारी है?",
    type: "multiChoice",
    options: [
      { en: "Diabetes", hi: "मधुमेह" },
      { en: "High Blood Pressure", hi: "उच्च रक्तचाप" },
      { en: "Heart disease", hi: "हृदय रोग" },
      { en: "Asthma / Lung disease", hi: "अस्थमा / फेफड़ों की बीमारी" },
      { en: "Kidney disease", hi: "किडनी की बीमारी" },
      { en: "None", hi: "कोई नहीं" },
    ],
  },
  {
    id: "medications",
    textEn: "Are you currently taking any medicines?",
    textHi: "क्या आप अभी कोई दवा ले रहे हैं?",
    type: "choice",
    options: [
      { en: "Yes — I have a prescription", hi: "हाँ — मेरे पास नुस्खा है" },
      { en: "Yes — but I don't remember names", hi: "हाँ — लेकिन नाम याद नहीं" },
      { en: "No medicines", hi: "कोई दवा नहीं" },
    ],
  },
  {
    id: "allergies",
    textEn: "Do you have any known allergies to medicines?",
    textHi: "क्या आपको किसी दवा से एलर्जी है?",
    type: "choice",
    options: [
      { en: "Yes", hi: "हाँ" },
      { en: "No", hi: "नहीं" },
      { en: "I don't know", hi: "मुझे नहीं पता" },
    ],
  },
  {
    id: "family",
    textEn: "Does anyone in your family have heart disease or diabetes?",
    textHi: "क्या आपके परिवार में किसी को हृदय रोग या मधुमेह है?",
    type: "choice",
    options: [
      { en: "Yes — heart disease", hi: "हाँ — हृदय रोग" },
      { en: "Yes — diabetes", hi: "हाँ — मधुमेह" },
      { en: "Both", hi: "दोनों" },
      { en: "No", hi: "नहीं" },
    ],
  },
  {
    id: "lifestyle",
    textEn: "Do you smoke or drink alcohol?",
    textHi: "क्या आप धूम्रपान करते हैं या शराब पीते हैं?",
    type: "multiChoice",
    options: [
      { en: "I smoke", hi: "मैं धूम्रपान करता हूं" },
      { en: "I drink alcohol", hi: "मैं शराब पीता हूं" },
      { en: "Neither", hi: "दोनों नहीं" },
    ],
  },
];

const AYUSH_QUESTIONS: Question[] = [
  {
    id: "prakriti",
    textEn: "Which body type describes you best? (Prakriti)",
    textHi: "आपकी प्रकृति (शरीर का स्वभाव) क्या है?",
    type: "choice",
    options: [
      { en: "Thin, active, anxious (Vata)", hi: "दुबला, सक्रिय, चिंताग्रस्त (वात)" },
      { en: "Medium, intense, sharp (Pitta)", hi: "मध्यम, तीव्र, तेज (पित्त)" },
      { en: "Heavy, calm, slow (Kapha)", hi: "भारी, शांत, धीमा (कफ)" },
    ],
  },
  {
    id: "ahara",
    textEn: "Describe your diet and appetite (Ahara Shakti)",
    textHi: "अपने आहार और भूख का वर्णन करें (आहार शक्ति)",
    type: "choice",
    options: [
      { en: "Good appetite, eats regularly", hi: "अच्छी भूख, नियमित खाना" },
      { en: "Poor appetite, irregular", hi: "कम भूख, अनियमित" },
      { en: "Excessive appetite", hi: "अत्यधिक भूख" },
    ],
  },
  {
    id: "vyayama",
    textEn: "How would you describe your physical endurance? (Vyayama Shakti)",
    textHi: "आपकी शारीरिक सहनशक्ति कैसी है? (व्यायाम शक्ति)",
    type: "choice",
    options: [
      { en: "High — I can do heavy work", hi: "अधिक — मैं भारी काम कर सकता हूं" },
      { en: "Moderate", hi: "मध्यम" },
      { en: "Low — I tire easily", hi: "कम — मैं जल्दी थक जाता हूं" },
    ],
  },
];

export default function ClinicalInterview({ lang, onComplete }: Props) {
  const [mode, setMode] = useState<"standard" | "ayush">("standard");
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string[]>>({});
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [scaleValue, setScaleValue] = useState(5);
  const [listening, setListening] = useState(false);
  const [redFlagShown, setRedFlagShown] = useState(false);
  const [done, setDone] = useState(false);
  const [textInput, setTextInput] = useState("");

  const questions = mode === "standard" ? STANDARD_QUESTIONS : AYUSH_QUESTIONS;
  const question = questions[currentQ];

  const handleAnswer = (answer: string[]) => {
    const newAnswers = { ...answers, [question.id]: answer };
    setAnswers(newAnswers);

    // Check red flags
    if (question.redFlag) {
      const isRedFlag = answer.some((a) => question.redFlag?.includes(a));
      if (isRedFlag) {
        setRedFlagShown(true);
      }
    }

    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
      setSelectedOptions([]);
      setTextInput("");
    } else {
      setDone(true);
    }
  };

  const handleVoice = () => {
    setListening(true);
    setTimeout(() => {
      setListening(false);
      const sample = lang === "hi" ? "दो दिन से बुखार है और सिर दर्द है" : "I have had fever for two days with headache";
      setTextInput(sample);
    }, 2500);
  };

  if (done) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-10 text-center">
        <div className="text-7xl mb-4">✅</div>
        <h2
          className="text-2xl font-black mb-2"
          style={{ fontFamily: "Poppins, sans-serif", color: "#1A2332" }}
        >
          {t("interviewDone", lang)}
        </h2>
        <p className="text-base mb-8" style={{ color: "#5A7896" }}>
          {t("summaryReady", lang)}
        </p>
        <div
          className="rounded-2xl p-6 mb-6 text-left space-y-3"
          style={{ backgroundColor: "#fff", border: "1.5px solid #C5DCF0" }}
        >
          <h3 className="font-bold text-lg" style={{ color: "#1A2332", fontFamily: "Poppins, sans-serif" }}>
            Clinical Summary (Draft)
          </h3>
          {Object.entries(answers).map(([key, vals]) => (
            <div key={key} className="text-sm">
              <span className="font-semibold" style={{ color: "#1B6CA8" }}>
                {STANDARD_QUESTIONS.find((q) => q.id === key)?.[lang === "hi" ? "textHi" : "textEn"] || key}:
              </span>{" "}
              <span style={{ color: "#1A2332" }}>{vals.join(", ")}</span>
            </div>
          ))}
        </div>
        <button
          className="w-full touch-target rounded-xl py-4 text-lg font-bold text-white"
          style={{ background: "linear-gradient(135deg, #1B6CA8 0%, #0A9E74 100%)", fontFamily: "Poppins, sans-serif" }}
          onClick={onComplete}
        >
          {lang === "hi" ? "डॉक्टर को भेजें" : "Send to Doctor"} →
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      {/* Red flag alert */}
      {redFlagShown && (
        <div
          className="rounded-xl px-5 py-4 mb-5 flex items-start gap-3 animate-float-up"
          style={{ backgroundColor: "#FEF2F2", border: "2px solid #FCA5A5" }}
        >
          <span className="text-2xl mt-0.5">🚨</span>
          <div>
            <p className="font-bold text-base" style={{ color: "#DC2626" }}>
              {t("redFlag", lang)}
            </p>
            <p className="text-sm mt-0.5" style={{ color: "#B91C1C" }}>
              {lang === "hi"
                ? "कृपया तुरंत नर्स या डॉक्टर को बुलाएं।"
                : "Please alert a nurse or doctor immediately."}
            </p>
          </div>
        </div>
      )}

      {/* Mode toggle */}
      <div className="flex gap-3 mb-6">
        <button
          className="flex-1 py-2.5 rounded-xl font-bold text-sm transition-all"
          style={{
            backgroundColor: mode === "standard" ? "#1B6CA8" : "#EEF5FC",
            color: mode === "standard" ? "#fff" : "#5A7896",
          }}
          onClick={() => { setMode("standard"); setCurrentQ(0); setAnswers({}); }}
        >
          {lang === "hi" ? "मानक मोड" : "Standard Mode"}
        </button>
        <button
          className="flex-1 py-2.5 rounded-xl font-bold text-sm transition-all"
          style={{
            backgroundColor: mode === "ayush" ? "#7C3AED" : "#EEF5FC",
            color: mode === "ayush" ? "#fff" : "#5A7896",
          }}
          onClick={() => { setMode("ayush"); setCurrentQ(0); setAnswers({}); }}
        >
          🌿 {lang === "hi" ? "आयुष मोड" : "AYUSH Mode"}
        </button>
      </div>

      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between text-sm font-semibold mb-2" style={{ color: "#5A7896" }}>
          <span>{lang === "hi" ? `प्रश्न ${currentQ + 1} / ${questions.length}` : `Question ${currentQ + 1} of ${questions.length}`}</span>
          <span>{Math.round(((currentQ) / questions.length) * 100)}%</span>
        </div>
        <div className="w-full h-3 rounded-full" style={{ backgroundColor: "#D8E8F4" }}>
          <div
            className="h-3 rounded-full transition-all duration-500"
            style={{
              width: `${((currentQ) / questions.length) * 100}%`,
              background: mode === "ayush" ? "linear-gradient(90deg, #7C3AED, #0A9E74)" : "linear-gradient(90deg, #1B6CA8, #0A9E74)",
            }}
          />
        </div>
      </div>

      {/* Question card */}
      <div
        className="rounded-2xl p-6 mb-5 animate-float-up"
        style={{ backgroundColor: "#fff", border: "1.5px solid #C5DCF0", boxShadow: "0 4px 16px rgba(0,0,0,0.07)" }}
      >
        <div className="flex items-start gap-3 mb-5">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-xl shrink-0"
            style={{ background: "linear-gradient(135deg, #1B6CA8, #0A9E74)" }}
          >
            🤖
          </div>
          <div>
            <p className="font-bold text-lg leading-snug" style={{ fontFamily: "Poppins, sans-serif", color: "#1A2332" }}>
              {lang === "hi" ? question.textHi : question.textEn}
            </p>
            <p className="text-xs mt-1" style={{ color: "#5A7896" }}>
              {lang !== "hi" ? question.textHi : question.textEn}
            </p>
          </div>
        </div>

        {/* Scale input */}
        {question.type === "scale" && (
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="text-sm font-semibold" style={{ color: "#5A7896" }}>1</span>
              <input
                type="range"
                min="1"
                max="10"
                value={scaleValue}
                onChange={(e) => setScaleValue(Number(e.target.value))}
                className="flex-1 h-3 rounded-full appearance-none cursor-pointer"
                style={{ accentColor: scaleValue > 7 ? "#DC2626" : scaleValue > 4 ? "#D97706" : "#16A34A" }}
              />
              <span className="text-sm font-semibold" style={{ color: "#5A7896" }}>10</span>
            </div>
            <div className="text-center">
              <span
                className="text-4xl font-black"
                style={{ color: scaleValue > 7 ? "#DC2626" : scaleValue > 4 ? "#D97706" : "#16A34A" }}
              >
                {scaleValue}
              </span>
              <span className="text-lg ml-1" style={{ color: "#5A7896" }}>/10</span>
              <p className="text-sm font-semibold mt-1" style={{ color: "#5A7896" }}>
                {scaleValue > 7 ? (lang === "hi" ? "बहुत गंभीर" : "Very Severe") :
                 scaleValue > 4 ? (lang === "hi" ? "मध्यम" : "Moderate") :
                 (lang === "hi" ? "हल्का" : "Mild")}
              </p>
            </div>
            <button
              className="w-full touch-target rounded-xl py-4 font-bold text-lg text-white"
              style={{ background: "linear-gradient(135deg, #1B6CA8, #0A9E74)" }}
              onClick={() => handleAnswer([String(scaleValue)])}
            >
              {t("next", lang)} →
            </button>
          </div>
        )}

        {/* Choice options */}
        {(question.type === "choice" || question.type === "multiChoice") && question.options && (
          <div className="space-y-2">
            {question.options.map((opt) => {
              const label = lang === "hi" ? opt.hi : opt.en;
              const isSelected = selectedOptions.includes(opt.en);
              return (
                <button
                  key={opt.en}
                  className="w-full touch-target flex items-center gap-3 rounded-xl px-4 py-3.5 text-left font-semibold transition-all active:scale-98"
                  style={{
                    backgroundColor: isSelected ? "#EEF5FC" : "#F8FBFF",
                    border: `2px solid ${isSelected ? "#1B6CA8" : "#C5DCF0"}`,
                    color: "#1A2332",
                  }}
                  onClick={() => {
                    if (question.type === "choice") {
                      handleAnswer([opt.en]);
                    } else {
                      setSelectedOptions((prev) =>
                        prev.includes(opt.en)
                          ? prev.filter((o) => o !== opt.en)
                          : [...prev, opt.en]
                      );
                    }
                  }}
                >
                  <div
                    className="w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0"
                    style={{
                      borderColor: isSelected ? "#1B6CA8" : "#C5DCF0",
                      backgroundColor: isSelected ? "#1B6CA8" : "transparent",
                    }}
                  >
                    {isSelected && <span className="text-white text-sm">✓</span>}
                  </div>
                  <span>{label}</span>
                  {lang !== "hi" && <span className="ml-auto text-xs" style={{ color: "#5A7896" }}>{opt.hi}</span>}
                </button>
              );
            })}
            {question.type === "multiChoice" && selectedOptions.length > 0 && (
              <button
                className="w-full touch-target rounded-xl py-4 font-bold text-lg text-white mt-2"
                style={{ background: "linear-gradient(135deg, #1B6CA8, #0A9E74)" }}
                onClick={() => handleAnswer(selectedOptions)}
              >
                {t("next", lang)} →
              </button>
            )}
          </div>
        )}

        {/* Text input (other) */}
        {question.type === "text" && (
          <div className="space-y-3">
            <div className="flex gap-2">
              <button
                className="w-12 h-12 rounded-xl flex items-center justify-center text-xl transition-colors"
                style={{ backgroundColor: listening ? "#DC2626" : "#EEF5FC", color: listening ? "#fff" : "#1B6CA8" }}
                onClick={handleVoice}
              >
                {listening ? "🔴" : "🎙️"}
              </button>
              <input
                className="flex-1 rounded-xl px-4 py-3 font-medium outline-none text-sm"
                style={{ border: "2px solid #C5DCF0", backgroundColor: "#EEF5FC", color: "#1A2332" }}
                placeholder={t("typeMessage", lang)}
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
              />
            </div>
            <button
              className="w-full touch-target rounded-xl py-4 font-bold text-lg text-white"
              style={{ background: "linear-gradient(135deg, #1B6CA8, #0A9E74)" }}
              onClick={() => textInput && handleAnswer([textInput])}
            >
              {t("next", lang)} →
            </button>
          </div>
        )}
      </div>

      {/* Voice shortcut */}
      <button
        className="w-full flex items-center justify-center gap-3 rounded-xl py-4 font-semibold text-base transition-all"
        style={{ backgroundColor: "#EEF5FC", color: "#1B6CA8", border: "1.5px dashed #C5DCF0" }}
        onClick={handleVoice}
      >
        {listening ? (
          <>
            <div className="flex gap-1">
              <div className="w-1.5 h-5 rounded animate-wave-1" style={{ backgroundColor: "#1B6CA8" }} />
              <div className="w-1.5 h-5 rounded animate-wave-2" style={{ backgroundColor: "#1B6CA8" }} />
              <div className="w-1.5 h-5 rounded animate-wave-3" style={{ backgroundColor: "#1B6CA8" }} />
            </div>
            <span>{t("voiceCapture", lang)}</span>
          </>
        ) : (
          <>
            <span className="text-xl">🎙️</span>
            <span>{lang === "hi" ? "बोलकर जवाब दें" : "Answer by Speaking"}</span>
          </>
        )}
      </button>
    </div>
  );
}
