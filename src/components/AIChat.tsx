import { useState, useRef, useEffect } from "react";
import { ChatMessage, t } from "../types";

type Props = {
  lang: string;
  onLanguageChange?: (code: string) => void;
};

const SUGGESTED_PROMPTS: Record<string, string[]> = {
  en: [
    "I have chest pain",
    "I feel feverish",
    "My blood pressure report",
    "What medicines can I take?",
  ],
  hi: [
    "मुझे सीने में दर्द है",
    "मुझे बुखार है",
    "मेरी ब्लड प्रेशर रिपोर्ट",
    "मैं कौन सी दवा ले सकता हूं?",
  ],
};

const DEMO_RESPONSES: Record<string, string[]> = {
  en: [
    "I understand. Can you describe when the chest pain started and whether it radiates to your arm or jaw?",
    "Thank you for sharing. I'm noting this in your clinical history. Do you have any prior heart conditions?",
    "I see elevated glucose in your recent report (FBS: 142 mg/dL). Please discuss this with your doctor.",
    "⚠️ URGENT: Chest pain with breathlessness may be serious. I am alerting triage staff immediately.",
  ],
  hi: [
    "मैं समझता हूं। क्या आप बता सकते हैं कि सीने का दर्द कब शुरू हुआ?",
    "धन्यवाद। मैं यह आपके चिकित्सा इतिहास में नोट कर रहा हूं।",
    "आपकी रिपोर्ट में उच्च ग्लूकोज दिख रही है। कृपया डॉक्टर से मिलें।",
    "⚠️ तत्काल: सांस की तकलीफ के साथ सीने में दर्द गंभीर हो सकता है।",
  ],
};

let msgId = 0;

