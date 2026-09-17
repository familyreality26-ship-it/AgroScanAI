import React from "react";
import { LanguageCode } from "../types";
import { translations } from "../data/translations";
import { evaluationData } from "../data/evaluationData";
import {
  BarChart3,
  CheckCircle2,
  Clock,
  HardDrive,
  Cpu,
  Layers,
  AlertCircle,
  FileCheck
} from "lucide-react";

interface PerformanceViewProps {
  language: LanguageCode;
}

export const PerformanceView: React.FC<PerformanceViewProps> = ({ language }) => {
  const t = translations[language];

  return (
    <div className="space-y-6 animate-fade-in max-w-5xl mx-auto">
      {/* Title */}
      <div className="border-b border-slate-800 pb-4">
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
          <BarChart3 className="w-6 h-6 text-emerald-400" />
          <span>{t.perf_title}</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-400">
          {t.perf_subtitle}
        </p>
      </div>

      {/* Core Benchmark Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-1">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            {t.metric_accuracy}
          </span>
          <div className="text-2xl font-extrabold text-emerald-400">
            {evaluationData.overall_accuracy}%
          </div>
          <span className="text-[11px] text-slate-500">
            Across 13 condition classes
          </span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-1">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            {t.metric_f1}
          </span>
          <div className="text-2xl font-extrabold text-blue-400">
            {evaluationData.macro_f1}%
          </div>
          <span className="text-[11px] text-slate-500">
            Equal weight per disease
          </span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-1">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            {t.metric_latency}
          </span>
          <div className="text-2xl font-extrabold text-purple-400">
            {evaluationData.avg_inference_latency_ms} ms
          </div>
          <span className="text-[11px] text-slate-500">
            Dual-Core CPU (No GPU)
          </span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-1">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            {t.metric_size}
          </span>
          <div className="text-2xl font-extrabold text-amber-400">
            {evaluationData.quantized_size_mb} MB
          </div>
          <span className="text-[11px] text-slate-500">
            INT8 Quantized Footprint
          </span>
        </div>
      </div>

      {/* Per-Class Evaluation Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center justify-between">
          <span>Per-Class Validation Breakdown</span>
          <span className="text-xs font-mono text-slate-400 font-normal">
            Total Test Samples: {evaluationData.test_samples}
          </span>
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 uppercase font-semibold border-b border-slate-800">
              <tr>
                <th className="px-3 py-2.5">Crop Condition</th>
                <th className="px-3 py-2.5">Precision</th>
                <th className="px-3 py-2.5">Recall</th>
                <th className="px-3 py-2.5">F1-Score</th>
                <th className="px-3 py-2.5">Test Images</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 font-mono">
              {Object.entries(evaluationData.per_class_metrics).map(([clsName, metrics]) => (
                <tr key={clsName} className="hover:bg-slate-800/40 transition-colors">
                  <td className="px-3 py-2 text-slate-200 font-sans font-medium">
                    {clsName.replace(/___/g, " — ").replace(/_/g, " ")}
                  </td>
                  <td className="px-3 py-2 text-emerald-400">{metrics.precision}%</td>
                  <td className="px-3 py-2 text-blue-400">{metrics.recall}%</td>
                  <td className="px-3 py-2 text-purple-400">{metrics.f1}%</td>
                  <td className="px-3 py-2 text-slate-400 font-sans">{metrics.support}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Field Validation Notes & Limitations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
          <h4 className="font-bold text-slate-200 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Field Validation Methodology</span>
          </h4>
          <ul className="space-y-2 text-slate-400 list-disc pl-4 leading-relaxed">
            {evaluationData.field_validation_notes.map((note, idx) => (
              <li key={idx}>{note}</li>
            ))}
          </ul>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
          <h4 className="font-bold text-slate-200 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-400" />
            <span>Known Technical Limitations</span>
          </h4>
          <ul className="space-y-2 text-slate-400 list-disc pl-4 leading-relaxed">
            <li>
              <strong>Optical Foliar Only:</strong> Cannot identify root rot, bacterial vascular wilt, or soil nematode damage before foliar chlorosis manifests.
            </li>
            <li>
              <strong>Single-Leaf Focus:</strong> Designed for close-up leaf inspection; not suitable for wide drone field overflights.
            </li>
            <li>
              <strong>Top Confusion Pair:</strong> {evaluationData.confusion_matrix_summary.top_confusion_pair}.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
