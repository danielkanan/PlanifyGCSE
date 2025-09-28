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
      case 1: return "bg-red-500";
      case 2: return "bg-orange-500";
      case 3: return "bg-yellow-500";
      case 4: return "bg-blue-500";
      case 5: return "bg-green-500";
      default: return "bg-gray-200";
    }
  };

  return (
    <div className="flex flex-col items-end space-y-2">
      <div className="flex rounded-lg overflow-hidden border border-border">
        {[1, 2, 3, 4, 5].map((level) => (
          <button
            key={level}
            onClick={() => handleClick(level)}
            disabled={disabled}
            className={cn(
              "w-12 h-8 flex items-center justify-center text-white font-medium text-sm transition-all duration-200",
              getColor(level),
              selectedValue === level && "ring-2 ring-ring ring-offset-1",
              !disabled && "hover:opacity-80 cursor-pointer",
              disabled && "cursor-not-allowed opacity-50"
            )}
          >
            {level}
          </button>
        ))}
      </div>
      <p className="text-sm text-muted-foreground">Choose an initial confidence level</p>
    </div>
  );
}
