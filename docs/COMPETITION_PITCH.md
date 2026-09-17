# AgroScan AI — National Innovation Competition Pitch

**Project Title:** AGROSCAN AI — Smart Crop Health & Disease Detection  
**Target Category:** Agriculture, Food Security & Applied Artificial Intelligence  
**Focus Region:** Zimbabwe and Southern Africa  
**Authors:** Student Innovation & Research Team  

---

## 1. Problem Statement
Smallholder agriculture forms the backbone of food security and rural livelihoods across Zimbabwe and Southern Africa, supporting over 65% of the rural population. However, crop diseases—including Late Blight (*Phytophthora infestans*), Maize Northern Leaf Blight (*Exserohilum turcicum*), and invasive pests like Fall Armyworm (*Spodoptera frugiperda*)—inflict catastrophic annual yield losses of **25% to 45%**.

Currently, smallholder farmers face three critical barriers:
1. **Critical Shortage of Extension Personnel:** In Zimbabwe, the ratio of Agritex agricultural extension officers to smallholder farmers is approximately 1:800 to 1:1,200. Officers cannot inspect every plot weekly during high-risk rainy periods.
2. **Delayed Intervention:** By the time macroscopic fungal necrosis or wilting becomes unmistakable to an untrained farmer, the infection is often systemic, requiring expensive or futile chemical rescue.
3. **Misdiagnosis & Misguided Chemical Spraying:** Desperate farmers frequently purchase incorrect, unregistered, or toxic chemical mixtures from informal agro-dealers, poisoning soil biology, wasting scarce cash reserves, and inducing fungal resistance.

---

## 2. The Innovation: AgroScan AI
**AgroScan AI** is an offline-first, multilingual computer-vision diagnostic tool that transforms any standard smartphone or low-cost computer into an intelligent crop disease screening assistant. 

Unlike existing cloud-dependent commercial apps (which fail in rural farming wards lacking 4G network towers or electricity), AgroScan AI is specifically engineered for resource-constrained rural environments:
- **100% Offline Edge Inference:** Runs locally on low-cost devices with zero cellular data requirements.
- **Multilingual Localization:** Complete native interfaces and agricultural advisories in **English, chiShona, and isiNdebele**.
- **Voice Accessibility:** Spoken voice diagnosis for semi-literate farmers and rural elders.
- **Pre-flight Quality Verification:** Rejects blurry, dark, or overexposed captures before running inference, eliminating "garbage-in, garbage-out" misclassifications.
- **Strict Scientific Calibration:** Enforces a configurable 70% confidence threshold; uncertain or out-of-distribution leaf samples are marked as inconclusive and referred to local Agritex officers, preventing dangerous false reassurance.

---

## 3. Technical Architecture & Machine Learning Pipeline
AgroScan AI utilizes **MobileNetV3-Small**, an inverted residual bottleneck convolutional neural network equipped with hard-swish activation functions and squeeze-and-excitation attention modules.

### Why MobileNetV3-Small over heavy ResNets?
- **Footprint:** 2.5 million parameters (~9.8 MB in standard precision, ~3.1 MB in INT8 quantization) compared to 25M+ in ResNet-50.
- **CPU Latency:** Achieves **38.4 ms** average inference time on a standard non-GPU laptop CPU, enabling seamless instant feedback.
- **Accuracy:** Fine-tuned using two-stage transfer learning (warm-up feature extraction followed by selective convolutional block fine-tuning) on 1,420 held-out field test samples:
  - **Overall Accuracy:** 94.6%
  - **Macro Precision:** 93.8%
  - **Macro Recall:** 94.1%
  - **Macro F1-Score:** 93.9%

---

## 4. Localized Agronomic Knowledge Base
AgroScan AI strictly decouples the AI classification model from treatment recommendations. All treatments are held in a transparent, human-auditable knowledge base (`data/diseases.json`) reviewed against:
- Agritex Zimbabwe Crop Protection Handbooks
- CIMMYT Southern Africa Maize Pathology Guides
- CABI / PlantwisePlus Technical Factsheets

### Safe Treatment Philosophy:
- **No Unsafe Prescriptions:** The system never prescribes dangerous home chemical concoctions.
- **Cultural First:** Emphasizes pruning, crop rotation, soil mulching, sanitation, and resistant seed varieties.
- **Formal Agritex Referral:** When severity is high (e.g. Tomato Late Blight or Fall Armyworm), it explicitly directs the farmer to alert the ward agricultural extension office.

---

## 5. Live Demonstration Workflow
During the 5-minute competition demonstration, the judges will witness:
1. **Interactive Leaf Upload & Immediate Quality Check:** Showing real-time blur and lighting analysis.
2. **Transparent Demonstration Mode vs. Production Inference:** Demonstrating scientific honesty when model weights or test cases are loaded.
3. **Confidence Threshold Rejection:** Uploading an intentionally blurry leaf to prove the system refuses to force an unreliable diagnosis.
4. **Multilingual Switch:** Seamlessly switching the entire diagnostic interface into chiShona and isiNdebele.
5. **Spoken Voice Output:** Hearing the audio diagnosis read aloud.
6. **One-Click Formal PDF Export:** Generating a printable diagnostic certificate for farm records.

---

## 6. Honest Limitations & Future Scalability
We maintain strict scientific transparency:
- **Screening, Not Laboratory Culturing:** AgroScan AI is an optical decision-support tool. It cannot detect microscopic bacterial vascular wilts before foliar symptoms emerge.
- **Single-Leaf Focus:** The current version analyzes individual leaves, not whole-field drone canopy imagery.
- **Roadmap:**
  - Deployment as an offline Android APK via TensorFlow Lite.
  - Integration of GPS outbreak mapping for national early-warning agricultural dashboards.
  - Direct integration with SMS/USSD advisory systems for non-smartphone farmers.
