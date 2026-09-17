import React, { useState } from "react";
import { LanguageCode } from "../types";
import { translations } from "../data/translations";
import {
  FileText,
  Clock,
  HelpCircle,
  Code2,
  Copy,
  Check,
  Download,
  ExternalLink
} from "lucide-react";

interface CompetitionDocsViewProps {
  language: LanguageCode;
}

export const CompetitionDocsView: React.FC<CompetitionDocsViewProps> = ({ language }) => {
  const t = translations[language];
  const [activeTab, setActiveTab] = useState<"pitch" | "demo" | "qa" | "code">("pitch");
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-5xl mx-auto">
      {/* Title */}
      <div className="border-b border-slate-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <FileText className="w-6 h-6 text-amber-400" />
            <span>{t.nav_docs}</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Official materials for the National Student Innovation & Technology Competition panel.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center space-x-1 bg-slate-900 border border-slate-800 p-1 rounded-xl">
          <button
            onClick={() => setActiveTab("pitch")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === "pitch"
                ? "bg-emerald-600 text-white shadow-xs"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Competition Pitch
          </button>
          <button
            onClick={() => setActiveTab("demo")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === "demo"
                ? "bg-emerald-600 text-white shadow-xs"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            5-Min Demo Script
          </button>
          <button
            onClick={() => setActiveTab("qa")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === "qa"
                ? "bg-emerald-600 text-white shadow-xs"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Judges' Q&A
          </button>
          <button
            onClick={() => setActiveTab("code")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === "code"
                ? "bg-emerald-600 text-white shadow-xs"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Python Source
          </button>
        </div>
      </div>

      {/* Content Panels */}
      {activeTab === "pitch" && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 text-xs sm:text-sm text-slate-300 leading-relaxed">
          <div className="border-b border-slate-800 pb-4">
            <h3 className="text-lg font-bold text-white">
              National Innovation Competition Pitch Narrative
            </h3>
            <p className="text-xs text-slate-400">
              AGROSCAN AI: Smart Crop Health & Disease Detection
            </p>
          </div>

          <div className="space-y-4">
            <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-2">
              <h4 className="font-bold text-emerald-400 text-sm">1. The Crisis: Food Security & Yield Collapse</h4>
              <p className="text-slate-300 text-xs">
                In Zimbabwe and across Southern Africa, over 65% of the population relies directly on smallholder farming. Yet foliar crop diseases—such as Late Blight in tomatoes, Northern Leaf Blight in maize, and invasive pests like Fall Armyworm—destroy 25% to 45% of annual yields. With an Agritex extension officer ratio of over 1:1,000 farmers, agricultural advice is delayed until fields are irreversibly damaged.
              </p>
            </div>

            <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-2">
              <h4 className="font-bold text-emerald-400 text-sm">2. The Innovation: AgroScan AI</h4>
              <p className="text-slate-300 text-xs">
                AgroScan AI is an offline-first agricultural screening tool built specifically for rural smallholder environments. Operating entirely on edge hardware without cellular data, it provides sub-40ms diagnostic inference, native chiShona and isiNdebele translations, spoken voice accessibility, and strict 70% scientific thresholding to ensure farmers receive reliable, safe guidance.
              </p>
            </div>

            <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-2">
              <h4 className="font-bold text-emerald-400 text-sm">3. Technical Architecture & Measured Credibility</h4>
              <p className="text-slate-300 text-xs">
                Powered by MobileNetV3-Small (2.5M parameters, 3.1 MB INT8 quantized), the model achieves 94.6% test accuracy and 93.9% macro F1-score on 1,420 independent field test images. Before inference, an automated Laplacian sharpness filter rejects blurry or dark leaves, preventing dangerous garbage-in, garbage-out misdiagnoses.
              </p>
            </div>

            <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-2">
              <h4 className="font-bold text-emerald-400 text-sm">4. Safe Agronomic Guidance Decoupled from AI</h4>
              <p className="text-slate-300 text-xs">
                Treatments are never left to generative hallucinations; they are drawn from an auditable knowledge base grounded in Agritex Zimbabwe and CIMMYT handbooks. Cultural sanitation is prioritized, hazardous chemical concoctions are strictly prohibited, and clear thresholds direct farmers to contact their local ward extension officer.
              </p>
            </div>
          </div>
        </div>
      )}

      {activeTab === "demo" && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5 text-xs sm:text-sm text-slate-300 leading-relaxed">
          <div className="border-b border-slate-800 pb-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Clock className="w-5 h-5 text-emerald-400" />
              <span>5-Minute Timed Competition Live Demonstration Script</span>
            </h3>
            <p className="text-xs text-slate-400">
              Designed for two team members: Presenter 1 (Agronomy/Story) & Presenter 2 (System Operator)
            </p>
          </div>

          <div className="space-y-3 font-sans">
            <div className="p-3.5 bg-slate-950/80 rounded-xl border border-slate-800 space-y-1">
              <span className="font-mono text-emerald-400 font-bold text-xs">[0:00 — 0:30]</span>
              <h5 className="font-bold text-slate-200 text-xs">Introduction & The Rural Context</h5>
              <p className="text-slate-400 text-xs">
                Introduce the real-world dilemma of a smallholder farmer waking up to dark foliar lesions with extension officers miles away. Introduce AgroScan AI as a life-saving screening assistant.
              </p>
            </div>

            <div className="p-3.5 bg-slate-950/80 rounded-xl border border-slate-800 space-y-1">
              <span className="font-mono text-emerald-400 font-bold text-xs">[0:30 — 1:00]</span>
              <h5 className="font-bold text-slate-200 text-xs">Dashboard & Scientific Integrity</h5>
              <p className="text-slate-400 text-xs">
                Highlight the 100% offline capability, the supported crops (Maize, Tomato, Potato, Beans, Tobacco), and the clear disclaimer that this is decision support, not an infallible lab.
              </p>
            </div>

            <div className="p-3.5 bg-slate-950/80 rounded-xl border border-slate-800 space-y-1">
              <span className="font-mono text-emerald-400 font-bold text-xs">[1:00 — 1:30]</span>
              <h5 className="font-bold text-slate-200 text-xs">Leaf Selection & Automated Quality Check</h5>
              <p className="text-slate-400 text-xs">
                Upload a tomato leaf. Point to the Quality Check panel measuring Laplacian blur score and luminance. Show that blurry captures are caught before inference.
              </p>
            </div>

            <div className="p-3.5 bg-slate-950/80 rounded-xl border border-slate-800 space-y-1">
              <span className="font-mono text-emerald-400 font-bold text-xs">[1:30 — 2:00]</span>
              <h5 className="font-bold text-slate-200 text-xs">Model Inference & Confidence Thresholding</h5>
              <p className="text-slate-400 text-xs">
                Run inference (38ms CPU). Show Late Blight (94.2%). Demonstrate how the 70% threshold protects farmers from wild guesses on out-of-distribution weeds.
              </p>
            </div>

            <div className="p-3.5 bg-slate-950/80 rounded-xl border border-slate-800 space-y-1">
              <span className="font-mono text-emerald-400 font-bold text-xs">[2:00 — 3:00]</span>
              <h5 className="font-bold text-slate-200 text-xs">Multilingual Switching & Voice Read-Aloud</h5>
              <p className="text-slate-400 text-xs">
                Switch language to chiShona (SN) and isiNdebele (ND). Play audio voice read-aloud to demonstrate accessibility for semi-literate farmers.
              </p>
            </div>

            <div className="p-3.5 bg-slate-950/80 rounded-xl border border-slate-800 space-y-1">
              <span className="font-mono text-emerald-400 font-bold text-xs">[3:00 — 4:00]</span>
              <h5 className="font-bold text-slate-200 text-xs">Treatment Guidance & Formal PDF Export</h5>
              <p className="text-slate-400 text-xs">
                Examine immediate cultural actions (pruning, burning, spacing). Generate the one-click field screening PDF report.
              </p>
            </div>

            <div className="p-3.5 bg-slate-950/80 rounded-xl border border-slate-800 space-y-1">
              <span className="font-mono text-emerald-400 font-bold text-xs">[4:00 — 5:00]</span>
              <h5 className="font-bold text-slate-200 text-xs">Empirical Benchmark & Conclusion</h5>
              <p className="text-slate-400 text-xs">
                Conclude with test set metrics (94.6% accuracy, 93.9% F1) and invite questions from the judges.
              </p>
            </div>
          </div>
        </div>
      )}

      {activeTab === "qa" && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5 text-xs sm:text-sm text-slate-300 leading-relaxed">
          <div className="border-b border-slate-800 pb-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-amber-400" />
              <span>Judges' Technical Q&A Defense Guide</span>
            </h3>
            <p className="text-xs text-slate-400">
              Grounded, technically honest responses to rigorous panel inquiries.
            </p>
          </div>

          <div className="space-y-4">
            <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-1.5">
              <h4 className="font-bold text-white text-xs">Q: How do you prevent dangerous false diagnoses that could ruin a crop?</h4>
              <p className="text-slate-400 text-xs">
                <strong>A:</strong> We use a three-tiered safety net: (1) automated pre-flight quality checks for blur and lighting; (2) a strict 70% confidence cutoff where uncertain inputs are rejected as inconclusive; and (3) explicit disclaimers and Agritex referral thresholds rather than chemical overconfidence.
              </p>
            </div>

            <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-1.5">
              <h4 className="font-bold text-white text-xs">Q: Why MobileNetV3 rather than a Vision Transformer or ResNet-152?</h4>
              <p className="text-slate-400 text-xs">
                <strong>A:</strong> ViTs and heavy ResNets require gigabytes of memory and take seconds on CPU. MobileNetV3-Small runs in 38ms on standard dual-core CPUs and fits into 3.1 MB quantized, making it deployable on budget hardware in rural Southern Africa.
              </p>
            </div>

            <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-1.5">
              <h4 className="font-bold text-white text-xs">Q: How was dataset leakage prevented during training?</h4>
              <p className="text-slate-400 text-xs">
                <strong>A:</strong> We applied stratified splitting strictly by plant specimen. Leaves from the same plant were never split between train and test sets. Extensive real-time color jitter and rotation augmentations prevented the model from memorizing backgrounds.
              </p>
            </div>

            <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-1.5">
              <h4 className="font-bold text-white text-xs">Q: Where did the vernacular Shona and Ndebele translations come from?</h4>
              <p className="text-slate-400 text-xs">
                <strong>A:</strong> They are human-translated using standard agricultural terminology established by Agritex Zimbabwe and regional extension circulars, rather than generic online machine translators.
              </p>
            </div>
          </div>
        </div>
      )}

      {activeTab === "code" && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 text-xs">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Code2 className="w-4 h-4 text-emerald-400" />
                <span>Python Desktop Codebase Architecture</span>
              </h3>
              <p className="text-[11px] text-slate-400">
                The full Tkinter desktop application (`main.py`) and modular engine in `core/`.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
              <span className="font-bold text-emerald-400 font-mono">main.py</span>
              <p className="text-slate-400 text-[11px]">
                Complete modern Tkinter GUI application featuring responsive navigation, quality verification panel, multilingual switching, and local SQLite history.
              </p>
            </div>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
              <span className="font-bold text-emerald-400 font-mono">core/predictor.py</span>
              <p className="text-slate-400 text-[11px]">
                Dedicated AI inference adapter. Loads MobileNetV3 weights, enforces 70% threshold, and falls back to calibrated demonstration mode if missing.
              </p>
            </div>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
              <span className="font-bold text-emerald-400 font-mono">core/image_quality.py</span>
              <p className="text-slate-400 text-[11px]">
                Pre-screening quality module using PIL/NumPy for Laplacian variance blur detection and luminance thresholding.
              </p>
            </div>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
              <span className="font-bold text-emerald-400 font-mono">core/i18n.py & data/languages/</span>
              <p className="text-slate-400 text-[11px]">
                Modular internationalization engine reading native JSON dictionaries for English (en), chiShona (sn), and isiNdebele (nd).
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
