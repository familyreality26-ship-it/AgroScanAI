"""
AgroScan AI — Professional PDF Report Generator
Produces formal agricultural diagnostic reports for farmers, agricultural students,
extension officers (Agritex), and competition documentation.
"""

import os
from datetime import datetime
from pathlib import Path
from typing import Dict, Any, Optional

from core.settings import REPORTS_DIR, APP_NAME, APP_SUBTITLE, APP_VERSION, LEGAL_DISCLAIMER

try:
    from reportlab.lib.pagesizes import letter
    from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Image as RLImage, Table, TableStyle, HRFlowable
    from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
    from reportlab.lib import colors
    REPORTLAB_AVAILABLE = True
except ImportError:
    REPORTLAB_AVAILABLE = False


def generate_pdf_report(
    scan_data: Dict[str, Any],
    treatment_data: Optional[Dict[str, Any]] = None,
    output_filename: Optional[str] = None
) -> str:
    """
    Generates a high-quality PDF report for a completed crop leaf screening.
    """
    timestamp_str = datetime.now().strftime("%Y%m%d_%H%M%S")
    crop = scan_data.get("crop", "Crop").replace(" ", "_")
    if not output_filename:
        output_filename = f"AgroScan_Report_{crop}_{timestamp_str}.pdf"
        
    pdf_path = REPORTS_DIR / output_filename
    REPORTS_DIR.mkdir(parents=True, exist_ok=True)

    if not REPORTLAB_AVAILABLE:
        # Fallback to structured plain text/markdown report if reportlab is not installed
        txt_path = pdf_path.with_suffix(".txt")
        with open(txt_path, "w", encoding="utf-8") as f:
            f.write(f"===================================================================\n")
            f.write(f"           {APP_NAME} — {APP_SUBTITLE}\n")
            f.write(f"              Agricultural Diagnostic Report ({APP_VERSION})\n")
            f.write(f"===================================================================\n\n")
            f.write(f"Date/Time:      {scan_data.get('timestamp', datetime.now().strftime('%Y-%m-%d %H:%M:%S'))}\n")
            f.write(f"Target Crop:    {scan_data.get('crop', 'N/A')}\n")
            f.write(f"Diagnosis:      {scan_data.get('condition', 'N/A')}\n")
            f.write(f"Confidence:     {scan_data.get('confidence_percent', 0.0)}%\n")
            f.write(f"Screening Mode: {scan_data.get('mode_label', 'Standard')}\n")
            f.write(f"Status:         {scan_data.get('result_status', 'N/A')}\n\n")
            
            if treatment_data:
                f.write("--- SYMPTOMS ---\n")
                for s in treatment_data.get("symptoms", []):
                    f.write(f"* {s}\n")
                f.write("\n--- IMMEDIATE FIELD ACTIONS ---\n")
                for a in treatment_data.get("actions", []):
                    f.write(f"* {a}\n")
                f.write("\n--- PREVENTION & CULTURAL PRACTICES ---\n")
                for p in treatment_data.get("prevention", []):
                    f.write(f"* {p}\n")
                f.write(f"\n--- WARNING ---\n{treatment_data.get('warning', 'None')}\n")
                f.write(f"\n--- EXPERT REFERRAL ---\n{treatment_data.get('expert', 'Contact Agritex')}\n")
                
            f.write(f"\nLEGAL DISCLAIMER:\n{LEGAL_DISCLAIMER}\n")
            f.write("===================================================================\n")
        return str(txt_path)

    # Use ReportLab for formal PDF layout
    doc = SimpleDocTemplate(
        str(pdf_path),
        pagesize=letter,
        rightMargin=36,
        leftMargin=36,
        topMargin=36,
        bottomMargin=36
    )

    styles = getSampleStyleSheet()
    primary_color = colors.HexColor("#1e3a8a")  # Deep Navy
    accent_color = colors.HexColor("#15803d")   # Forest Green
    dark_neutral = colors.HexColor("#1f2937")

    title_style = ParagraphStyle(
        "ReportTitle",
        parent=styles["Normal"],
        fontName="Helvetica-Bold",
        fontSize=20,
        leading=24,
        textColor=primary_color
    )
    subtitle_style = ParagraphStyle(
        "ReportSubtitle",
        parent=styles["Normal"],
        fontName="Helvetica",
        fontSize=11,
        leading=14,
        textColor=accent_color
    )
    h2_style = ParagraphStyle(
        "ReportH2",
        parent=styles["Heading2"],
        fontName="Helvetica-Bold",
        fontSize=12,
        leading=16,
        textColor=primary_color,
        spaceBefore=8,
        spaceAfter=4
    )
    body_style = ParagraphStyle(
        "ReportBody",
        parent=styles["Normal"],
        fontName="Helvetica",
        fontSize=9,
        leading=13,
        textColor=dark_neutral
    )
    warning_style = ParagraphStyle(
        "ReportWarning",
        parent=styles["Normal"],
        fontName="Helvetica-Bold",
        fontSize=9,
        leading=13,
        textColor=colors.HexColor("#b91c1c")
    )

    elements = []

    # Header Title
    elements.append(Paragraph(f"<b>{APP_NAME}</b> — Diagnostic Field Report", title_style))
    elements.append(Paragraph(f"{APP_SUBTITLE} | Southern Africa Agricultural Technology Initiative", subtitle_style))
    elements.append(Spacer(1, 10))
    elements.append(HRFlowable(width="100%", thickness=1.5, color=primary_color, spaceBefore=2, spaceAfter=10))

    # Meta Table
    cond = scan_data.get("condition", "N/A")
    conf = scan_data.get("confidence_percent", 0.0)
    meta_data = [
        [Paragraph("<b>Date & Time:</b>", body_style), Paragraph(scan_data.get("timestamp", datetime.now().strftime("%Y-%m-%d %H:%M")), body_style)],
        [Paragraph("<b>Target Crop:</b>", body_style), Paragraph(str(scan_data.get("crop", "Tomato")), body_style)],
        [Paragraph("<b>Predicted Condition:</b>", body_style), Paragraph(f"<b>{cond}</b>", body_style)],
        [Paragraph("<b>Confidence Score:</b>", body_style), Paragraph(f"<b>{conf}%</b> ({scan_data.get('result_status', 'Screening')})", body_style)],
        [Paragraph("<b>Model Architecture:</b>", body_style), Paragraph(str(scan_data.get("model_version", "MobileNetV3-Small")), body_style)],
        [Paragraph("<b>Operating Mode:</b>", body_style), Paragraph(str(scan_data.get("mode_label", "Standard")), body_style)],
    ]
    t = Table(meta_data, colWidths=[130, 410])
    t.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), colors.HexColor("#f8fafc")),
        ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor("#cbd5e1")),
        ('TOPPADDING', (0, 0), (-1, -1), 4),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 4),
    ]))
    elements.append(t)
    elements.append(Spacer(1, 12))

    # Leaf Image thumbnail if available
    img_path = scan_data.get("image_path")
    if img_path and os.path.exists(img_path):
        try:
            elements.append(Paragraph("<b>Submitted Leaf Photograph</b>", h2_style))
            elements.append(RLImage(img_path, width=160, height=160))
            elements.append(Spacer(1, 10))
        except Exception:
            pass

    # Symptoms and Treatments
    if treatment_data:
        elements.append(Paragraph("<b>Diagnostic Symptoms Identified</b>", h2_style))
        for sym in treatment_data.get("symptoms", []):
            elements.append(Paragraph(f"• {sym}", body_style))
        elements.append(Spacer(1, 8))

        elements.append(Paragraph("<b>Immediate Field Actions (Cautious Protocol)</b>", h2_style))
        for act in treatment_data.get("actions", []):
            elements.append(Paragraph(f"• {act}", body_style))
        elements.append(Spacer(1, 8))

        elements.append(Paragraph("<b>Prevention & Cultural Sanitation Practices</b>", h2_style))
        for prev in treatment_data.get("prevention", []):
            elements.append(Paragraph(f"• {prev}", body_style))
        elements.append(Spacer(1, 8))

        elements.append(Paragraph("<b>Urgent Warning & Spread Prevention</b>", h2_style))
        elements.append(Paragraph(treatment_data.get("warning", "No critical warning specified."), warning_style))
        elements.append(Spacer(1, 8))

        elements.append(Paragraph("<b>Agricultural Extension Referral (Agritex)</b>", h2_style))
        elements.append(Paragraph(treatment_data.get("expert", "Consult your local ward Agritex extension officer."), body_style))
        elements.append(Spacer(1, 12))

    # Disclaimer Footer
    elements.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor("#94a3b8"), spaceBefore=5, spaceAfter=8))
    disclaimer_p = Paragraph(
        f"<b>IMPORTANT LEGAL & SCIENTIFIC DISCLAIMER:</b> {LEGAL_DISCLAIMER} "
        "AgroScan AI provides automated optical screening and decision support based on statistical computer vision patterns. "
        "It does not replace laboratory phytopathological culturing or expert in-person field verification by certified Agritex extension personnel. "
        "Always adhere to national agricultural chemical registration labels and environmental safety regulations in Zimbabwe and Southern Africa.",
        ParagraphStyle("Disclaimer", parent=styles["Normal"], fontName="Helvetica-Oblique", fontSize=7, leading=10, textColor=colors.HexColor("#64748b"))
    )
    elements.append(disclaimer_p)

    doc.build(elements)
    return str(pdf_path)
