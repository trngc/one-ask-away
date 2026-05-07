"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { AlumnusNav } from "@/components/oaa/AlumnusNav";
import { Avatar } from "@/components/oaa/Avatar";
import { EmptyState } from "@/components/oaa/EmptyState";
import { alumnusNotesStore } from "@/lib/alumnus-notes-store";
import type { AlumnusNoteEntry } from "@/lib/alumnus-notes-store";

function formatDate(d: Date): string {
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export default function PastStudentsPage() {
  const [entries, setEntries] = useState<AlumnusNoteEntry[]>(() =>
    alumnusNotesStore.getAll(),
  );

  useEffect(() => {
    return alumnusNotesStore.subscribe(() =>
      setEntries([...alumnusNotesStore.getAll()]),
    );
  }, []);

  return (
    <>
      <AlumnusNav active="past-students" />

      <main className="mx-auto max-w-[1200px] px-8 pb-32 pt-12">
        <h1 className="mb-8 font-sans text-[40px] font-semibold leading-[1.05] tracking-[-0.01em] text-oaa-ink">
          Past students
        </h1>

        {entries.length > 0 ? (
          <div className="overflow-hidden rounded-md border border-oaa-hairline bg-white">
            {entries.map((entry, i) => (
              <div
                key={`${entry.studentName}-${entry.savedAt.getTime()}`}
                className={`flex items-center justify-between px-5 py-4 transition-colors hover:bg-oaa-bg ${
                  i > 0 ? "border-t border-oaa-hairline" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <Avatar variant="student" name={entry.studentName} />
                  <div>
                    <p className="text-[14px] font-semibold text-oaa-ink">
                      {entry.studentName}
                      <span className="ml-1.5 font-normal text-oaa-muted">
                        · {entry.studentProgram}, {entry.studentCohort}
                      </span>
                    </p>
                    <span className="mt-1 inline-block rounded-xs border border-oaa-hairline bg-white px-1.5 py-0.5 text-[11px] text-oaa-muted">
                      {entry.topic}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  {entry.reflectionStatus === "unreflected" && (
                    <span className="rounded-xs bg-oaa-clay-tint-bg px-2 py-0.5 font-mono text-[10px] tracking-[0.06em] uppercase text-oaa-clay">
                      Needs reflection
                    </span>
                  )}
                  <span className="text-[12px] text-oaa-muted">
                    {formatDate(entry.savedAt)}
                  </span>
                  {entry.reflectionStatus === "reflected" ? (
                    <span className="text-[13px] text-oaa-ink">
                      View notes →
                    </span>
                  ) : (
                    <Link
                      href={`/post-call-notes/${entry.studentId}`}
                      className="text-[13px] text-oaa-clay hover:underline"
                    >
                      Reflect now →
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            heading="No past students yet."
            subtitle="After a call, your notes will appear here."
          />
        )}
      </main>
    </>
  );
}
