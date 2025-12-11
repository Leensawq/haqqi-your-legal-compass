import { forwardRef, useState, useCallback } from "react";
import { Textarea } from "@/components/ui/textarea";
import { SpeechToText } from "./SpeechToText";

interface VoiceInputProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  onValueChange?: (value: string) => void;
}

export const VoiceInput = forwardRef<HTMLTextAreaElement, VoiceInputProps>(
  ({ className, value, onChange, onValueChange, ...props }, ref) => {
    const [internalValue, setInternalValue] = useState("");

    const currentValue = value !== undefined ? String(value) : internalValue;

    const handleTranscript = useCallback((transcript: string) => {
      const newValue = currentValue + (currentValue ? " " : "") + transcript;
      
      if (onValueChange) {
        onValueChange(newValue);
      }
      
      if (onChange) {
        const syntheticEvent = {
          target: { value: newValue },
        } as React.ChangeEvent<HTMLTextAreaElement>;
        onChange(syntheticEvent);
      }
      
      if (value === undefined) {
        setInternalValue(newValue);
      }
    }, [currentValue, onChange, onValueChange, value]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (value === undefined) {
        setInternalValue(e.target.value);
      }
      if (onChange) {
        onChange(e);
      }
      if (onValueChange) {
        onValueChange(e.target.value);
      }
    };

    return (
      <div className="relative">
        <Textarea
          ref={ref}
          className={`pl-12 ${className}`}
          value={currentValue}
          onChange={handleChange}
          {...props}
        />
        <div className="absolute left-2 top-2">
          <SpeechToText onTranscript={handleTranscript} />
        </div>
      </div>
    );
  }
);

VoiceInput.displayName = "VoiceInput";
