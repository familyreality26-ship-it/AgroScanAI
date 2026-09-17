/**
 * AgroScan AI — Type Definitions
 */

export interface CandidateProbability {
  condition: string;
  crop: string;
  confidence: number;
}

export interface PreprocessingMeta {
  targetResolution: string;
  channels: number;
  normalization: string;
}

export interface QualityMetrics {
  width: number;
  height: number;
  aspectRatio: number;
  meanLuminosity: number;
  blurScore: number;
}

export interface QualityCheckResult {
  isValid: boolean;
  issues: string[];
  recommendations: string[];
  metrics: QualityMetrics;
}

export interface DiseaseInfo {
  crop: string;
  scientific_name: string;
  severity: "Healthy" | "Moderate" | "Moderate to High" | "High" | "Critical";
  symptoms: string[];
  actions: string[];
  prevention: string[];
  management: string[];
  warning: string;
  expert: string;
  sources: string[];
  last_reviewed: string;
}

export type DiseaseDatabase = Record<string, DiseaseInfo>;

export interface ScanResult {
  id: string;
  timestamp: string;
  imageSrc: string;
  crop: string;
  condition: string;
  treatmentKey: string | null;
  confidenceDecimal: number;
  confidencePercent: number;
  confidenceThreshold: number;
  isHighConfidence: boolean;
  resultStatus: string;
  isDemoMode: boolean;
  modeLabel: string;
  inferenceTimeMs: number;
  modelVersion: string;
  disclaimer: string;
  candidates: CandidateProbability[];
  qualityMetrics?: QualityMetrics;
  preprocessing?: PreprocessingMeta;
}

export interface HistoryRecord {
  id: string;
  timestamp: string;
  imageSrc: string;
  crop: string;
  prediction: string;
  confidence: number;
  resultStatus: string;
  treatmentKey?: string;
  isHighConfidence: boolean;
  language: string;
}

export type LanguageCode = "en" | "sn" | "nd";

export type ViewType =
  | "dashboard"
  | "scan"
  | "result"
  | "treatment"
  | "history"
  | "performance"
  | "docs"
  | "settings"
  | "about";

export interface EvaluationReport {
  status: string;
  evaluation_date: string;
  dataset_source: string;
  model_architecture: string;
  quantization: string;
  input_resolution: string;
  test_samples: number;
  overall_accuracy: number;
  macro_precision: number;
  macro_recall: number;
  macro_f1: number;
  avg_inference_latency_ms: number;
  hardware_benchmarked: string;
  model_size_mb: number;
  quantized_size_mb: number;
  classes: string[];
  per_class_metrics: Record<string, { precision: number; recall: number; f1: number; support: number }>;
  confusion_matrix_summary: {
    true_positives: number;
    false_positives: number;
    top_confusion_pair: string;
  };
  field_validation_notes: string[];
}
