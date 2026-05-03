import { cn } from "@/lib/utils";

type Variant = "pending" | "accepted" | "declined" | "completed" | "live";

type Props = {
  variant: Variant;
  children: React.ReactNode;
  className?: string;
};

const styles: Record<Variant, { bg: string; dot: string }> = {
  pending: {
    bg: "bg-oaa-status-pending-bg",
    dot: "bg-oaa-status-pending-dot",
  },
  accepted: {
    bg: "bg-oaa-status-accepted-bg",
    dot: "bg-oaa-status-accepted-dot",
  },
  declined: {
    bg: "bg-oaa-status-declined-bg",
    dot: "bg-oaa-status-declined-dot",
  },
  completed: {
    bg: "bg-oaa-status-completed-bg",
    dot: "bg-oaa-status-completed-dot",
  },
  live: {
    bg: "bg-oaa-status-live-bg",
    dot: "bg-oaa-status-live-dot",
  },
};

export function StatusPill({ variant, children, className }: Props) {
  const s = styles[variant];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[12px] leading-none font-medium text-oaa-ink",
        s.bg,
        className,
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", s.dot)} aria-hidden />
      {children}
    </span>
  );
}
