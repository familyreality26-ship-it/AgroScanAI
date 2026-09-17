"""
Unit Tests for AgroScan AI Internationalization (i18n) Module
"""

import unittest
from pathlib import Path
import sys

BASE_DIR = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(BASE_DIR))

from core.i18n import I18nManager


class TestI18n(unittest.TestCase):

    def setUp(self):
        self.i18n = I18nManager(initial_language="en")

    def test_default_english(self):
        """Test standard English lookup."""
        self.assertEqual(self.i18n.get_language(), "en")
        title = self.i18n.t("app_title")
        self.assertEqual(title, "AgroScan AI")

    def test_switch_to_shona(self):
        """Test switching to chiShona."""
        self.assertTrue(self.i18n.set_language("sn"))
        subtitle = self.i18n.t("app_subtitle")
        self.assertIn("Zvirwere", subtitle)

    def test_switch_to_ndebele(self):
        """Test switching to isiNdebele."""
        self.assertTrue(self.i18n.set_language("nd"))
        subtitle = self.i18n.t("app_subtitle")
        self.assertIn("Imikhuhlane", subtitle)

    def test_missing_key_fallback(self):
        """Test that non-existent keys return the key string gracefully."""
        self.assertEqual(self.i18n.t("non_existent_key_123"), "non_existent_key_123")


if __name__ == "__main__":
    unittest.main()
