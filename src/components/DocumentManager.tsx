import { useState, useRef } from "react";
import { Document, t } from "../types";

type Props = { lang: string };

const SAMPLE_DOCS: Document[] = [
  {
    id: "1",
    name: "Dr. Sharma Prescription",
    type: "prescription",
    date: "2024-11-15",
    summary: "Metformin 500mg BD, Amlodipine 5mg OD, Atorvastatin 10mg HS",
    imageUrl: "https://images.unsplash.com/photo-1585435557343-3b092031a831?w=400&h=250&fit=crop&auto=format",
  },
  {
    id: "2",
    name: "Blood Test Report — Nov 2024",
    type: "lab",
    date: "2024-11-10",
    summary: "HbA1c: 7.2% | FBS: 142 mg/dL | Creatinine: 1.1 mg/dL | Hb: 11.2 g/dL",
    abnormalFlags: ["FBS: 142 mg/dL (High)", "Hb: 11.2 g/dL (Low)"],
    imageUrl: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400&h=250&fit=crop&auto=format",
  },
  {
    id: "3",
    name: "Discharge Summary — AIIMS 2023",
    type: "discharge",
    date: "2023-07-22",
    summary: "Admitted for Acute MI. Treated with PTCA. Discharged with aspirin, clopidogrel, statin.",
    abnormalFlags: ["Troponin: 2.4 ng/mL (Critical High)"],
    imageUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=250&fit=crop&auto=format",
  },
];

const TYPE_COLORS: Record<string, { bg: string; text: string; label: string; icon: string }> = {
  prescription: { bg: "#EEF5FC", text: "#1B6CA8", label: "Prescription", icon: "💊" },
  lab: { bg: "#F0FDF4", text: "#16A34A", label: "Lab Report", icon: "🧪" },
  discharge: { bg: "#F5F3FF", text: "#7C3AED", label: "Discharge", icon: "🏥" },
  scan: { bg: "#FFFBEB", text: "#B45309", label: "Scan", icon: "📷" },
  other: { bg: "#F9FAFB", text: "#374151", label: "Other", icon: "📄" },
};

