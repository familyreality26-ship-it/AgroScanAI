import { LanguageCode } from "../types";

class VoiceSpeaker {
  private synth: SpeechSynthesis | null = null;
  private isSpeaking: boolean = false;

  constructor() {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      this.synth = window.speechSynthesis;
    }
  }

  public isSupported(): boolean {
    return this.synth !== null;
  }

  public stop(): void {
    if (this.synth) {
      this.synth.cancel();
      this.isSpeaking = false;
    }
  }

  public speak(text: string, lang: LanguageCode = "en", onEnd?: () => void): boolean {
    if (!this.synth) return false;

    this.stop();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95; // Slightly slower for clarity
    utterance.pitch = 1.0;

    // Pick appropriate locale or voice
    if (lang === "sn" || lang === "nd") {
      // Use African English or general voice if dedicated Bantu voice is not preloaded in browser
      utterance.lang = "en-ZA";
    } else {
      utterance.lang = "en-US";
    }

    utterance.onend = () => {
      this.isSpeaking = false;
      if (onEnd) onEnd();
    };

    utterance.onerror = () => {
      this.isSpeaking = false;
      if (onEnd) onEnd();
    };

    this.isSpeaking = true;
    this.synth.speak(utterance);
    return true;
  }

  public getSpeakingState(): boolean {
    return this.isSpeaking;
  }
}

export const voiceSpeaker = new VoiceSpeaker();
