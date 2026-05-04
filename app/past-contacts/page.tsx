"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { StudentNav } from "@/components/oaa/StudentNav";
import { Avatar } from "@/components/oaa/Avatar";
import { EmptyState } from "@/components/oaa/EmptyState";
import { reflectionStore } from "@/lib/reflection-store";
import { UNREAD_COUNT } from "@/lib/mock-notifications";
import type { ReflectionEntry } from "@/lib/reflection-store";

function formatDate(d: Date): string {
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export default function PastContactsPage() {
  const [entries, setEntries] = useState<ReflectionEntry[]>(() =>
    reflectionStore.getAll(),
  );

  useEffect(() => {
    return reflectionStore.subscribe(() =>
      setEntries([...reflectionStore.getAll()]),
    );
  }, []);

  return (
    <>
      <StudentNav active="none" notificationCount={UNREAD_COUNT} />

      <main className="mx-auto max-w-[1200px] px-8 pb-32 pt-12">
        <h1 className="mb-8 font-sans text-[40px] font-semibold leading-[1.05] tracking-[-0.01em] text-oaa-ink">
          Past contacts
        </h1>

        {entries.length > 0 ? (
          <div className="overflow-hidden rounded-md border border-oaa-hairline bg-white">
            {entries.map((entry, i) => (
              <div
                key={`${entry.alumniId}-${entry.savedAt.getTime()}`}
                className={`flex items-center justify-between px-5 py-4 transition-colors hover:bg-oaa-bg ${
                  i > 0 ? "border-t border-oaa-hairline" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <Avatar variant="alumnus" name={entry.alumniName} />
                  <div>
                    <p className="text-[14px] font-semibold text-oaa-ink">
                      {entry.alumniName}
                      <span className="ml-1.5 font-normal text-oaa-muted">
                        · {entry.alumniRole}, {entry.alumniCompany}
                      </span>
                    </p>
                    <span className="mt-1 inline-block rounded-xs border border-oaa-hairline bg-white px-1.5 py-0.5 text-[11px] text-oaa-muted">
                      {entry.topic}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-[12px] text-oaa-muted">
                    {formatDate(entry.savedAt)}
                  </span>
                  <Link
                    href={`/alumni/${entry.alumniId}`}
                    className="text-[13px] text-oaa-clay hover:underline"
                  >
                    Contact again →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            heading="No past contacts yet."
            subtitle="After a call, your reflections and contacts will live here."
          />
        )}
      </main>
    </>
  );
}
