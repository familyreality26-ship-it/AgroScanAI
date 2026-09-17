"""
Unit Tests for AgroScan AI SQLite Database Module
"""

import unittest
import tempfile
import os
from pathlib import Path
import sys

BASE_DIR = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(BASE_DIR))

from core.database import DatabaseManager


class TestDatabase(unittest.TestCase):

    def setUp(self):
        # Create temporary database file
        self.temp_db = tempfile.NamedTemporaryFile(suffix=".db", delete=False)
        self.temp_db.close()
        self.db = DatabaseManager(db_path=Path(self.temp_db.name))

    def tearDown(self):
        # Clean up temporary database
        try:
            os.remove(self.temp_db.name)
        except Exception:
            pass

    def test_insert_and_retrieve_scan(self):
        """Test adding and retrieving a scan record."""
        scan_id = self.db.add_scan(
            crop="Tomato",
            prediction="Late Blight",
            confidence=94.2,
            result_status="High-confidence screening"
        )
        self.assertGreater(scan_id, 0)
        
        record = self.db.get_scan_by_id(scan_id)
        self.assertIsNotNone(record)
        self.assertEqual(record["crop"], "Tomato")
        self.assertEqual(record["prediction"], "Late Blight")
        self.assertEqual(record["confidence"], 94.2)

    def test_search_scans(self):
        """Test searching records by crop name."""
        self.db.add_scan(crop="Maize", prediction="Northern Leaf Blight", confidence=92.0)
        self.db.add_scan(crop="Potato", prediction="Late Blight", confidence=88.5)
        
        results = self.db.search_scans("Maize")
        self.assertEqual(len(results), 1)
        self.assertEqual(results[0]["crop"], "Maize")

    def test_delete_scan(self):
        """Test deleting a single record."""
        scan_id = self.db.add_scan(crop="Beans", prediction="Rust", confidence=90.0)
        self.assertTrue(self.db.delete_scan(scan_id))
        self.assertIsNone(self.db.get_scan_by_id(scan_id))


if __name__ == "__main__":
    unittest.main()
