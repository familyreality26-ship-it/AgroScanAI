"""
AgroScan AI — Multilingual Architecture
Supports English, Shona (chiShona), and Ndebele (isiNdebele).
"""

import json
from pathlib import Path
from core.settings import LANGUAGES_DIR, DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES


class I18nManager:
    """Manages dynamic interface and report translations across languages."""

    def __init__(self, initial_language: str = DEFAULT_LANGUAGE):
        self.current_language = initial_language if initial_language in SUPPORTED_LANGUAGES else DEFAULT_LANGUAGE
        self.translations = {}
        self.fallback_translations = {}
        self._load_all_languages()

    def _load_all_languages(self):
        """Loads all JSON translation files into memory."""
        for lang in SUPPORTED_LANGUAGES:
            file_path = LANGUAGES_DIR / f"{lang}.json"
            if file_path.exists():
                try:
                    with open(file_path, "r", encoding="utf-8") as f:
                        self.translations[lang] = json.load(f)
                except Exception as e:
                    print(f"[i18n Warning] Failed to parse {file_path}: {e}")
                    self.translations[lang] = {}
            else:
                self.translations[lang] = {}
                
        self.fallback_translations = self.translations.get("en", {})

    def set_language(self, language_code: str) -> bool:
        """Sets the active language code."""
        if language_code in SUPPORTED_LANGUAGES:
            self.current_language = language_code
            return True
        return False

    def get_language(self) -> str:
        """Returns the active language code."""
        return self.current_language

    def t(self, key: str, **kwargs) -> str:
        """
        Translates a string key for current language with English fallback.
        Supports formatting kwargs, e.g. t('greeting', name='Tinashe')
        """
        active_dict = self.translations.get(self.current_language, {})
        val = active_dict.get(key)
        
        if val is None:
            val = self.fallback_translations.get(key, key)
            
        if kwargs and isinstance(val, str):
            try:
                return val.format(**kwargs)
            except Exception:
                return val
        return val


# Singleton instance
i18n = I18nManager()
