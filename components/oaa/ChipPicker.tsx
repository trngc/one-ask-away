"use client";

import { cn } from "@/lib/utils";
import { Chip } from "@/components/oaa/Chip";

type Props = {
  options: string[];
  value: string[];
  onChange: (v: string[]) => void;
  className?: string;
};

// Thin controlled wrapper around Chip mode="select".
// Passes className="w-auto" via twMerge to override Chip's built-in w-full.
// Fully controlled — no internal state.
export function ChipPicker({ options, value, onChange, className }: Props) {
  function toggle(opt: string) {
    if (value.includes(opt)) {
      onChange(value.filter((v) => v !== opt));
    } else {
      onChange([...value, opt]);
    }
  }

  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {options.map((opt) => (
        <Chip
          key={opt}
          label={opt}
          mode="select"
          selected={value.includes(opt)}
          onClick={() => toggle(opt)}
          className="w-auto"
        />
      ))}
    </div>
  );
}