export default function DocumentManager({ lang }: Props) {
  const [docs, setDocs] = useState<Document[]>(SAMPLE_DOCS);
  const [scanning, setScanning] = useState(false);
  const [ocrProcessing, setOcrProcessing] = useState(false);
  const [ocrDone, setOcrDone] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const [view, setView] = useState<"grid" | "timeline">("grid");
  const [expandedDoc, setExpandedDoc] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setOcrProcessing(true);
    setShowUpload(false);
    setTimeout(() => {
      setOcrProcessing(false);
      setOcrDone(true);
      const newDoc: Document = {
        id: String(Date.now()),
        name: file.name.replace(/\.[^.]+$/, "") || "Uploaded Document",
        type: "scan",
        date: new Date().toISOString().split("T")[0],
        summary: lang === "hi"
          ? "OCR द्वारा पहचाना गया: BP 138/88 mmHg, ग्लूकोज 142 mg/dL — विवरण के लिए दस्तावेज़ देखें"
          : "OCR Detected: BP 138/88 mmHg, Glucose 142 mg/dL — see document for details",
        imageUrl: URL.createObjectURL(file),
      };
      setDocs((d) => [newDoc, ...d]);
      setTimeout(() => setOcrDone(false), 3000);
    }, 2500);
  };

  const handleDelete = (id: string) => {
    setDocs((d) => d.filter((doc) => doc.id !== id));
    setDeleteConfirm(null);
    setExpandedDoc(null);
  };

  const sortedDocs = [...docs].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      {/* OCR toast */}
      {ocrProcessing && (
        <div
          className="fixed top-24 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl animate-float-up"
          style={{ backgroundColor: "#1B6CA8", color: "#fff" }}
        >
          <div className="flex gap-1">
            <div className="w-2 h-2 rounded-full animate-wave-1 bg-white" />
            <div className="w-2 h-2 rounded-full animate-wave-2 bg-white" />
            <div className="w-2 h-2 rounded-full animate-wave-3 bg-white" />
          </div>
          <span className="font-semibold">{t("ocrProcessing", lang)}</span>
        </div>
      )}

      {ocrDone && (
        <div
          className="fixed top-24 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl animate-float-up"
          style={{ backgroundColor: "#0A9E74", color: "#fff" }}
        >
          <span className="text-xl">✅</span>
          <span className="font-semibold">{t("ocrDone", lang)}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h2
          className="text-2xl font-black"
          style={{ fontFamily: "Poppins, sans-serif", color: "#1A2332" }}
        >
          {t("documents", lang)}
        </h2>
        <div className="flex gap-2">
          <button
            className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold transition-all"
            style={{
              backgroundColor: view === "grid" ? "#1B6CA8" : "#EEF5FC",
              color: view === "grid" ? "#fff" : "#5A7896",
            }}
            onClick={() => setView("grid")}
          >
            ▦
          </button>
          <button
            className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold transition-all"
            style={{
              backgroundColor: view === "timeline" ? "#1B6CA8" : "#EEF5FC",
              color: view === "timeline" ? "#fff" : "#5A7896",
            }}
            onClick={() => setView("timeline")}
          >
            ≡
          </button>
        </div>
      </div>

      {/* Upload actions */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <button
          className="touch-target flex items-center gap-3 rounded-xl px-4 py-4 font-bold transition-all active:scale-95"
          style={{ background: "linear-gradient(135deg, #1B6CA8, #0A9E74)", color: "#fff" }}
          onClick={() => fileRef.current?.click()}
        >
          <span className="text-2xl">📷</span>
          <span>{t("scanDoc", lang)}</span>
        </button>
        <button
          className="touch-target flex items-center gap-3 rounded-xl px-4 py-4 font-bold transition-all active:scale-95"
          style={{ backgroundColor: "#EEF5FC", color: "#1B6CA8", border: "2px solid #C5DCF0" }}
          onClick={() => fileRef.current?.click()}
        >
          <span className="text-2xl">📤</span>
          <span>{t("uploadDoc", lang)}</span>
        </button>
      </div>

      <input
        ref={fileRef}
        type="file"
        accept="image/*,.pdf"
        className="hidden"
        onChange={handleFileUpload}
      />

      {/* Abnormal values summary */}
      {docs.some((d) => d.abnormalFlags?.length) && (
        <div
          className="rounded-xl p-4 mb-5"
          style={{ backgroundColor: "#FEF2F2", border: "1.5px solid #FCA5A5" }}
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">⚠️</span>
            <p className="font-bold" style={{ color: "#DC2626", fontFamily: "Poppins, sans-serif" }}>
              {t("abnormal", lang)}
            </p>
          </div>
          {docs.flatMap((d) => d.abnormalFlags || []).map((flag, i) => (
            <div key={i} className="text-sm font-semibold" style={{ color: "#B91C1C" }}>
              • {flag}
            </div>
          ))}
        </div>
      )}

      {/* Documents */}
      {docs.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-6xl mb-3">📂</div>
          <p className="text-lg font-bold" style={{ color: "#1A2332" }}>{t("noDocuments", lang)}</p>
          <p className="text-sm mt-1" style={{ color: "#5A7896" }}>{t("uploadFirst", lang)}</p>
        </div>
      ) : view === "grid" ? (
        <div className="space-y-3">
          {sortedDocs.map((doc) => {
            const meta = TYPE_COLORS[doc.type] || TYPE_COLORS.other;
            const expanded = expandedDoc === doc.id;
            return (
              <div
                key={doc.id}
                className="rounded-2xl overflow-hidden transition-all"
                style={{
                  backgroundColor: "#fff",
                  border: "1.5px solid #C5DCF0",
                  boxShadow: expanded ? "0 8px 24px rgba(0,0,0,0.1)" : "0 2px 8px rgba(0,0,0,0.05)",
                }}
              >
                <button
                  className="w-full flex items-center gap-4 p-4 text-left"
                  onClick={() => setExpandedDoc(expanded ? null : doc.id)}
                >
                  {doc.imageUrl && (
                    <img
                      src={doc.imageUrl}
                      alt={doc.name}
                      className="w-16 h-16 rounded-xl object-cover shrink-0"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className="text-xs font-bold px-2 py-0.5 rounded-full"
                        style={{ backgroundColor: meta.bg, color: meta.text }}
                      >
                        {meta.icon} {meta.label}
                      </span>
                    </div>
                    <p className="font-bold text-sm truncate" style={{ color: "#1A2332" }}>{doc.name}</p>
                    <p className="text-xs mt-0.5" style={{ color: "#5A7896" }}>{doc.date}</p>
                  </div>
                  <span style={{ color: "#5A7896" }}>{expanded ? "▲" : "▼"}</span>
                </button>

                {expanded && (
                  <div className="px-4 pb-4 animate-float-up">
                    <p className="text-sm mb-3" style={{ color: "#1A2332" }}>{doc.summary}</p>
                    {doc.abnormalFlags && (
                      <div
                        className="rounded-lg p-3 mb-3"
                        style={{ backgroundColor: "#FEF2F2" }}
                      >
                        {doc.abnormalFlags.map((f, i) => (
                          <p key={i} className="text-xs font-semibold" style={{ color: "#DC2626" }}>⚠️ {f}</p>
                        ))}
                      </div>
                    )}
                    <div className="flex gap-2">
                      <button
                        className="flex-1 py-2.5 rounded-xl text-sm font-semibold"
                        style={{ backgroundColor: "#EEF5FC", color: "#1B6CA8" }}
                      >
                        {lang === "hi" ? "पूरा देखें" : "View Full"}
                      </button>
                      {deleteConfirm === doc.id ? (
                        <button
                          className="flex-1 py-2.5 rounded-xl text-sm font-bold"
                          style={{ backgroundColor: "#DC2626", color: "#fff" }}
                          onClick={() => handleDelete(doc.id)}
                        >
                          {lang === "hi" ? "हाँ, हटाएं" : "Yes, Delete"}
                        </button>
                      ) : (
                        <button
                          className="flex-1 py-2.5 rounded-xl text-sm font-semibold"
                          style={{ backgroundColor: "#FEF2F2", color: "#DC2626" }}
                          onClick={() => setDeleteConfirm(doc.id)}
                        >
                          {lang === "hi" ? "हटाएं" : "Remove"}
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        /* Timeline view */
        <div className="relative pl-6">
          <div
            className="absolute left-2 top-0 bottom-0 w-0.5 rounded-full"
            style={{ backgroundColor: "#C5DCF0" }}
          />
          {sortedDocs.map((doc) => {
            const meta = TYPE_COLORS[doc.type] || TYPE_COLORS.other;
            return (
              <div key={doc.id} className="relative mb-6">
                <div
                  className="absolute -left-4 top-4 w-4 h-4 rounded-full border-2 border-white"
                  style={{ backgroundColor: meta.text }}
                />
                <div
                  className="rounded-xl p-4"
                  style={{ backgroundColor: "#fff", border: "1.5px solid #C5DCF0" }}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold" style={{ color: "#5A7896" }}>{doc.date}</span>
                    <span
                      className="text-xs font-bold px-2 py-0.5 rounded-full"
                      style={{ backgroundColor: meta.bg, color: meta.text }}
                    >
                      {meta.icon} {meta.label}
                    </span>
                  </div>
                  <p className="font-bold text-sm mb-1" style={{ color: "#1A2332" }}>{doc.name}</p>
                  <p className="text-xs" style={{ color: "#5A7896" }}>{doc.summary}</p>
                  {doc.abnormalFlags?.map((f, i) => (
                    <p key={i} className="text-xs font-semibold mt-1" style={{ color: "#DC2626" }}>⚠️ {f}</p>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="h-6" />
    </div>
  );
}
