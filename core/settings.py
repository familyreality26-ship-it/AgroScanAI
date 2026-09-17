"""
AgroScan AI — Application Configuration & Settings
"""

import os
from pathlib import Path

# Paths
BASE_DIR = Path(__file__).resolve().parent.parent
DATA_DIR = BASE_DIR / "data"
LANGUAGES_DIR = DATA_DIR / "languages"
MODELS_DIR = BASE_DIR / "models"
REPORTS_DIR = BASE_DIR / "reports"
ASSETS_DIR = BASE_DIR / "assets"

# Ensure runtime directories exist
DATA_DIR.mkdir(parents=True, exist_ok=True)
REPORTS_DIR.mkdir(parents=True, exist_ok=True)
MODELS_DIR.mkdir(parents=True, exist_ok=True)

# AI Model Configuration
MODEL_PATH = MODELS_DIR / "agroscan_model.keras"
CLASSES_PATH = MODELS_DIR / "classes.json"
DISEASES_DB_PATH = DATA_DIR / "diseases.json"
SQLITE_DB_PATH = DATA_DIR / "agroscan.db"

# Strict scientific confidence threshold:
# Predictions below 70% are treated as uncertain / low confidence
CONFIDENCE_THRESHOLD = 0.70

# Input image dimensions
INPUT_SHAPE = (224, 224, 3)

# Default language ('en' = English, 'sn' = Shona, 'nd' = Ndebele)
DEFAULT_LANGUAGE = "en"
SUPPORTED_LANGUAGES = ["en", "sn", "nd"]

# Voice Text-to-Speech
VOICE_ENABLED = True
VOICE_SPEECH_RATE = 150

# Application Version & Competition Info
APP_NAME = "AgroScan AI"
APP_SUBTITLE = "Smart Crop Health & Disease Detection"
APP_VERSION = "v1.2.0-competition"
MODEL_VERSION = "AgroScan-MobileNetV3-Small-v1.2"
LEGAL_DISCLAIMER = "AI-assisted screening — not a laboratory diagnosis."
