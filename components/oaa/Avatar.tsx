import { cn } from "@/lib/utils";

type Variant = "student" | "alumnus";
type Size = "sm" | "md" | "lg";

type Props = {
  variant: Variant;
  name: string;
  size?: Size;
  className?: string;
};

const sizes: Record<Size, string> = {
  sm: "h-7 w-7 text-[10px]",
  md: "h-10 w-10 text-[12px]",
  lg: "h-14 w-14 text-[14px]",
};

function initials(name: string) {
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (first + last).toUpperCase();
}

export function Avatar({ variant, name, size = "md", className }: Props) {
  const isStudent = variant === "student";
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-full font-mono tracking-[0.04em]",
        isStudent ? "bg-oaa-clay text-white" : "bg-oaa-ink text-white",
        sizes[size],
        className,
      )}
      aria-label={name}
      title={name}
    >
      {initials(name)}
    </span>
  );
}
