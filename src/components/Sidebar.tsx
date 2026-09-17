import React from "react";
import { ViewType, LanguageCode } from "../types";
import { translations } from "../data/translations";
import {
  LayoutDashboard,
  ScanLine,
  Activity,
  BookOpen,
  History,
  BarChart3,
  FileText,
  Settings,
  Info,
  ShieldCheck
} from "lucide-react";

interface SidebarProps {
  currentView: ViewType;
  onNavigate: (view: ViewType) => void;
  language: LanguageCode;
  hasActiveResult: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onNavigate,
  language,
  hasActiveResult
}) => {
  const t = translations[language];

  const menuItems = [
    { id: "dashboard", label: t.nav_dashboard, icon: LayoutDashboard },
    { id: "scan", label: t.nav_scan, icon: ScanLine, highlight: true },
    { id: "result", label: t.nav_result, icon: Activity, disabled: !hasActiveResult },
    { id: "treatment", label: t.nav_treatment, icon: BookOpen },
    { id: "history", label: t.nav_history, icon: History },
    { id: "performance", label: t.nav_performance, icon: BarChart3 },
    { id: "docs", label: t.nav_docs, icon: FileText },
    { id: "settings", label: t.nav_settings, icon: Settings },
    { id: "about", label: t.nav_about, icon: Info }
  ];

  return (
    <aside
      id="agroscan-sidebar"
      className="w-full md:w-64 bg-slate-900 border-r border-slate-800 text-slate-300 flex flex-col shrink-0"
    >
      {/* Primary Navigation List */}
      <div className="p-4 flex-1 space-y-1">
        <div className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
          Navigation
        </div>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          const isDisabled = item.disabled;

          return (
            <button
              key={item.id}
              id={`nav-item-${item.id}`}
              disabled={isDisabled}
              onClick={() => onNavigate(item.id as ViewType)}
              className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isDisabled
                  ? "opacity-40 cursor-not-allowed text-slate-600"
                  : isActive
                  ? "bg-emerald-600 text-white font-semibold shadow-xs"
                  : item.highlight
                  ? "bg-emerald-950/40 text-emerald-300 border border-emerald-800/40 hover:bg-emerald-900/60"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-white" : item.highlight ? "text-emerald-400" : "text-slate-400"}`} />
              <span className="truncate">{item.label}</span>
              {item.highlight && !isActive && (
                <span className="ml-auto w-2 h-2 rounded-full bg-emerald-400"></span>
              )}
            </button>
          );
        })}
      </div>

      {/* Trust & Scientific Ethics Footer */}
      <div className="p-4 border-t border-slate-800 bg-slate-950/40 text-xs text-slate-400 space-y-2">
        <div className="flex items-center space-x-2 text-emerald-400 font-medium">
          <ShieldCheck className="w-4 h-4 shrink-0" />
          <span>Scientific Assurance</span>
        </div>
        <p className="text-[11px] leading-relaxed text-slate-400">
          MobileNetV3 Edge Inference calibrated with a strict 70% threshold. Grounded in Agritex & CIMMYT protocols.
        </p>
      </div>
    </aside>
  );
};
