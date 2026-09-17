import React from "react";
import { LanguageCode } from "../types";
import { translations } from "../data/translations";
import {
  Info,
  Award,
  ShieldCheck,
  Heart,
  MapPin,
  Users,
  Code,
  Sparkles
} from "lucide-react";

interface AboutViewProps {
  language: LanguageCode;
}

export const AboutView: React.FC<AboutViewProps> = ({ language }) => {
  const t = translations[language];

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl mx-auto">
      {/* Title */}
      <div className="border-b border-slate-800 pb-4">
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
          <Info className="w-6 h-6 text-emerald-400" />
          <span>{t.nav_about}</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-400">
          Project mission, agronomic background, and competition information.
        </p>
      </div>

      {/* Hero Badge */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-3">
        <div className="flex items-center space-x-2 text-xs font-bold text-emerald-400 uppercase tracking-wider">
          <Award className="w-4 h-4" />
          <span>National Student Innovation & Technology Competition Entry</span>
        </div>
        <h3 className="text-lg sm:text-xl font-extrabold text-white">
          AGROSCAN AI: Smart Crop Health & Disease Detection
        </h3>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Developed to bridge the critical technical gap between advanced artificial intelligence and the rural smallholder farmer. By deploying lightweight, edge-optimized computer vision locally on standard consumer devices, AgroScan AI provides immediate, life-saving disease detection and sustainable cultural guidance where network connectivity and extension officers are scarce.
        </p>
      </div>

      {/* Key Focus Dimensions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
            <MapPin className="w-4 h-4" />
          </div>
          <h4 className="font-bold text-slate-200">Local Relevance</h4>
          <p className="text-slate-400 leading-relaxed">
            Tailored specifically to Southern African agricultural conditions, focusing on staple maize, tomatoes, potatoes, legumes, and tobacco with authentic chiShona and isiNdebele translations.
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-2">
          <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <h4 className="font-bold text-slate-200">Scientific Honesty</h4>
          <p className="text-slate-400 leading-relaxed">
            We never claim 100% diagnostic perfection. A strict 70% confidence rejection filter ensures that ambiguous or unknown leaves are deferred to certified Agritex extension officers.
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-2">
          <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center">
            <Heart className="w-4 h-4" />
          </div>
          <h4 className="font-bold text-slate-200">Inclusive Design</h4>
          <p className="text-slate-400 leading-relaxed">
            Built for farmers of all literacy levels with spoken voice synthesis, high-contrast visual cues, and zero internet dependency.
          </p>
        </div>
      </div>

      {/* Technical Heritage */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3 text-xs text-slate-400">
        <h4 className="font-bold text-slate-200 text-sm flex items-center gap-2">
          <Code className="w-4 h-4 text-emerald-400" />
          <span>Technology Stack & References</span>
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 font-mono text-[11px]">
          <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
            <span className="text-emerald-400 block font-bold">MobileNetV3</span>
            <span className="text-slate-500 text-[10px]">Deep CNN Backbone</span>
          </div>
          <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
            <span className="text-blue-400 block font-bold">Python / Tkinter</span>
            <span className="text-slate-500 text-[10px]">Offline Desktop App</span>
          </div>
          <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
            <span className="text-purple-400 block font-bold">SQLite3</span>
            <span className="text-slate-500 text-[10px]">Local Database</span>
          </div>
          <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
            <span className="text-amber-400 block font-bold">React / Vite</span>
            <span className="text-slate-500 text-[10px]">Web Simulation</span>
          </div>
        </div>
      </div>
    </div>
  );
};
