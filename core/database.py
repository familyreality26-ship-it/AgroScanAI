"""
AgroScan AI — SQLite Database Module
Stores scan history locally on farmer / extension officer device.
Supports offline CRUD operations, search filtering, and CSV export.
"""

import sqlite3
import csv
from datetime import datetime
from pathlib import Path
from typing import List, Dict, Any, Optional

from core.settings import SQLITE_DB_PATH


class DatabaseManager:
    """Manages persistent SQLite storage for AgroScan AI leaf scans."""

    def __init__(self, db_path: Optional[Path] = None):
        self.db_path = db_path or SQLITE_DB_PATH
        self.db_path.parent.mkdir(parents=True, exist_ok=True)
        self._init_db()

    def _get_connection(self):
        conn = sqlite3.connect(str(self.db_path))
        conn.row_factory = sqlite3.Row
        return conn

    def _init_db(self):
        """Initializes SQLite tables if they do not exist."""
        with self._get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("""
                CREATE TABLE IF NOT EXISTS scans (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    timestamp TEXT NOT NULL,
                    image_path TEXT,
                    crop TEXT NOT NULL,
                    prediction TEXT NOT NULL,
                    confidence REAL NOT NULL,
                    model_version TEXT,
                    language TEXT,
                    result_status TEXT,
                    treatment_key TEXT,
                    notes TEXT
                )
            """)
            conn.commit()

    def add_scan(
        self,
        crop: str,
        prediction: str,
        confidence: float,
        image_path: str = "",
        model_version: str = "v1.2",
        language: str = "en",
        result_status: str = "High-confidence screening",
        treatment_key: str = "",
        notes: str = ""
    ) -> int:
        """Inserts a new scan diagnostic record."""
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        with self._get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("""
                INSERT INTO scans (
                    timestamp, image_path, crop, prediction,
                    confidence, model_version, language, result_status,
                    treatment_key, notes
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """, (
                timestamp, image_path, crop, prediction,
                confidence, model_version, language, result_status,
                treatment_key, notes
            ))
            conn.commit()
            return cursor.lastrowid

    def get_all_scans(self) -> List[Dict[str, Any]]:
        """Retrieves all historical scans sorted by newest first."""
        with self._get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("SELECT * FROM scans ORDER BY id DESC")
            rows = cursor.fetchall()
            return [dict(row) for row in rows]

    def get_scan_by_id(self, scan_id: int) -> Optional[Dict[str, Any]]:
        """Retrieves a single scan record."""
        with self._get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("SELECT * FROM scans WHERE id = ?", (scan_id,))
            row = cursor.fetchone()
            return dict(row) if row else None

    def delete_scan(self, scan_id: int) -> bool:
        """Deletes a scan record by ID."""
        with self._get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("DELETE FROM scans WHERE id = ?", (scan_id,))
            conn.commit()
            return cursor.rowcount > 0

    def clear_history(self) -> bool:
        """Clears all scan records."""
        with self._get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("DELETE FROM scans")
            conn.commit()
            return True

    def search_scans(self, query: str) -> List[Dict[str, Any]]:
        """Searches records by crop or predicted disease condition."""
        q = f"%{query}%"
        with self._get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("""
                SELECT * FROM scans 
                WHERE crop LIKE ? OR prediction LIKE ? OR result_status LIKE ?
                ORDER BY id DESC
            """, (q, q, q))
            rows = cursor.fetchall()
            return [dict(row) for row in rows]

    def export_csv(self, export_path: str) -> str:
        """Exports scan history to CSV file for farm records or research."""
        scans = self.get_all_scans()
        out_file = Path(export_path)
        out_file.parent.mkdir(parents=True, exist_ok=True)
        
        fieldnames = [
            "id", "timestamp", "crop", "prediction", "confidence",
            "result_status", "model_version", "language", "image_path", "notes"
        ]
        
        with open(out_file, "w", newline="", encoding="utf-8") as f:
            writer = csv.DictWriter(f, fieldnames=fieldnames, extrasaction="ignore")
            writer.writeheader()
            for scan in scans:
                writer.writerow(scan)
                
        return str(out_file)


# Global database instance
db = DatabaseManager()
