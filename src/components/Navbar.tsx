import React from "react";
import { LanguageCode } from "../types";
import { translations } from "../data/translations";
import { Leaf, Globe, ShieldCheck, Volume2, VolumeX, Cpu } from "lucide-react";

interface NavbarProps {
  currentLanguage: LanguageCode;
  onLanguageChange: (lang: LanguageCode) => void;
  confidenceThreshold: number;
  isVoiceActive: boolean;
  onToggleVoice: () => void;
  isDemoMode: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentLanguage,
  onLanguageChange,
  confidenceThreshold,
  isVoiceActive,
  onToggleVoice,
  isDemoMode
}) => {
  const t = translations[currentLanguage];

  return (
    <header id="agroscan-navbar" className="bg-slate-900 border-b border-slate-800 text-white sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand & Identity */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-600/30 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-sm">
            <Leaf className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-base sm:text-lg font-bold tracking-tight text-white flex items-center gap-1.5">
                {t.app_title}
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  v1.2-intl
                </span>
              </h1>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              {t.app_subtitle}
            </p>
          </div>
        </div>

        {/* Status Indicators & Language Controls */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Mode Pill */}
          <div className="hidden md:flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700 text-xs text-slate-300">
            <Cpu className="w-3.5 h-3.5 text-emerald-400" />
            <span>{isDemoMode ? "Calibrated Demo" : "MobileNetV3 Edge"}</span>
            <span className="text-slate-500">|</span>
            <span className="text-slate-400 font-mono">{(confidenceThreshold * 100).toFixed(0)}% Min</span>
          </div>

          {/* Voice Toggle */}
          <button
            id="voice-toggle-btn"
            onClick={onToggleVoice}
            title={isVoiceActive ? "Mute Voice Engine" : "Enable Voice Assistant"}
            className={`p-2 rounded-lg text-xs font-medium border transition-colors flex items-center space-x-1 ${
              isVoiceActive
                ? "bg-emerald-900/40 border-emerald-600 text-emerald-300"
                : "bg-slate-800/80 border-slate-700 text-slate-400 hover:text-slate-200"
            }`}
          >
            {isVoiceActive ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            <span className="hidden lg:inline">{isVoiceActive ? "Voice On" : "Muted"}</span>
          </button>

          {/* Multilingual Selector (EN, SN, ND) */}
          <div className="flex items-center bg-slate-800 p-0.5 rounded-lg border border-slate-700">
            <Globe className="w-3.5 h-3.5 text-slate-400 ml-2 mr-1 hidden sm:inline" />
            <button
              id="lang-btn-en"
              onClick={() => onLanguageChange("en")}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all ${
                currentLanguage === "en"
                  ? "bg-emerald-600 text-white shadow-xs"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              EN
            </button>
            <button
              id="lang-btn-sn"
              onClick={() => onLanguageChange("sn")}
              title="chiShona"
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all ${
                currentLanguage === "sn"
                  ? "bg-emerald-600 text-white shadow-xs"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              SN
            </button>
            <button
              id="lang-btn-nd"
              onClick={() => onLanguageChange("nd")}
              title="isiNdebele"
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all ${
                currentLanguage === "nd"
                  ? "bg-emerald-600 text-white shadow-xs"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              ND
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
