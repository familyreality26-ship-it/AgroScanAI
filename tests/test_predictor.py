"""
Unit Tests for AgroScan AI Predictor Adapter & Confidence Thresholding
"""

import unittest
from pathlib import Path
import sys

BASE_DIR = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(BASE_DIR))

from core.predictor import AgroScanPredictor
from core.settings import CONFIDENCE_THRESHOLD


class TestPredictor(unittest.TestCase):

    def setUp(self):
        self.predictor = AgroScanPredictor(threshold=CONFIDENCE_THRESHOLD)

    def test_demo_mode_initialization(self):
        """Test that missing weights gracefully defaults to demonstration mode."""
        self.assertTrue(self.predictor.is_demo_mode)
        self.assertIn("demonstration mode", self.predictor.status_message.lower())

    def test_confidence_threshold_rejection(self):
        """Test that low confidence inputs (<0.70) are rejected safely."""
        # Simulated low-confidence / blurry input
        result = self.predictor.predict("sample_blurry_leaf.jpg", selected_crop="Tomato")
        self.assertFalse(result["is_high_confidence"])
        self.assertIn("Unable to identify the condition reliably", result["condition"])
        self.assertEqual(result["result_status"], "Low-confidence - Inconclusive")

    def test_high_confidence_prediction(self):
        """Test standard calibrated high-confidence prediction."""
        result = self.predictor.predict("sample_tomato_leaf.jpg", selected_crop="Tomato")
        self.assertGreaterEqual(result["confidence_decimal"], CONFIDENCE_THRESHOLD)
        self.assertTrue(result["is_high_confidence"])
        self.assertEqual(result["result_status"], "High-confidence screening")
        self.assertIn("Tomato", result["crop"])
        self.assertIn("Late Blight", result["condition"])

    def test_disclaimer_present(self):
        """Test that legal disclaimer is always embedded in diagnostic output."""
        result = self.predictor.predict("sample.jpg")
        self.assertIn("AI-assisted screening", result["disclaimer"])


if __name__ == "__main__":
    unittest.main()
