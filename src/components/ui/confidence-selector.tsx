"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface ConfidenceSelectorProps {
  value?: number;
  onChange?: (value: number) => void;
  disabled?: boolean;
}

export function ConfidenceSelector({ value, onChange, disabled = false }: ConfidenceSelectorProps) {
  const [selectedValue, setSelectedValue] = useState(value || 0);

  const handleClick = (level: number) => {
    if (disabled) return;
    
    const newValue = selectedValue === level ? 0 : level;
    setSelectedValue(newValue);
    onChange?.(newValue);
  };

  const getColor = (level: number) => {
    switch (level) {
      case 1: return "bg-red-500/80";
      case 2: return "bg-orange-500/80";
      case 3: return "bg-amber-500/80";
      case 4: return "bg-blue-500/80";
      case 5: return "bg-emerald-500/80";
      default: return "bg-muted";
    }
  };

  return (
    <div className="flex flex-col items-end sm:items-end space-y-1">
      <div className="flex rounded-md overflow-hidden border border-border w-full sm:w-auto">
        {[1, 2, 3, 4, 5].map((level) => (
          <button
            key={level}
            onClick={() => handleClick(level)}
            disabled={disabled}
            className={cn(
              "flex-1 sm:w-10 h-7 flex items-center justify-center text-white font-medium text-sm transition-all duration-200",
              getColor(level),
              selectedValue === level && "ring-1 ring-ring ring-offset-1",
              !disabled && "hover:opacity-80 cursor-pointer",
              disabled && "cursor-not-allowed opacity-50"
            )}
          >
            {level}
          </button>
        ))}
      </div>
      <p className="text-xs text-muted-foreground self-start sm:self-end">Choose confidence level</p>
    </div>
  );
}
