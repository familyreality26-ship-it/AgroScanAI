import React from "react";
import { LanguageCode } from "../types";
import { translations } from "../data/translations";
import {
  Settings,
  Sliders,
  Cpu,
  Volume2,
  Globe,
  ShieldCheck,
  CheckCircle2
} from "lucide-react";

interface SettingsViewProps {
  language: LanguageCode;
  onLanguageChange: (lang: LanguageCode) => void;
  confidenceThreshold: number;
  onThresholdChange: (threshold: number) => void;
  isDemoMode: boolean;
  onToggleDemoMode: (isDemo: boolean) => void;
  isVoiceActive: boolean;
  onToggleVoice: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  language,
  onLanguageChange,
  confidenceThreshold,
  onThresholdChange,
  isDemoMode,
  onToggleDemoMode,
  isVoiceActive,
  onToggleVoice
}) => {
  const t = translations[language];

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl mx-auto">
      {/* Title */}
      <div className="border-b border-slate-800 pb-4">
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
          <Settings className="w-6 h-6 text-emerald-400" />
          <span>{t.nav_settings}</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-400">
          Configure diagnostic thresholds, system execution modes, and speech parameters.
        </p>
      </div>

      {/* Settings Grid */}
      <div className="space-y-4">
        {/* 1. Confidence Threshold Slider */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <Sliders className="w-4 h-4 text-emerald-400" />
              <h3 className="text-sm font-bold text-white">
                {t.threshold_label} (Rejection Cutoff)
              </h3>
            </div>
            <span className="text-sm font-black font-mono text-emerald-400 bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
              {(confidenceThreshold * 100).toFixed(0)}%
            </span>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed">
            Inferences with confidence below this threshold are marked as <strong>inconclusive</strong> and will not prescribe medical or agricultural treatments. Recommended baseline is 70%.
          </p>

          <input
            id="confidence-threshold-slider"
            type="range"
            min="0.50"
            max="0.95"
            step="0.05"
            value={confidenceThreshold}
            onChange={(e) => onThresholdChange(parseFloat(e.target.value))}
            className="w-full accent-emerald-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
          />

          <div className="flex justify-between text-[10px] text-slate-500 font-mono">
            <span>50% (Permissive)</span>
            <span>70% (Recommended)</span>
            <span>95% (Very Strict)</span>
          </div>
        </div>

        {/* 2. Execution Mode Selection */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
          <div className="flex items-center space-x-2.5">
            <Cpu className="w-4 h-4 text-blue-400" />
            <h3 className="text-sm font-bold text-white">
              Inference Mode & Model Execution
            </h3>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed">
            AgroScan AI maintains scientific honesty. You can toggle between demonstration simulation and active local edge execution.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <button
              onClick={() => onToggleDemoMode(true)}
              className={`p-3 rounded-xl border text-left transition-all ${
                isDemoMode
                  ? "bg-emerald-950/60 border-emerald-500 text-white ring-1 ring-emerald-500"
                  : "bg-slate-800/60 border-slate-700 text-slate-400 hover:bg-slate-800 hover:text-slate-200"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-white">Calibrated Demo Mode</span>
                {isDemoMode && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
              </div>
              <p className="text-[11px] text-slate-400">
                Safe offline competition simulation mode (labeled as demo mode).
              </p>
            </button>

            <button
              onClick={() => onToggleDemoMode(false)}
              className={`p-3 rounded-xl border text-left transition-all ${
                !isDemoMode
                  ? "bg-emerald-950/60 border-emerald-500 text-white ring-1 ring-emerald-500"
                  : "bg-slate-800/60 border-slate-700 text-slate-400 hover:bg-slate-800 hover:text-slate-200"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-white">MobileNetV3 Edge Inference</span>
                {!isDemoMode && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
              </div>
              <p className="text-[11px] text-slate-400">
                Full client edge neural network with hard-swish SE layers.
              </p>
            </button>
          </div>
        </div>

        {/* 3. Language & Audio Preferences */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
          <div className="flex items-center space-x-2.5">
            <Globe className="w-4 h-4 text-purple-400" />
            <h3 className="text-sm font-bold text-white">
              Language & Accessibility Preferences
            </h3>
          </div>

          <div className="flex items-center justify-between pt-1">
            <div>
              <span className="text-xs font-semibold text-slate-200 block">
                Native Language Interface
              </span>
              <span className="text-[11px] text-slate-500">
                Switches all screens, advisories, and voice readings.
              </span>
            </div>

            <select
              value={language}
              onChange={(e) => onLanguageChange(e.target.value as LanguageCode)}
              className="bg-slate-800 border border-slate-700 text-white text-xs font-semibold rounded-lg px-3 py-1.5 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
            >
              <option value="en">English (UK/ZW)</option>
              <option value="sn">chiShona (Zimbabwe)</option>
              <option value="nd">isiNdebele (Zimbabwe)</option>
            </select>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-slate-800">
            <div>
              <span className="text-xs font-semibold text-slate-200 block">
                Speech Synthesizer (Text-to-Speech)
              </span>
              <span className="text-[11px] text-slate-500">
                Provides audible diagnostic narration for semi-literate farmers.
              </span>
            </div>

            <button
              onClick={onToggleVoice}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                isVoiceActive
                  ? "bg-emerald-600 text-white border-emerald-500"
                  : "bg-slate-800 text-slate-400 border-slate-700"
              }`}
            >
              {isVoiceActive ? "Enabled" : "Disabled"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
