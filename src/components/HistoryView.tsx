import React, { useState } from "react";
import { HistoryRecord, LanguageCode } from "../types";
import { translations } from "../data/translations";
import {
  History,
  Search,
  Download,
  Trash2,
  Calendar,
  CheckCircle2,
  AlertTriangle,
  FileSpreadsheet
} from "lucide-react";

interface HistoryViewProps {
  history: HistoryRecord[];
  language: LanguageCode;
  onSelectRecord: (record: HistoryRecord) => void;
  onDeleteRecord: (id: string) => void;
  onClearHistory: () => void;
}

export const HistoryView: React.FC<HistoryViewProps> = ({
  history,
  language,
  onSelectRecord,
  onDeleteRecord,
  onClearHistory
}) => {
  const t = translations[language];
  const [searchTerm, setSearchTerm] = useState<string>("");

  const filteredHistory = history.filter(
    (item) =>
      item.crop.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.prediction.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleExportCsv = () => {
    if (history.length === 0) return;

    const headers = ["ID", "Timestamp", "Crop", "Diagnosis", "Confidence_Percent", "Status", "Language"];
    const rows = history.map((h) => [
      h.id,
      h.timestamp,
      `"${h.crop}"`,
      `"${h.prediction.replace(/"/g, '""')}"`,
      h.confidence,
      `"${h.resultStatus}"`,
      h.language
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `agroscan_history_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-5xl mx-auto">
      {/* Title & Actions Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <History className="w-6 h-6 text-emerald-400" />
            <span>{t.history_title}</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            {t.history_count} <span className="text-emerald-400 font-semibold">{history.length}</span>
          </p>
        </div>

        <div className="flex items-center space-x-2">
          {history.length > 0 && (
            <>
              <button
                id="export-history-csv-btn"
                onClick={handleExportCsv}
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors cursor-pointer"
              >
                <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
                <span>{t.btn_export_csv}</span>
              </button>

              <button
                id="clear-history-btn"
                onClick={onClearHistory}
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-red-950/60 hover:bg-red-900/80 text-red-300 border border-red-800/60 transition-colors cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>{t.btn_clear_history}</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Search Filter */}
      {history.length > 0 && (
        <div className="relative max-w-md">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder={t.filter_placeholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
          />
        </div>
      )}

      {/* History Items Grid/List */}
      {filteredHistory.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center space-y-3">
          <History className="w-12 h-12 mx-auto text-slate-700" />
          <p className="text-sm font-semibold text-slate-400">{t.history_empty}</p>
        </div>
      ) : (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl divide-y divide-slate-800 overflow-hidden">
          {filteredHistory.map((item) => (
            <div
              key={item.id}
              className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-800/40 transition-colors"
            >
              <div className="flex items-center space-x-4">
                {/* Thumbnail */}
                <div className="w-14 h-14 rounded-xl bg-slate-950 border border-slate-800 overflow-hidden shrink-0 flex items-center justify-center">
                  <img
                    src={item.imageSrc}
                    alt={item.crop}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Details */}
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                      {item.crop}
                    </span>
                    <span
                      className={`text-[11px] font-semibold px-2 py-0.5 rounded border ${
                        item.isHighConfidence
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                          : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                      }`}
                    >
                      {item.resultStatus}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white line-clamp-1">
                    {item.prediction}
                  </h4>
                  <div className="flex items-center space-x-3 text-[11px] text-slate-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(item.timestamp).toLocaleDateString()}
                    </span>
                    <span>Confidence: <strong className="text-slate-300">{item.confidence}%</strong></span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-2 self-end sm:self-center">
                <button
                  onClick={() => onSelectRecord(item)}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors cursor-pointer"
                >
                  {t.btn_open_history_item}
                </button>
                <button
                  onClick={() => onDeleteRecord(item.id)}
                  title="Delete Record"
                  className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