export default function AIChat({ lang, onLanguageChange }: Props) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [listening, setListening] = useState(false);
  const [imageMode, setImageMode] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const greeting = t("greeting", lang);

  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([{
        id: String(msgId++),
        role: "assistant",
        text: greeting,
        timestamp: new Date(),
      }]);
    }
  }, [open, lang]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = (text: string, imageUrl?: string) => {
    if (!text.trim() && !imageUrl) return;
    const userMsg: ChatMessage = {
      id: String(msgId++),
      role: "user",
      text,
      timestamp: new Date(),
      imageUrl,
    };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setIsTyping(true);

    const responses = DEMO_RESPONSES[lang] || DEMO_RESPONSES["en"];
    const reply = responses[Math.floor(Math.random() * responses.length)];

    setTimeout(() => {
      setIsTyping(false);
      setMessages((m) => [...m, {
        id: String(msgId++),
        role: "assistant",
        text: imageUrl
          ? (lang === "hi"
            ? "मैंने आपका दस्तावेज़ स्कैन किया। रिपोर्ट में HbA1c: 7.2%, FBS: 142 mg/dL (उच्च ⚠️), BP: 138/88 mmHg दिखता है। यह मधुमेह प्रबंधन के लिए महत्वपूर्ण है।"
            : "I've analyzed your document. The report shows HbA1c: 7.2%, FBS: 142 mg/dL (Elevated ⚠️), BP: 138/88 mmHg. These values suggest diabetes management needs attention. I've flagged the abnormal values for your doctor.")
          : reply,
        timestamp: new Date(),
      }]);
    }, 1500);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    sendMessage(lang === "hi" ? "दस्तावेज़ स्कैन करें" : "Please analyze this document", url);
    setImageMode(false);
  };

  const handleVoice = () => {
    setListening(true);
    setTimeout(() => {
      setListening(false);
      const samples = lang === "hi"
        ? ["मुझे सीने में दर्द हो रहा है", "बुखार तीन दिन से है"]
        : ["I have chest pain since morning", "Fever for three days"];
      sendMessage(samples[Math.floor(Math.random() * samples.length)]);
    }, 2500);
  };

  return (
    <>
      {/* Floating trigger */}
      <button
        className="fixed bottom-6 right-6 z-40 w-16 h-16 rounded-full shadow-2xl flex items-center justify-center transition-transform hover:scale-110 active:scale-95"
        style={{
          background: "linear-gradient(135deg, #1B6CA8 0%, #0A9E74 100%)",
          border: "3px solid white",
        }}
        onClick={() => setOpen(true)}
        aria-label="Open AI Chat"
      >
        <span className="text-3xl">🤖</span>
        <span
          className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-white text-xs font-bold flex items-center justify-center"
          style={{ backgroundColor: "#0A9E74" }}
        >
          AI
        </span>
      </button>

      {/* Chat panel */}
      {open && (
        <div
          className="fixed bottom-24 right-6 z-50 flex flex-col rounded-2xl shadow-2xl animate-chat-slide"
          style={{
            width: "360px",
            maxHeight: "560px",
            backgroundColor: "#fff",
            border: "1.5px solid #C5DCF0",
          }}
        >
          {/* Header */}
          <div
            className="flex items-center gap-3 px-4 py-3 rounded-t-2xl"
            style={{ background: "linear-gradient(135deg, #1B6CA8 0%, #0A9E74 100%)" }}
          >
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-xl">
              🤖
            </div>
            <div className="flex-1">
              <p className="text-white font-bold text-base" style={{ fontFamily: "Poppins, sans-serif" }}>
                Aarogya AI
              </p>
              <p className="text-white/80 text-xs">
                {t("aiChat", lang)} • Multilingual
              </p>
            </div>
            <div className="flex gap-2">
              <button
                className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white text-sm hover:bg-white/30"
                onClick={() => setImageMode(!imageMode)}
                title="Send document image"
              >
                📷
              </button>
              <button
                className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white font-bold hover:bg-white/30"
                onClick={() => setOpen(false)}
              >
                ✕
              </button>
            </div>
          </div>

          {/* Suggested prompts */}
          {messages.length <= 1 && (
            <div className="px-3 pt-2 flex gap-2 flex-wrap">
              {(SUGGESTED_PROMPTS[lang] || SUGGESTED_PROMPTS["en"]).map((p) => (
                <button
                  key={p}
                  className="text-xs px-3 py-1.5 rounded-full font-semibold transition-colors"
                  style={{ backgroundColor: "#EEF5FC", color: "#1B6CA8", border: "1px solid #C5DCF0" }}
                  onClick={() => sendMessage(p)}
                >
                  {p}
                </button>
              ))}
            </div>
          )}

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-3 py-3 space-y-3" style={{ minHeight: "200px" }}>
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.role === "assistant" && (
                  <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center text-sm mr-2 mt-1 shrink-0">
                    🤖
                  </div>
                )}
                <div
                  className="max-w-[75%] rounded-2xl px-4 py-2.5"
                  style={{
                    backgroundColor: msg.role === "user" ? "#1B6CA8" : "#F0F7FF",
                    color: msg.role === "user" ? "#fff" : "#1A2332",
                    borderRadius: msg.role === "user"
                      ? "18px 18px 4px 18px"
                      : "18px 18px 18px 4px",
                  }}
                >
                  {msg.imageUrl && (
                    <img
                      src={msg.imageUrl}
                      alt="Uploaded document"
                      className="rounded-lg mb-2 max-w-full"
                      style={{ maxHeight: "120px", objectFit: "cover" }}
                    />
                  )}
                  <p className="text-sm leading-relaxed">{msg.text}</p>
                  <p className="text-xs mt-1 opacity-60">
                    {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center text-sm mr-2 mt-1">
                  🤖
                </div>
                <div
                  className="px-4 py-3 rounded-2xl"
                  style={{ backgroundColor: "#F0F7FF", borderRadius: "18px 18px 18px 4px" }}
                >
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full animate-wave-1" style={{ backgroundColor: "#1B6CA8" }} />
                    <div className="w-2 h-2 rounded-full animate-wave-2" style={{ backgroundColor: "#1B6CA8" }} />
                    <div className="w-2 h-2 rounded-full animate-wave-3" style={{ backgroundColor: "#1B6CA8" }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input area */}
          <div
            className="px-3 py-3 rounded-b-2xl"
            style={{ borderTop: "1px solid #EEF5FC" }}
          >
            {imageMode && (
              <div
                className="mb-2 p-3 rounded-xl text-center text-sm font-medium cursor-pointer"
                style={{ backgroundColor: "#EEF5FC", border: "2px dashed #C5DCF0", color: "#1B6CA8" }}
                onClick={() => fileRef.current?.click()}
              >
                📎 {lang === "hi" ? "दस्तावेज़ चुनें" : "Tap to select document image"}
              </div>
            )}
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
            <div className="flex gap-2">
              <button
                className="w-10 h-10 rounded-xl flex items-center justify-center transition-all shrink-0"
                style={{
                  backgroundColor: listening ? "#DC2626" : "#EEF5FC",
                  color: listening ? "#fff" : "#1B6CA8",
                }}
                onClick={handleVoice}
              >
                {listening ? (
                  <div className="flex gap-0.5">
                    <div className="w-1 h-4 rounded animate-wave-1" style={{ backgroundColor: "#fff" }} />
                    <div className="w-1 h-4 rounded animate-wave-2" style={{ backgroundColor: "#fff" }} />
                    <div className="w-1 h-4 rounded animate-wave-3" style={{ backgroundColor: "#fff" }} />
                  </div>
                ) : (
                  <span>🎙️</span>
                )}
              </button>
              <input
                className="flex-1 rounded-xl px-4 py-2 text-sm font-medium outline-none"
                style={{
                  backgroundColor: "#EEF5FC",
                  color: "#1A2332",
                  border: "1.5px solid #C5DCF0",
                }}
                placeholder={t("typeMessage", lang)}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
              />
              <button
                className="w-10 h-10 rounded-xl flex items-center justify-center text-white shrink-0 transition-transform active:scale-90"
                style={{ backgroundColor: "#1B6CA8" }}
                onClick={() => sendMessage(input)}
              >
                ➤
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
