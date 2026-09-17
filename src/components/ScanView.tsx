import React, { useState, useRef, useEffect } from "react";
import { LanguageCode, QualityCheckResult, ScanResult } from "../types";
import { translations } from "../data/translations";
import { sampleLeaves, SampleLeaf } from "../data/sampleLeaves";
import { analyzeImageQuality } from "../utils/imageQuality";
import { runInference } from "../utils/predictorEngine";
import {
  UploadCloud,
  Camera,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Sparkles,
  ArrowRight,
  RefreshCw,
  Eye,
  Sliders
} from "lucide-react";

interface ScanViewProps {
  language: LanguageCode;
  confidenceThreshold: number;
  isDemoMode: boolean;
  onScanComplete: (result: ScanResult) => void;
}

export const ScanView: React.FC<ScanViewProps> = ({
  language,
  confidenceThreshold,
  isDemoMode,
  onScanComplete
}) => {
  const t = translations[language];

  const [selectedCrop, setSelectedCrop] = useState<string>("Tomato");
  const [currentImage, setCurrentImage] = useState<string>(sampleLeaves[0].dataUrl);
  const [selectedSampleId, setSelectedSampleId] = useState<string>(sampleLeaves[0].id);
  const [isAnalyzingQuality, setIsAnalyzingQuality] = useState<boolean>(false);
  const [qualityResult, setQualityResult] = useState<QualityCheckResult | null>(null);
  const [isInferring, setIsInferring] = useState<boolean>(false);
  const [showPreprocessModal, setShowPreprocessModal] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Analyze quality whenever currentImage changes
  useEffect(() => {
    let isCancelled = false;
    if (!currentImage) return;

    setIsAnalyzingQuality(true);
    analyzeImageQuality(currentImage).then((res) => {
      if (!isCancelled) {
        setQualityResult(res);
        setIsAnalyzingQuality(false);
      }
    });

    return () => {
      isCancelled = true;
    };
  }, [currentImage]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        setCurrentImage(dataUrl);
        setSelectedSampleId("");
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSelectSample = (sample: SampleLeaf) => {
    setSelectedSampleId(sample.id);
    setSelectedCrop(sample.crop);
    setCurrentImage(sample.dataUrl);
  };

  const handleStartAnalysis = async () => {
    if (!currentImage) return;
    setIsInferring(true);

    try {
      const result = await runInference({
        imageSrc: currentImage,
        selectedCrop,
        threshold: confidenceThreshold,
        qualityMetrics: qualityResult?.metrics,
        isDemoMode
      });

      onScanComplete(result);
    } finally {
      setIsInferring(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-5xl mx-auto">
      {/* Title & Step Tracker */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            {t.step_select} & {t.step_quality}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Select or capture a leaf, verify sharpness and exposure, and perform deep learning screening.
          </p>
        </div>

        {/* Crop Filter Dropdown */}
        <div className="flex items-center space-x-2">
          <label htmlFor="crop-select" className="text-xs font-semibold text-slate-300">
            {t.select_crop_prompt}:
          </label>
          <select
            id="crop-select"
            value={selectedCrop}
            onChange={(e) => setSelectedCrop(e.target.value)}
            className="bg-slate-800 border border-slate-700 text-white text-xs font-semibold rounded-lg px-3 py-1.5 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
          >
            <option value="Tomato">{t.crop_tomato}</option>
            <option value="Maize">{t.crop_maize}</option>
            <option value="Potato">{t.crop_potato}</option>
            <option value="Beans">{t.crop_beans}</option>
            <option value="Tobacco">{t.crop_tobacco}</option>
            <option value="all">{t.crop_all}</option>
          </select>
        </div>
      </div>

      {/* Main Two-Column Workflow Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Image Canvas & Selection (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-4">
            {/* Image Preview Box */}
            <div className="relative w-full aspect-square max-h-96 rounded-xl overflow-hidden bg-slate-950 border border-slate-800 flex items-center justify-center">
              {currentImage ? (
                <img
                  id="current-leaf-preview"
                  src={currentImage}
                  alt="Crop Leaf Scan Preview"
                  className="w-full h-full object-contain p-2"
                />
              ) : (
                <div className="text-center p-6 text-slate-500">
                  <UploadCloud className="w-12 h-12 mx-auto mb-2 text-slate-600" />
                  <p className="text-xs">{t.btn_upload_image}</p>
                </div>
              )}

              {/* Quality Overlay Badge */}
              <div className="absolute top-3 left-3">
                {isAnalyzingQuality ? (
                  <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-slate-900/90 text-slate-300 text-xs font-medium border border-slate-700 backdrop-blur-sm">
                    <RefreshCw className="w-3 h-3 animate-spin text-emerald-400" />
                    <span>Checking quality...</span>
                  </span>
                ) : qualityResult?.isValid ? (
                  <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-emerald-950/90 text-emerald-300 text-xs font-medium border border-emerald-700/60 backdrop-blur-sm">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Quality Passed</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-red-950/90 text-red-300 text-xs font-medium border border-red-700/60 backdrop-blur-sm">
                    <AlertCircle className="w-3.5 h-3.5 text-red-400" />
                    <span>Quality Issues Detected</span>
                  </span>
                )}
              </div>

              {/* Preprocessing Inspector Button */}
              <button
                onClick={() => setShowPreprocessModal(!showPreprocessModal)}
                className="absolute bottom-3 right-3 inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-slate-900/90 text-slate-300 hover:text-white text-xs font-medium border border-slate-700/80 backdrop-blur-sm cursor-pointer"
              >
                <Eye className="w-3 h-3 text-emerald-400" />
                <span>Tensor Preprocess</span>
              </button>
            </div>

            {/* Input Action Controls */}
            <div className="flex flex-wrap gap-2">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
                id="leaf-file-input"
              />
              <button
                id="upload-file-btn"
                onClick={() => fileInputRef.current?.click()}
                className="flex-1 min-w-[140px] inline-flex items-center justify-center space-x-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-3 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
              >
                <UploadCloud className="w-4 h-4 text-emerald-400" />
                <span>{t.btn_upload_image}</span>
              </button>

              <button
                id="camera-photo-btn"
                onClick={() => fileInputRef.current?.click()}
                className="flex-1 min-w-[140px] inline-flex items-center justify-center space-x-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-3 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
              >
                <Camera className="w-4 h-4 text-blue-400" />
                <span>{t.btn_take_photo}</span>
              </button>
            </div>

            {/* Pre-calibrated Competition Sample Leaves */}
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  {t.btn_sample_images}:
                </span>
                <span className="text-[11px] text-slate-500">
                  Instant competition test cases
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {sampleLeaves.map((sample) => (
                  <button
                    key={sample.id}
                    id={`sample-leaf-btn-${sample.id}`}
                    onClick={() => handleSelectSample(sample)}
                    className={`p-2 rounded-xl text-left border transition-all flex flex-col justify-between ${
                      selectedSampleId === sample.id
                        ? "bg-emerald-950/60 border-emerald-500/80 text-white ring-1 ring-emerald-500"
                        : "bg-slate-800/60 border-slate-700/60 text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-slate-900 text-slate-300">
                        {sample.crop}
                      </span>
                      {sample.isBlurryOrPoorQuality && (
                        <span className="text-[9px] font-semibold text-amber-400 bg-amber-950/60 px-1 rounded">
                          Blur Test
                        </span>
                      )}
                    </div>
                    <span className="text-xs font-semibold line-clamp-1 text-slate-200">
                      {sample.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Automated Quality Pre-Screening & Action (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Quality Screening Analysis Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center justify-between">
              <span>{t.step_quality}</span>
              {qualityResult?.isValid ? (
                <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Valid
                </span>
              ) : (
                <span className="text-xs font-semibold text-red-400 flex items-center gap-1">
                  <XCircle className="w-3.5 h-3.5" /> Issues Found
                </span>
              )}
            </h3>

            {/* Quality Metrics Telemetry */}
            {qualityResult?.metrics && (
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-slate-950/60 border border-slate-800 rounded-lg p-2.5">
                  <span className="text-slate-500 block text-[10px] uppercase">Sharpness (Laplacian)</span>
                  <span className="text-sm font-bold text-slate-200">
                    {qualityResult.metrics.blurScore}
                  </span>
                  <span className="text-[10px] text-slate-500 block">
                    {qualityResult.metrics.blurScore >= 45 ? "Sufficient focus" : "Too blurry"}
                  </span>
                </div>

                <div className="bg-slate-950/60 border border-slate-800 rounded-lg p-2.5">
                  <span className="text-slate-500 block text-[10px] uppercase">Mean Luminosity</span>
                  <span className="text-sm font-bold text-slate-200">
                    {qualityResult.metrics.meanLuminosity} / 255
                  </span>
                  <span className="text-[10px] text-slate-500 block">
                    {qualityResult.metrics.meanLuminosity >= 38 && qualityResult.metrics.meanLuminosity <= 228
                      ? "Balanced exposure"
                      : "Exposure issue"}
                  </span>
                </div>
              </div>
            )}

            {/* Issue Explanation or Success Guidance */}
            {qualityResult?.isValid ? (
              <div className="bg-emerald-950/40 border border-emerald-800/40 rounded-xl p-3.5 space-y-1.5 text-xs text-emerald-200">
                <div className="font-bold flex items-center gap-1.5 text-emerald-300">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                  <span>{t.quality_pass_title}</span>
                </div>
                <p className="text-[11px] text-emerald-300/80 leading-relaxed">
                  {t.quality_pass_desc}
                </p>
              </div>
            ) : (
              <div className="bg-red-950/40 border border-red-800/40 rounded-xl p-3.5 space-y-2 text-xs text-red-200">
                <div className="font-bold flex items-center gap-1.5 text-red-300">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                  <span>{t.quality_fail_title}</span>
                </div>
                <ul className="space-y-1 text-[11px] text-red-300/90 list-disc pl-4">
                  {qualityResult?.issues.map((issue, idx) => (
                    <li key={idx}>{issue}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Farmer Quality Best Practices */}
            <div className="space-y-2 text-xs text-slate-400 bg-slate-950/40 border border-slate-800/80 rounded-xl p-3">
              <span className="font-semibold text-slate-300 block text-[11px]">
                Recommended Field Instructions:
              </span>
              <ul className="space-y-1 text-[11px] list-disc pl-4 text-slate-400">
                <li>{t.quality_guide_1}</li>
                <li>{t.quality_guide_2}</li>
                <li>{t.quality_guide_3}</li>
              </ul>
            </div>

            {/* Action Trigger Button */}
            <button
              id="start-leaf-analysis-btn"
              disabled={isInferring}
              onClick={handleStartAnalysis}
              className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white py-3 rounded-xl font-bold text-sm flex items-center justify-center space-x-2 transition-all shadow-md shadow-emerald-950/40 cursor-pointer"
            >
              {isInferring ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Processing MobileNetV3 Tensor...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>{t.btn_analyze}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

          {/* Model Operational Status Note */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 text-xs text-slate-400 space-y-1">
            <div className="flex items-center justify-between text-slate-300">
              <span className="font-semibold">Inference Model:</span>
              <span className="text-[11px] font-mono text-emerald-400">MobileNetV3-Small</span>
            </div>
            <div className="flex items-center justify-between text-slate-300">
              <span className="font-semibold">Confidence Cutoff:</span>
              <span className="text-[11px] font-mono text-amber-400">{(confidenceThreshold * 100).toFixed(0)}% Threshold</span>
            </div>
            <p className="text-[10px] text-slate-500 pt-1">
              {isDemoMode ? t.model_demo_mode : t.model_ready_mode}
            </p>
          </div>
        </div>
      </div>

      {/* Preprocessing Inspector Modal */}
      {showPreprocessModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-md w-full p-5 space-y-4 text-white">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold flex items-center gap-2">
                <Sliders className="w-4 h-4 text-emerald-400" />
                <span>Tensor Preprocessing Pipeline</span>
              </h3>
              <button
                onClick={() => setShowPreprocessModal(false)}
                className="text-slate-400 hover:text-white text-xs px-2 py-1 rounded bg-slate-800"
              >
                Close
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-300">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <span className="font-bold text-slate-200">1. Spatial Normalization</span>
                <p className="text-slate-400 text-[11px]">
                  Input image is resized using bicubic downsampling to standard 224x224 RGB dimensions.
                </p>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <span className="font-bold text-slate-200">2. Pixel Tensor Scaling</span>
                <p className="text-slate-400 text-[11px]">
                  Raw integer values [0, 255] are mapped to floating-point representation normalized to [-1.0, 1.0] (dividing by 127.5 and subtracting 1.0).
                </p>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <span className="font-bold text-slate-200">3. Attention Head Calibration</span>
                <p className="text-slate-400 text-[11px]">
                  Inverted bottleneck blocks with squeeze-and-excitation recalibrate feature weights prior to global average pooling.
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowPreprocessModal(false)}
              className="w-full py-2 bg-slate-800 hover:bg-slate-700 rounded-xl text-xs font-semibold text-slate-200"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
