import React, { useState } from "react";
import { ScanResult, ViewType, LanguageCode } from "../types";
import { translations } from "../data/translations";
import { diseasesData } from "../data/diseasesData";
import { voiceSpeaker } from "../utils/tts";
import { generatePdfReport } from "../utils/pdfGenerator";
import {
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Volume2,
  VolumeX,
  FileDown,
  BookOpen,
  ArrowLeft,
  Save,
  ShieldCheck,
  Clock,
  Cpu
} from "lucide-react";

interface ResultViewProps {
  scanResult: ScanResult;
  language: LanguageCode;
  onNavigate: (view: ViewType) => void;
  onSaveToHistory: (scan: ScanResult) => void;
  isSaved: boolean;
}

export const ResultView: React.FC<ResultViewProps> = ({
  scanResult,
  language,
  onNavigate,
  onSaveToHistory,
  isSaved
}) => {
  const t = translations[language];
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [isExportingPdf, setIsExportingPdf] = useState<boolean>(false);

  const disease = scanResult.treatmentKey ? diseasesData[scanResult.treatmentKey] : null;

  // Speak aloud in selected language
  const handleToggleVoice = () => {
    if (isSpeaking) {
      voiceSpeaker.stop();
      setIsSpeaking(false);
      return;
    }

    let speechText = "";
    if (language === "sn") {
      speechText = `Kuongorora kwaitwa. Chirimwa: ${scanResult.crop}. Chirwere: ${scanResult.condition}. Chokwadi: chikamu chemakumi ${Math.round(scanResult.confidencePercent)} kubva muzana. ${
        disease ? `Matanho ekutanga: ${disease.actions[0]}.` : ""
      }`;
    } else if (language === "nd") {
      speechText = `Ukuhlola kuqediwe. Isilimo: ${scanResult.crop}. Umkhuhlane: ${scanResult.condition}. Isilinganiso seqiniso: amaphesenti angamashumi ${Math.round(scanResult.confidencePercent)}. ${
        disease ? `Izinyathelo zokuqala: ${disease.actions[0]}.` : ""
      }`;
    } else {
      speechText = `Diagnostic screening complete. Crop: ${scanResult.crop}. Condition identified: ${scanResult.condition}. Confidence score: ${scanResult.confidencePercent} percent. ${
        disease ? `Immediate action: ${disease.actions[0]}. Warning: ${disease.warning}` : ""
      }`;
    }

    setIsSpeaking(true);
    voiceSpeaker.speak(speechText, language, () => {
      setIsSpeaking(false);
    });
  };

  const handleExportPdf = () => {
    setIsExportingPdf(true);
    setTimeout(() => {
      generatePdfReport(scanResult, disease || undefined);
      setIsExportingPdf(false);
    }, 400);
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl mx-auto">
      {/* Navigation & Header Actions */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <button
          onClick={() => onNavigate("scan")}
          className="inline-flex items-center space-x-1.5 text-slate-400 hover:text-white text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{t.btn_retry}</span>
        </button>

        <div className="flex items-center space-x-2">
          {/* Read Aloud Button */}
          <button
            id="result-read-aloud-btn"
            onClick={handleToggleVoice}
            className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
              isSpeaking
                ? "bg-amber-950/80 border-amber-500 text-amber-300"
                : "bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-200"
            }`}
          >
            {isSpeaking ? <VolumeX className="w-3.5 h-3.5 text-amber-400" /> : <Volume2 className="w-3.5 h-3.5 text-emerald-400" />}
            <span>{isSpeaking ? t.btn_voice_stop : t.btn_voice_read}</span>
          </button>

          {/* PDF Report Export Button */}
          <button
            id="result-export-pdf-btn"
            onClick={handleExportPdf}
            disabled={isExportingPdf}
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white shadow-xs transition-colors cursor-pointer"
          >
            <FileDown className="w-3.5 h-3.5" />
            <span>{isExportingPdf ? t.report_downloading : t.btn_generate_report}</span>
          </button>

          {/* Save to History */}
          <button
            id="result-save-history-btn"
            onClick={() => onSaveToHistory(scanResult)}
            disabled={isSaved}
            className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors cursor-pointer ${
              isSaved
                ? "bg-slate-800 border-slate-700 text-emerald-400 opacity-80"
                : "bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-200"
            }`}
          >
            <Save className="w-3.5 h-3.5" />
            <span>{isSaved ? "Saved" : t.btn_save_history}</span>
          </button>
        </div>
      </div>

      {/* Main Diagnostic Banner */}
      <div
        className={`rounded-2xl p-6 border shadow-lg space-y-4 ${
          scanResult.isHighConfidence
            ? "bg-gradient-to-br from-emerald-950/80 via-slate-900 to-slate-900 border-emerald-800/60"
            : "bg-gradient-to-br from-amber-950/80 via-slate-900 to-slate-900 border-amber-800/60"
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                {scanResult.crop}
              </span>
              <span
                className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${
                  scanResult.isHighConfidence
                    ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                    : "bg-amber-500/20 text-amber-300 border-amber-500/40"
                }`}
              >
                {scanResult.resultStatus}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight pt-1">
              {scanResult.condition}
            </h2>
          </div>

          {/* Big Confidence Metric Pill */}
          <div className="bg-slate-900/90 border border-slate-700/80 rounded-2xl p-4 text-center shrink-0 min-w-[140px]">
            <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
              {t.confidence_label}
            </span>
            <div
              className={`text-3xl font-black tracking-tight ${
                scanResult.isHighConfidence ? "text-emerald-400" : "text-amber-400"
              }`}
            >
              {scanResult.confidencePercent}%
            </div>
            <span className="text-[10px] text-slate-500 block">
              {(scanResult.confidenceThreshold * 100).toFixed(0)}% Min Cutoff
            </span>
          </div>
        </div>

        {/* Low Confidence Safe Warning Callout */}
        {!scanResult.isHighConfidence && (
          <div className="bg-amber-950/50 border border-amber-700/50 rounded-xl p-4 space-y-2 text-xs text-amber-200">
            <div className="font-bold flex items-center gap-1.5 text-amber-300 text-sm">
              <AlertTriangle className="w-4 h-4 shrink-0 text-amber-400" />
              <span>Inconclusive Screening — Diagnosis Suppressed</span>
            </div>
            <p className="leading-relaxed text-amber-200/90">
              {t.low_confidence_warning}
            </p>
            <p className="text-[11px] text-amber-300/80">
              To protect crops and prevent harmful misdiagnosis, AgroScan AI refuses to force an unreliable classification when image features lack distinctive disease patterns.
            </p>
          </div>
        )}

        {/* Prominent Scientific Disclaimer */}
        <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-3 flex items-center space-x-2.5 text-xs text-slate-400">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="italic font-medium">{t.screening_disclaimer}</span>
        </div>
      </div>

      {/* Top Candidates Probability Breakdown */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Candidate Probability Distribution
        </h3>
        <div className="space-y-2.5">
          {scanResult.candidates.map((cand, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex justify-between text-xs font-medium text-slate-300">
                <span>{cand.condition}</span>
                <span className="font-mono text-slate-400">
                  {(cand.confidence * 100).toFixed(1)}%
                </span>
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    idx === 0
                      ? scanResult.isHighConfidence
                        ? "bg-emerald-500"
                        : "bg-amber-500"
                      : "bg-slate-600"
                  }`}
                  style={{ width: `${Math.min(100, cand.confidence * 100)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Diagnostic & Agronomic Guidance (when high-confidence) */}
      {disease && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-emerald-400" />
              <span>Recommended Agronomic Actions</span>
            </h3>
            <span className="text-xs text-emerald-400 font-mono">
              Scientific: {disease.scientific_name}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
            {/* Symptoms */}
            <div className="space-y-2">
              <h4 className="font-bold text-slate-200 text-xs uppercase tracking-wider">
                {t.heading_symptoms}
              </h4>
              <ul className="space-y-1.5 text-slate-400 list-disc pl-4 leading-relaxed">
                {disease.symptoms.map((s, idx) => (
                  <li key={idx}>{s}</li>
                ))}
              </ul>
            </div>

            {/* Immediate Actions */}
            <div className="space-y-2">
              <h4 className="font-bold text-emerald-400 text-xs uppercase tracking-wider">
                {t.heading_actions}
              </h4>
              <ul className="space-y-1.5 text-slate-300 list-disc pl-4 leading-relaxed">
                {disease.actions.map((a, idx) => (
                  <li key={idx}>{a}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Agritex & Warning Notice */}
          <div className="bg-red-950/30 border border-red-800/40 rounded-xl p-4 space-y-2 text-xs text-red-300">
            <div className="font-bold flex items-center gap-1.5 text-red-400">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{t.heading_warning}</span>
            </div>
            <p className="leading-relaxed">{disease.warning}</p>
            <p className="font-semibold text-red-200 pt-1 border-t border-red-900/50">
              {t.heading_expert}: {disease.expert}
            </p>
          </div>

          <div className="flex justify-end pt-2">
            <button
              id="view-full-treatment-btn"
              onClick={() => onNavigate("treatment")}
              className="inline-flex items-center space-x-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-4 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
              <span>{t.btn_view_treatment}</span>
            </button>
          </div>
        </div>
      )}

      {/* Model Execution Metadata */}
      <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-500 px-2">
        <div className="flex items-center space-x-2">
          <Cpu className="w-3.5 h-3.5 text-slate-600" />
          <span>{scanResult.modeLabel}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Clock className="w-3.5 h-3.5 text-slate-600" />
          <span>Latency: {scanResult.inferenceTimeMs} ms</span>
        </div>
      </div>
    </div>
  );
};
