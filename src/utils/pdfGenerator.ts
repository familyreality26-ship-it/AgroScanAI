import { jsPDF } from "jspdf";
import { ScanResult, DiseaseInfo } from "../types";

export function generatePdfReport(scan: ScanResult, diseaseInfo?: DiseaseInfo): void {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4"
  });

  const pageWidth = doc.internal.pageSize.getWidth();

  // Top decorative header banner
  doc.setFillColor(27, 67, 50); // Deep forest green
  doc.rect(0, 0, pageWidth, 28, "F");

  // Title
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text("AGROSCAN AI — FIELD SCREENING REPORT", 14, 13);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text("Smart Crop Health & Disease Decision Support System — Southern Africa", 14, 20);

  // Metadata Strip
  doc.setFillColor(241, 245, 249);
  doc.rect(14, 34, pageWidth - 28, 14, "F");
  doc.setTextColor(51, 65, 85);
  doc.setFontSize(8);
  doc.text(`Report ID: ${scan.id}`, 18, 42);
  doc.text(`Timestamp: ${new Date(scan.timestamp).toLocaleString()}`, 95, 42);
  doc.text(`Model: ${scan.modelVersion}`, 155, 42);

  // Diagnostic Overview Box
  const isHighConf = scan.isHighConfidence;
  doc.setDrawColor(isHighConf ? 45 : 220, isHighConf ? 106 : 38, isHighConf ? 79 : 38);
  doc.setLineWidth(0.8);
  doc.roundedRect(14, 52, pageWidth - 28, 42, 3, 3, "S");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(30, 41, 59);
  doc.text("DIAGNOSTIC SCREENING RESULT", 20, 60);

  doc.setFontSize(14);
  doc.setTextColor(isHighConf ? 20 : 185, isHighConf ? 83 : 28, isHighConf ? 45 : 28);
  doc.text(`${scan.crop} — ${scan.condition}`, 20, 70);

  doc.setFontSize(10);
  doc.setTextColor(71, 85, 105);
  doc.text(`Confidence Rating: ${scan.confidencePercent}% (Threshold: ${(scan.confidenceThreshold * 100).toFixed(0)}%)`, 20, 78);
  doc.text(`Classification Status: ${scan.resultStatus}`, 20, 85);

  let curY = 104;

  if (diseaseInfo) {
    // Observed Symptoms
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(27, 67, 50);
    doc.text("1. OBSERVED SYMPTOMS", 14, curY);
    curY += 6;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(51, 65, 85);
    diseaseInfo.symptoms.slice(0, 3).forEach((s) => {
      const split = doc.splitTextToSize(`• ${s}`, pageWidth - 32);
      doc.text(split, 18, curY);
      curY += split.length * 4.5;
    });

    curY += 4;

    // Immediate Field Actions
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(27, 67, 50);
    doc.text("2. IMMEDIATE FIELD ACTIONS", 14, curY);
    curY += 6;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(51, 65, 85);
    diseaseInfo.actions.slice(0, 3).forEach((a) => {
      const split = doc.splitTextToSize(`• ${a}`, pageWidth - 32);
      doc.text(split, 18, curY);
      curY += split.length * 4.5;
    });

    curY += 4;

    // Prevention & Cultural Practices
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(27, 67, 50);
    doc.text("3. PREVENTION & CULTURAL PRACTICES", 14, curY);
    curY += 6;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(51, 65, 85);
    diseaseInfo.prevention.slice(0, 3).forEach((p) => {
      const split = doc.splitTextToSize(`• ${p}`, pageWidth - 32);
      doc.text(split, 18, curY);
      curY += split.length * 4.5;
    });

    curY += 4;

    // Agritex Referral & Urgent Warning Box
    doc.setFillColor(254, 242, 242);
    doc.setDrawColor(248, 113, 113);
    doc.roundedRect(14, curY, pageWidth - 28, 24, 2, 2, "FD");
    
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.setTextColor(153, 27, 27);
    doc.text("EXTENSION ADVISORY & WARNING:", 18, curY + 6);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    const splitWarn = doc.splitTextToSize(`${diseaseInfo.warning} ${diseaseInfo.expert}`, pageWidth - 36);
    doc.text(splitWarn, 18, curY + 12);

    curY += 30;
  }

  // Mandatory Ethical & Legal Disclaimer at bottom
  doc.setDrawColor(203, 213, 225);
  doc.line(14, 268, pageWidth - 14, 268);

  doc.setFont("helvetica", "italic");
  doc.setFontSize(7.5);
  doc.setTextColor(100, 116, 139);
  doc.text(
    "DISCLAIMER: AI-assisted screening — not a laboratory diagnosis. This report serves as an educational and agricultural decision support tool.",
    14,
    274
  );
  doc.text(
    "Always consult a certified Agritex extension officer or local agricultural research station before purchasing or applying chemicals.",
    14,
    279
  );
  doc.text(
    `AgroScan AI Project • Developed for National Student Science & Innovation Competition 2026 • Page 1 of 1`,
    14,
    284
  );

  doc.save(`AgroScan_Report_${scan.crop}_${Date.now().toString().slice(-6)}.pdf`);
}
