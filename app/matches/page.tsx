import Link from "next/link";
import { RotateCw } from "lucide-react";

import { StudentNav } from "@/components/oaa/StudentNav";
import { SectionLabel } from "@/components/oaa/SectionLabel";
import { Avatar } from "@/components/oaa/Avatar";
import { TOP_3 } from "@/lib/mock-alumni";

export default function MatchesPage() {
  return (
    <div className="min-h-screen bg-oaa-bg">
      <StudentNav active="matches" />

      <main className="mx-auto max-w-[1200px] px-8 py-12">
        {/* Header */}
        <div className="mb-2">
          <SectionLabel number="11" label="Week 17 matches" />
        </div>

        <div className="mb-3 flex items-start justify-between">
          <h1 className="font-sans text-[44px] font-semibold leading-[1.1] tracking-[-0.01em] text-oaa-ink max-w-[620px]">
            Three alumni who match your goals.
          </h1>
          <span className="font-mono text-[11px] tracking-[0.08em] uppercase text-oaa-muted whitespace-nowrap mt-2">
            2 of 3 viewed
          </span>
        </div>

        <p className="mb-10 text-[15px] leading-[1.5] text-oaa-muted max-w-[480px]">
          We picked these based on your top aspiration and what you're looking for help with. Read their scope before you ask.
        </p>

        {/* Match cards */}
        <div className="mb-10 grid grid-cols-3 gap-5">
          {TOP_3.map((alumnus) => (
            <div
              key={alumnus.id}
              className="flex flex-col rounded-md border border-oaa-hairline bg-white p-6"
            >
              {/* Avatar + name + score */}
              <div className="mb-4 flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <Avatar variant="alumnus" name={alumnus.name} />
                  <div>
                    <p className="text-[14px] font-semibold leading-tight text-oaa-ink">
                      {alumnus.name}
                    </p>
                    <p className="text-[12px] text-oaa-muted">
                      {alumnus.cohort}
                    </p>
                    <p className="text-[12px] text-oaa-muted">
                      {alumnus.role} · {alumnus.company}
                    </p>
                    <p className="text-[12px] text-oaa-muted">{alumnus.city}</p>
                  </div>
                </div>
                <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-oaa-clay font-mono text-[11px] font-semibold text-white">
                  {alumnus.score}
                </span>
              </div>

              {/* Short bio quote */}
              <p className="mb-5 text-[13px] leading-[1.5] text-oaa-ink italic border-l-2 border-oaa-hairline pl-3">
                "{alumnus.shortBio}"
              </p>

              {/* Helps with */}
              <div className="mb-3">
                <p className="mb-1.5 font-mono text-[10px] tracking-[0.08em] uppercase text-oaa-muted">
                  Helps with
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {alumnus.offerings.map((o) => (
                    <span
                      key={o.id}
                      className="rounded-xs border border-oaa-hairline bg-white px-2 py-0.5 text-[12px] text-oaa-ink"
                    >
                      {o.title}
                    </span>
                  ))}
                </div>
              </div>

              {/* Doesn't offer */}
              {alumnus.nonOfferings.length > 0 && (
                <div className="mb-5">
                  <p className="mb-1.5 font-mono text-[10px] tracking-[0.08em] uppercase text-oaa-muted">
                    Doesn't offer
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {alumnus.nonOfferings.map((n) => (
                      <span
                        key={n.id}
                        className="rounded-xs border border-oaa-hairline bg-white px-2 py-0.5 text-[12px] text-oaa-muted line-through"
                      >
                        {n.title}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Footer */}
              <div className="mt-auto flex items-center justify-between pt-4 border-t border-oaa-hairline">
                <span
                  className={`text-[12px] flex items-center gap-1.5 ${
                    alumnus.availabilityLevel === "Limited availability"
                      ? "text-oaa-clay"
                      : "text-oaa-muted"
                  }`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      alumnus.availabilityLevel === "Limited availability"
                        ? "bg-oaa-clay"
                        : "bg-oaa-status-accepted-dot"
                    }`}
                  />
                  {alumnus.availabilityLevel}
                </span>
                <Link
                  href={`/alumni/${alumnus.id}`}
                  className="flex items-center gap-1 text-[13px] text-oaa-clay hover:underline"
                >
                  View profile →
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-oaa-hairline pt-5">
          <p className="text-[13px] text-oaa-muted">
            Open or send to all 3 to unlock new matches.
          </p>
          <button
            type="button"
            className="flex items-center gap-1.5 text-[13px] text-oaa-clay hover:underline"
          >
            <RotateCw className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden />
            Regenerate matches
          </button>
        </div>
      </main>
    </div>
  );
}
