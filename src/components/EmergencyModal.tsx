import { useState } from "react";
import { t } from "../types";

type Props = {
  lang: string;
  onClose: () => void;
};

export default function EmergencyModal({ lang, onClose }: Props) {
  const [calling, setCalling] = useState<string | null>(null);

  const handleCall = (service: string, number: string) => {
    setCalling(`${service} (${number})`);
    setTimeout(() => {
      setCalling(null);
    }, 4000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: "rgba(0,0,0,0.75)" }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl p-8 max-w-sm w-full mx-4 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        style={{ border: "4px solid #DC2626" }}
      >
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center text-3xl emergency-pulse"
            style={{ backgroundColor: "#DC2626" }}
          >
            🚨
          </div>
          <div>
            <h2
              className="text-2xl font-bold"
              style={{ fontFamily: "Poppins, sans-serif", color: "#DC2626" }}
            >
              {t("emergencyAlert", lang)}
            </h2>
            <p className="text-sm" style={{ color: "#5A7896" }}>
              ABDM Red Flag Protocol Active
            </p>
          </div>
        </div>

        {calling ? (
          <div
            className="rounded-xl p-5 mb-5 text-center"
            style={{ backgroundColor: "#FEF2F2", border: "2px solid #FCA5A5" }}
          >
            <div className="text-4xl mb-2">📞</div>
            <p className="font-bold text-lg" style={{ color: "#DC2626" }}>
              {t("emergencyConfirm", lang)}
            </p>
            <p className="text-base font-semibold mt-1">{calling}</p>
            <div className="flex justify-center gap-1 mt-3">
              <div className="w-2 h-2 rounded-full animate-wave-1" style={{ backgroundColor: "#DC2626" }} />
              <div className="w-2 h-2 rounded-full animate-wave-2" style={{ backgroundColor: "#DC2626" }} />
              <div className="w-2 h-2 rounded-full animate-wave-3" style={{ backgroundColor: "#DC2626" }} />
            </div>
          </div>
        ) : null}

        <div className="space-y-3 mb-6">
          <button
            className="w-full touch-target flex items-center gap-4 rounded-xl px-5 py-4 font-bold text-lg text-white transition-transform active:scale-95"
            style={{ backgroundColor: "#DC2626", fontFamily: "Poppins, sans-serif" }}
            onClick={() => handleCall("Ambulance", "108")}
          >
            <span className="text-2xl">🚑</span>
            <span>{t("call108", lang)}</span>
          </button>

          <button
            className="w-full touch-target flex items-center gap-4 rounded-xl px-5 py-4 font-bold text-lg text-white transition-transform active:scale-95"
            style={{ backgroundColor: "#1B6CA8", fontFamily: "Poppins, sans-serif" }}
            onClick={() => handleCall("Police", "112")}
          >
            <span className="text-2xl">🚔</span>
            <span>{t("call112", lang)}</span>
          </button>

          <button
            className="w-full touch-target flex items-center gap-4 rounded-xl px-5 py-4 font-bold text-lg text-white transition-transform active:scale-95"
            style={{ backgroundColor: "#0A9E74", fontFamily: "Poppins, sans-serif" }}
            onClick={() => handleCall("Triage Nurse", "Hospital Desk")}
          >
            <span className="text-2xl">🏥</span>
            <span>Alert Triage Staff</span>
          </button>
        </div>

        <p
          className="text-center text-sm mb-4 font-semibold rounded-lg p-3"
          style={{ backgroundColor: "#FFFBEB", color: "#92400E" }}
        >
          Triage staff have been notified. Please remain seated.
        </p>

        <button
          className="w-full touch-target rounded-xl px-5 py-3 font-semibold text-base border-2 transition-colors"
          style={{ borderColor: "#C5DCF0", color: "#5A7896" }}
          onClick={onClose}
        >
          {t("back", lang)}
        </button>
      </div>
    </div>
  );
}
