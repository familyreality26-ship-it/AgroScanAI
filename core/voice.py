"""
AgroScan AI — Voice Synthesis & Accessibility Module
Provides offline text-to-speech for agricultural extension in rural areas.
Features graceful degradation if system voice drivers are absent.
Never crashes application on missing dependencies.
"""

import threading
from typing import Optional

# Safe import of pyttsx3
try:
    import pyttsx3
except ImportError:
    pyttsx3 = None


class VoiceAssistant:
    """Manages offline spoken audio feedback for smallholder farmers."""

    def __init__(self):
        self.engine = None
        self.is_available = False
        self._is_speaking = False
        self._init_engine()

    def _init_engine(self):
        """Safely initializes speech synthesis engine."""
        if pyttsx3 is None:
            self.is_available = False
            return

        try:
            self.engine = pyttsx3.init()
            self.engine.setProperty("rate", 145)  # Measured pace for farmer clarity
            self.engine.setProperty("volume", 0.95)
            self.is_available = True
        except Exception as e:
            print(f"[Voice Warning] TTS engine could not be initialized: {e}")
            self.is_available = False
            self.engine = None

    def speak(self, text: str):
        """Speaks text asynchronously in a background thread."""
        if not self.is_available or not self.engine:
            return

        def _worker():
            try:
                self._is_speaking = True
                self.engine.say(text)
                self.engine.runAndWait()
            except Exception as e:
                print(f"[Voice Error] Playback error: {e}")
            finally:
                self._is_speaking = False

        thread = threading.Thread(target=_worker, daemon=True)
        thread.start()

    def speak_diagnosis(self, crop: str, condition: str, confidence_pct: float, action: Optional[str] = None, warning: Optional[str] = None, language: str = "en"):
        """Formats and reads aloud the diagnostic outcome."""
        if language == "sn":
            message = f"Kuongorora kwaitwa. Chirimwa: {crop}. Chirwere chiri kufungidzirwa: {condition}. Chokwadi: chikamu chemakumi {int(confidence_pct)} kubva muzana."
            if action:
                message += f" Matanho ekutanga: {action}."
        elif language == "nd":
            message = f"Ukuhlola kuqediwe. Isilimo: {crop}. Umkhuhlane: {condition}. Isilinganiso seqiniso: amaphesenti angamashumi {int(confidence_pct)}."
            if action:
                message += f" Izinyathelo: {action}."
        else:
            message = f"AgroScan AI screening complete. Crop: {crop}. Predicted condition: {condition}, with {confidence_pct:.1f} percent confidence."
            if action:
                message += f" Recommended immediate action: {action}."
            if warning:
                message += f" Warning: {warning}."
            message += " Note: This is an AI-assisted screening, not a laboratory test."

        self.speak(message)

    def stop(self):
        """Stops any active speech."""
        if self.is_available and self.engine and self._is_speaking:
            try:
                self.engine.stop()
            except Exception:
                pass


# Global voice instance
voice = VoiceAssistant()
