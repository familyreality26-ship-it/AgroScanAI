# AgroScan AI — Training & Dataset Methodology Guide

## 1. Dataset Acquisition for Southern Africa

To train a robust, competition-ready crop health classifier for smallholder farming contexts:

### Recommended Public & Regional Datasets:
1. **CIMMYT Southern Africa Maize Pathology Dataset**: Regional field photos capturing Northern Corn Leaf Blight (*Exserohilum turcicum*), Gray Leaf Spot (*Cercospora zeae-maydis*), and Fall Armyworm leaf whorl damage.
2. **PlantVillage Horticultural Subset**: High-quality leaf imagery covering Tomato Late Blight (*Phytophthora infestans*), Early Blight (*Alternaria solani*), Potato Blight, and Bean Rust.
3. **Local Field Collection Protocol**: High-resolution mobile captures taken across agro-ecological regions II and III in Zimbabwe (e.g. Mashonaland Central, Manicaland), annotated in partnership with local Agritex extension agronomists.

## 2. Directory Layout for Training

Place raw images in the following directory format:

```
dataset/
├── Tomato___Late_blight/
│   ├── img_001.jpg
│   └── ...
├── Tomato___Early_blight/
├── Tomato___healthy/
├── Maize___Northern_Leaf_Blight/
├── Maize___Common_Rust/
├── Maize___Fall_Armyworm_Damage/
├── Maize___healthy/
├── Potato___Late_blight/
├── Potato___healthy/
├── Beans___Rust_and_Mosaic/
├── Beans___healthy/
├── Tobacco___Mosaic_Virus/
└── Tobacco___healthy/
```

## 3. Running the Training Pipeline

Ensure prerequisites are installed:
```bash
pip install tensorflow scikit-learn numpy pillow matplotlib
```

Execute the training script:
```bash
python training/train_model.py --data_dir dataset --output_dir models --warmup_epochs 5 --finetune_epochs 15
```

This will:
1. Load images and apply stratified 70% train / 15% validation / 15% test split.
2. Apply real-time illumination, rotation, zoom, and contrast jitter data augmentations.
3. Warm up MobileNetV3-Small classification layers with frozen feature backbone.
4. Fine-tune top convolutional layers using low learning rate (`1e-4`).
5. Export `models/classes.json` and production `models/agroscan_model.keras`.

## 4. Running Evaluation on Test Set

To compute an independent test evaluation report:
```bash
python training/evaluate_model.py --model_path models/agroscan_model.keras --test_dir dataset/test --output_dir models
```

This generates `models/evaluation_report.json` with true empirical precision, recall, F1, and latency metrics for the competition judging panel.
