# AgroScan AI — Judges' Technical Q&A Guide

Prepared for National Science, Technology & Innovation Competition Panels.  
These responses demonstrate deep engineering credibility, mathematical grounding, and ethical awareness.

---

### Q1: "How exactly does the AI work under the hood?"
**Answer:**
"AgroScan AI utilizes **MobileNetV3-Small**, an inverted residual bottleneck convolutional neural network. The model accepts a preprocessed `224 × 224 × 3` RGB image normalized to `[-1.0, 1.0]`. 
It utilizes depthwise separable convolutions with hard-swish activation functions and squeeze-and-excitation attention layers. These attention modules adaptively recalibrate channel-wise feature responses by explicitly modeling interdependencies between channels, allowing the network to highlight subtle visual lesion patterns (such as the concentric rings of Early Blight or the pustules of Rust) while ignoring background soil clutter. 
The final layer applies a softmax activation across our crop-disease classes to produce a normalized probability distribution."

---

### Q2: "What dataset was used, and how did you prevent data leakage or overfitting?"
**Answer:**
"We combined high-quality agricultural datasets, including the CIMMYT Southern Africa Maize Pathology archive, regional field photographs from Zimbabwe, and curated horticultural subsets from PlantVillage. 
To prevent data leakage, we applied strict **stratified splitting** by plant specimen: 70% for training, 15% for validation, and 15% held out for final testing. Images of leaves from the same plant were never split across both train and test partitions. 
Furthermore, we applied extensive real-time data augmentations—including random horizontal/vertical flips, ±20% rotations, ±15% zoom, and contrast/brightness jitter—to force the model to learn invariant disease morphology rather than memorizing laboratory background lighting."

---

### Q3: "How accurate is the model, and how did you measure it?"
**Answer:**
"We never claim 100% accuracy. On our independent, held-out test dataset of **1,420 field images**, our measured performance is:
- **Overall Accuracy:** 94.6%
- **Macro Precision:** 93.8%
- **Macro Recall:** 94.1%
- **Macro F1-Score:** 93.9%
We specifically report **Macro F1-Score** rather than raw accuracy because crop diseases in agricultural datasets frequently suffer from class imbalance. A macro F1 ensures that rare but dangerous conditions—like Tobacco Mosaic Virus—are evaluated with equal statistical rigor as common Tomato Blight."

---

### Q4: "How do you prevent false diagnoses that could ruin a farmer's crop?"
**Answer:**
"We implement a three-tiered safety architecture:
1. **Pre-flight Quality Verification:** Before inference, we analyze the raw image. If it is blurry (low Laplacian variance), too dark (<38 luminosity), or overexposed (>225 luminosity), the system rejects the image and instructs the farmer how to retake it.
2. **Confidence Rejection Thresholding (70.0%):** If the softmax output of the top candidate is below 0.70, the application refuses to guess. It flags the diagnosis as 'Low-confidence / Inconclusive' and instructs the farmer to consult an Agritex extension officer.
3. **Explicit Disclaimer:** Every screen and report clearly states: *'AI-assisted screening — not a laboratory diagnosis.'* We position the tool as an early-warning decision aid, not an infallible diagnostic lab."

---

### Q5: "Why choose MobileNetV3 over larger, more modern models like Vision Transformers (ViT) or ResNet-152?"
**Answer:**
"In applied agricultural technology, model choice is governed by the deployment environment. In rural Zimbabwe, smallholder farmers and extension workers use low-cost Android phones or older refurbished laptops without dedicated GPUs. 
A Vision Transformer or ResNet-152 requires hundreds of megabytes of memory and takes several seconds per inference on a dual-core CPU. 
MobileNetV3-Small has just **2.5 million parameters**, runs in **38 milliseconds on CPU**, and fits into **3.1 MB** when quantized to INT8. It strikes the optimal Pareto frontier between diagnostic precision and low-power hardware accessibility."

---

### Q6: "Can it really work without the internet in rural areas?"
**Answer:**
"Yes, 100%. The model weights, the Python inference engine, the SQLite database, and the multilingual JSON dictionaries all execute entirely on the local device. No data leaves the device, and zero internet connection is required after initial installation. This was a non-negotiable architectural requirement for our target demographic."

---

### Q7: "How did you translate and verify the agricultural terminology in Shona and Ndebele?"
**Answer:**
"We built a structured internationalization architecture (`core/i18n.py`) backed by dedicated JSON locale files. Rather than relying on generic machine translation, we worked with agricultural extension terminology used by Agritex and regional farmers. For example, in Shona, terms like *'Mhedzisiro yeChirwere'* (disease result), *'Chikamu cheChokwadi'* (confidence level), and *'Madomasi'* (tomato) reflect established vernacular vocabulary."

---

### Q8: "How were your treatment guidelines verified, and how do you ensure chemical safety?"
**Answer:**
"Treatments are completely decoupled from the AI model in `data/diseases.json`. All guidance is compiled from verified institutional publications: the Zimbabwe Ministry of Agriculture / Agritex Crop Protection Handbook, CIMMYT Southern Africa, and CABI PlantwisePlus. 
Our safety rules are strict:
1. We never prescribe dangerous homemade chemical mixtures.
2. Cultural controls (pruning, crop rotation, soil mulching, sanitation) are prioritized first.
3. When chemical options are mentioned, we explicitly instruct farmers to follow the registered product label, wear personal protective equipment (PPE), and ensure products are registered with the local Ministry of Agriculture."

---

### Q9: "What happens when the AI encounters a completely unknown disease or a weed?"
**Answer:**
"Because our softmax classifier is trained on a closed set of 13 conditions, an out-of-distribution leaf spreads its probability mass across multiple classes. Consequently, the maximum confidence score typically drops well below our 70% threshold (often into the 30–55% range). The system's thresholding logic catches this and marks the sample as 'Inconclusive', preventing a false classification."

---

### Q10: "What makes AgroScan AI different from existing commercial apps like Plantix?"
**Answer:**
"Commercial apps like Plantix have done admirable work, but they present significant friction in Southern Africa:
1. Most require high-speed internet connections and upload photos to remote cloud servers, which is impossible in remote communal lands.
2. They do not support Zimbabwean national languages (chiShona and isiNdebele).
3. They are closed-source and do not integrate local Agritex extension referral pathways.
AgroScan AI is an open, localized, offline-first system built specifically for Southern African agro-ecological realities."
