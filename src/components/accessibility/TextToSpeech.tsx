import { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface TextToSpeechProps {
  text: string;
  className?: string;
  size?: "sm" | "default" | "lg" | "icon";
}

export function TextToSpeech({ text, className = "", size = "icon" }: TextToSpeechProps) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    return () => {
      if (utteranceRef.current) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleSpeak = () => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    if (!text.trim()) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "ar-SA";
    utterance.rate = 0.9;
    utterance.pitch = 1;

    // Try to find an Arabic female voice
    const voices = window.speechSynthesis.getVoices();
    const arabicVoice = voices.find(
      (voice) => voice.lang.startsWith("ar") && voice.name.toLowerCase().includes("female")
    ) || voices.find((voice) => voice.lang.startsWith("ar"));
    
    if (arabicVoice) {
      utterance.voice = arabicVoice;
    }

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size={size}
            onClick={handleSpeak}
            className={`text-primary hover:text-primary/80 hover:bg-primary/10 ${className}`}
            aria-label={isSpeaking ? "إيقاف القراءة" : "استمع للنص"}
          >
            {isSpeaking ? (
              <VolumeX className="h-4 w-4" />
            ) : (
              <Volume2 className="h-4 w-4" />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent side="top">
          <p>{isSpeaking ? "إيقاف القراءة" : "استمع للنص"}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
