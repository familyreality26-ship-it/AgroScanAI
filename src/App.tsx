import React, { useState, useEffect } from "react";
import { ViewType, LanguageCode, ScanResult, HistoryRecord } from "./types";
import { Navbar } from "./components/Navbar";
import { Sidebar } from "./components/Sidebar";
import { DashboardView } from "./components/DashboardView";
import { ScanView } from "./components/ScanView";
import { ResultView } from "./components/ResultView";
import { TreatmentView } from "./components/TreatmentView";
import { HistoryView } from "./components/HistoryView";
import { PerformanceView } from "./components/PerformanceView";
import { CompetitionDocsView } from "./components/CompetitionDocsView";
import { SettingsView } from "./components/SettingsView";
import { AboutView } from "./components/AboutView";
import { sampleLeaves } from "./data/sampleLeaves";

const LOCAL_STORAGE_HISTORY_KEY = "agroscan_history_records_v1";

export default function App() {
  const [currentView, setCurrentView] = useState<ViewType>("dashboard");
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>("en");
  const [confidenceThreshold, setConfidenceThreshold] = useState<number>(0.70);
  const [isDemoMode, setIsDemoMode] = useState<boolean>(true);
  const [isVoiceActive, setIsVoiceActive] = useState<boolean>(true);
  const [activeResult, setActiveResult] = useState<ScanResult | null>(null);
  const [isCurrentResultSaved, setIsCurrentResultSaved] = useState<boolean>(false);
  const [history, setHistory] = useState<HistoryRecord[]>([]);

  // Load initial history from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_HISTORY_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setHistory(parsed);
          return;
        }
      }
    } catch (e) {
      console.warn("Could not load history from localStorage:", e);
    }

    // Default pre-populated seed history for immediate demonstration
    const initialSeed: HistoryRecord[] = [
      {
        id: "seed-1",
        timestamp: new Date(Date.now() - 3600000 * 24).toISOString(),
        imageSrc: sampleLeaves[0].dataUrl,
        crop: "Tomato",
        prediction: "Late Blight (Tomato)",
        confidence: 94.2,
        resultStatus: "High-confidence screening",
        treatmentKey: "Late Blight (Tomato)",
        isHighConfidence: true,
        language: "en"
      },
      {
        id: "seed-2",
        timestamp: new Date(Date.now() - 3600000 * 48).toISOString(),
        imageSrc: sampleLeaves[2].dataUrl,
        crop: "Maize",
        prediction: "Northern Leaf Blight (Maize)",
        confidence: 92.6,
        resultStatus: "High-confidence screening",
        treatmentKey: "Northern Leaf Blight (Maize)",
        isHighConfidence: true,
        language: "en"
      }
    ];
    setHistory(initialSeed);
  }, []);

  // Save to localStorage when history updates
  const updateHistory = (newHistory: HistoryRecord[]) => {
    setHistory(newHistory);
    try {
      localStorage.setItem(LOCAL_STORAGE_HISTORY_KEY, JSON.stringify(newHistory));
    } catch (e) {
      console.warn("Could not persist history to localStorage:", e);
    }
  };

  const handleScanComplete = (result: ScanResult) => {
    setActiveResult(result);
    setIsCurrentResultSaved(false);
    setCurrentView("result");
  };

  const handleSaveToHistory = (scan: ScanResult) => {
    const record: HistoryRecord = {
      id: scan.id,
      timestamp: scan.timestamp,
      imageSrc: scan.imageSrc,
      crop: scan.crop,
      prediction: scan.condition,
      confidence: scan.confidencePercent,
      resultStatus: scan.resultStatus,
      treatmentKey: scan.treatmentKey || undefined,
      isHighConfidence: scan.isHighConfidence,
      language: currentLanguage
    };

    const updated = [record, ...history];
    updateHistory(updated);
    setIsCurrentResultSaved(true);
  };

  const handleSelectHistoryRecord = (record: HistoryRecord) => {
    const syntheticResult: ScanResult = {
      id: record.id,
      timestamp: record.timestamp,
      imageSrc: record.imageSrc,
      crop: record.crop,
      condition: record.prediction,
      treatmentKey: record.treatmentKey || null,
      confidenceDecimal: record.confidence / 100,
      confidencePercent: record.confidence,
      confidenceThreshold: confidenceThreshold,
      isHighConfidence: record.isHighConfidence,
      resultStatus: record.resultStatus,
      isDemoMode,
      modeLabel: isDemoMode ? "AI model not installed — demonstration mode" : "MobileNetV3 Edge Inference",
      inferenceTimeMs: 38,
      modelVersion: "AgroScan-MobileNetV3-v1.2-intl",
      disclaimer: "AI-assisted screening — not a laboratory diagnosis.",
      candidates: [
        {
          condition: record.prediction,
          crop: record.crop,
          confidence: record.confidence / 100
        }
      ]
    };

    setActiveResult(syntheticResult);
    setIsCurrentResultSaved(true);
    setCurrentView("result");
  };

  const handleDeleteRecord = (id: string) => {
    const filtered = history.filter((h) => h.id !== id);
    updateHistory(filtered);
  };

  const handleClearHistory = () => {
    if (window.confirm("Are you sure you want to clear all local scan history?")) {
      updateHistory([]);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-white">
      {/* Top Navigation Bar */}
      <Navbar
        currentLanguage={currentLanguage}
        onLanguageChange={setCurrentLanguage}
        confidenceThreshold={confidenceThreshold}
        isVoiceActive={isVoiceActive}
        onToggleVoice={() => setIsVoiceActive(!isVoiceActive)}
        isDemoMode={isDemoMode}
      />

      {/* Main Content Layout */}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Persistent Collapsible Sidebar */}
        <Sidebar
          currentView={currentView}
          onNavigate={setCurrentView}
          language={currentLanguage}
          hasActiveResult={activeResult !== null}
        />

        {/* View Container */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto max-w-7xl w-full">
          {currentView === "dashboard" && (
            <DashboardView
              onNavigate={setCurrentView}
              language={currentLanguage}
              totalScans={history.length}
              confidenceThreshold={confidenceThreshold}
            />
          )}

          {currentView === "scan" && (
            <ScanView
              language={currentLanguage}
              confidenceThreshold={confidenceThreshold}
              isDemoMode={isDemoMode}
              onScanComplete={handleScanComplete}
            />
          )}

          {currentView === "result" && activeResult && (
            <ResultView
              scanResult={activeResult}
              language={currentLanguage}
              onNavigate={setCurrentView}
              onSaveToHistory={handleSaveToHistory}
              isSaved={isCurrentResultSaved}
            />
          )}

          {currentView === "treatment" && (
            <TreatmentView language={currentLanguage} />
          )}

          {currentView === "history" && (
            <HistoryView
              history={history}
              language={currentLanguage}
              onSelectRecord={handleSelectHistoryRecord}
              onDeleteRecord={handleDeleteRecord}
              onClearHistory={handleClearHistory}
            />
          )}

          {currentView === "performance" && (
            <PerformanceView language={currentLanguage} />
          )}

          {currentView === "docs" && (
            <CompetitionDocsView language={currentLanguage} />
          )}

          {currentView === "settings" && (
            <SettingsView
              language={currentLanguage}
              onLanguageChange={setCurrentLanguage}
              confidenceThreshold={confidenceThreshold}
              onThresholdChange={setConfidenceThreshold}
              isDemoMode={isDemoMode}
              onToggleDemoMode={setIsDemoMode}
              isVoiceActive={isVoiceActive}
              onToggleVoice={() => setIsVoiceActive(!isVoiceActive)}
            />
          )}

          {currentView === "about" && (
            <AboutView language={currentLanguage} />
          )}
        </main>
      </div>
    </div>
  );
}
