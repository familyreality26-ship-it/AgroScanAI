import React, { useState } from "react";
import { LanguageCode } from "../types";
import { translations } from "../data/translations";
import { diseasesData } from "../data/diseasesData";
import {
  BookOpen,
  Filter,
  AlertTriangle,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  ExternalLink,
  ChevronDown,
  ChevronUp
} from "lucide-react";

interface TreatmentViewProps {
  language: LanguageCode;
}

export const TreatmentView: React.FC<TreatmentViewProps> = ({ language }) => {
  const t = translations[language];
  const [selectedCropFilter, setSelectedCropFilter] = useState<string>("all");
  const [expandedDisease, setExpandedDisease] = useState<string>("Late Blight (Tomato)");

  const diseaseEntries = Object.entries(diseasesData).filter(([_, info]) => {
    if (selectedCropFilter === "all") return true;
    return info.crop.toLowerCase().includes(selectedCropFilter.toLowerCase());
  });

  return (
    <div className="space-y-6 animate-fade-in max-w-5xl mx-auto">
      {/* Title & Filter Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-emerald-400" />
            <span>{t.nav_treatment}</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Verified agronomic protocols grounded in Agritex Zimbabwe, CIMMYT, and CABI technical guidelines.
          </p>
        </div>

        {/* Filter by Crop */}
        <div className="flex items-center space-x-2">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          <select
            value={selectedCropFilter}
            onChange={(e) => setSelectedCropFilter(e.target.value)}
            className="bg-slate-800 border border-slate-700 text-white text-xs font-semibold rounded-lg px-3 py-1.5 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
          >
            <option value="all">{t.crop_all}</option>
            <option value="Tomato">{t.crop_tomato}</option>
            <option value="Maize">{t.crop_maize}</option>
            <option value="Potato">{t.crop_potato}</option>
            <option value="Beans">{t.crop_beans}</option>
            <option value="Tobacco">{t.crop_tobacco}</option>
          </select>
        </div>
      </div>

      {/* Disease Cards List */}
      <div className="space-y-4">
        {diseaseEntries.map(([diseaseName, disease]) => {
          const isExpanded = expandedDisease === diseaseName;
          const isHealthy = disease.severity === "Healthy";
          const isCritical = disease.severity === "Critical";

          return (
            <div
              key={diseaseName}
              id={`disease-card-${diseaseName.replace(/\s+/g, "-")}`}
              className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden transition-all shadow-xs"
            >
              {/* Accordion Header */}
              <button
                onClick={() => setExpandedDisease(isExpanded ? "" : diseaseName)}
                className="w-full p-5 flex items-center justify-between text-left hover:bg-slate-800/40 transition-colors cursor-pointer"
              >
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                      {disease.crop}
                    </span>
                    <span
                      className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${
                        isHealthy
                          ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                          : isCritical
                          ? "bg-red-500/20 text-red-300 border-red-500/30"
                          : "bg-amber-500/20 text-amber-300 border-amber-500/30"
                      }`}
                    >
                      {disease.severity}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                    {diseaseName}
                  </h3>
                  <p className="text-xs italic text-slate-400">
                    Scientific: {disease.scientific_name}
                  </p>
                </div>

                <div className="text-slate-400 p-2 rounded-lg bg-slate-800/60">
                  {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </div>
              </button>

              {/* Accordion Body */}
              {isExpanded && (
                <div className="p-5 sm:p-6 border-t border-slate-800 space-y-6 bg-slate-950/40 text-xs">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Symptoms */}
                    <div className="space-y-2">
                      <h4 className="font-bold text-slate-200 uppercase tracking-wider text-xs flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-amber-400" />
                        <span>{t.heading_symptoms}</span>
                      </h4>
                      <ul className="space-y-1.5 text-slate-400 list-disc pl-5 leading-relaxed">
                        {disease.symptoms.map((s, idx) => (
                          <li key={idx}>{s}</li>
                        ))}
                      </ul>
                    </div>

                    {/* Immediate Field Actions */}
                    <div className="space-y-2">
                      <h4 className="font-bold text-emerald-400 uppercase tracking-wider text-xs flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-400" />
                        <span>{t.heading_actions}</span>
                      </h4>
                      <ul className="space-y-1.5 text-slate-300 list-disc pl-5 leading-relaxed">
                        {disease.actions.map((a, idx) => (
                          <li key={idx}>{a}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 border-t border-slate-800/60">
                    {/* Prevention & Cultural Practices */}
                    <div className="space-y-2">
                      <h4 className="font-bold text-slate-200 uppercase tracking-wider text-xs">
                        {t.heading_prevention}
                      </h4>
                      <ul className="space-y-1.5 text-slate-400 list-disc pl-5 leading-relaxed">
                        {disease.prevention.map((p, idx) => (
                          <li key={idx}>{p}</li>
                        ))}
                      </ul>
                    </div>

                    {/* Management & Safe Handling */}
                    <div className="space-y-2">
                      <h4 className="font-bold text-slate-200 uppercase tracking-wider text-xs">
                        {t.heading_management}
                      </h4>
                      <ul className="space-y-1.5 text-slate-400 list-disc pl-5 leading-relaxed">
                        {disease.management.map((m, idx) => (
                          <li key={idx}>{m}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Warning & Extension Callout */}
                  <div className="bg-red-950/30 border border-red-800/40 rounded-xl p-4 space-y-2 text-red-300">
                    <div className="font-bold flex items-center gap-1.5 text-red-400">
                      <AlertTriangle className="w-4 h-4 shrink-0" />
                      <span>{t.heading_warning}</span>
                    </div>
                    <p className="leading-relaxed">{disease.warning}</p>
                    <p className="font-semibold text-red-200 pt-2 border-t border-red-900/50">
                      {t.heading_expert}: {disease.expert}
                    </p>
                  </div>

                  {/* Scientific Citations & Review Metadata */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-800 gap-2">
                    <div>
                      <span className="font-semibold text-slate-400">{t.heading_sources}: </span>
                      <span>{disease.sources.join(" • ")}</span>
                    </div>
                    <div className="flex items-center space-x-1 shrink-0">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Reviewed: {disease.last_reviewed}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
