"use client";

import { use, useState } from "react";
import { useRouter } from "next/navigation";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";

import { BackHeader } from "@/components/oaa/BackHeader";
import { Avatar } from "@/components/oaa/Avatar";
import { ChipPicker } from "@/components/oaa/ChipPicker";
import { PrimaryButton } from "@/components/oaa/buttons";
import { getInboxRequest } from "@/lib/mock-inbox";
import { alumnusNotesStore } from "@/lib/alumnus-notes-store";

type Props = { params: Promise<{ requestId: string }> };

const STRENGTH_TAGS = [
  "Strong communicator",
  "Clear goals",
  "Coachable",
  "Well-prepared",
  "Self-aware",
  "Technical aptitude",
  "Entrepreneurial",
  "Growth mindset",
  "Good follow-through",
];

const HIRING_SIGNAL_OPTIONS = [
  "I'd refer this person",
  "Strong candidate — keep an eye on",
  "Promising — needs more experience",
  "Not a fit for my network",
  "Too early to tell",
];

export default function PostCallNotesPage({ params }: Props) {
  const { requestId } = use(params);
  const found = getInboxRequest(requestId);
  if (!found) notFound();
  const req = found;

  const router = useRouter();
  const [strengthTags, setStrengthTags] = useState<string[]>([]);
  const [hiringSignal, setHiringSignal] = useState<string | null>(null);
  const [privateNotes, setPrivateNotes] = useState("");

  const student = req.student;

  function handleSave() {
    alumnusNotesStore.add({
      studentId: requestId,
      studentName: student.name,
      studentProgram: student.program,
      studentCohort: student.cohort,
      topic: req.topic,
      strengthTags,
      hiringSignal: hiringSignal ?? "",
      privateNotes,
      savedAt: new Date(),
    });
    router.push("/past-students");
  }

  return (
    <div className="min-h-screen bg-oaa-bg">
      {/* Screen status strip */}
      <div className="border-b border-oaa-hairline bg-white px-8 py-2">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between">
          <span className="font-mono text-[10px] tracking-[0.08em] uppercase text-oaa-muted">
            34 · Post-call notes
          </span>
          <span className="font-mono text-[10px] tracking-[0.08em] uppercase text-oaa-muted">
            Alumnus · receive → respond → reflect
          </span>
        </div>
      </div>

      <BackHeader
        backHref={`/inbox/${requestId}`}
        backLabel="Back to request"
        rightContent={
          <Avatar variant="alumnus-self" name="Adam Farouk" size="sm" />
        }
      />

      <main className="mx-auto max-w-[720px] px-8 pt-10 pb-24">
        {/* Page header */}
        <div className="mb-8">
          <p className="mb-3 font-mono text-[11px] tracking-[0.08em] uppercase text-oaa-muted">
            34 · Post-call notes
          </p>
          <h1 className="text-[40px] font-semibold leading-[1.15] tracking-[-0.01em] text-oaa-ink">
            How did the call go?
          </h1>
          <p className="mt-2 text-[15px] text-oaa-muted">
            These notes are private to you.
          </p>
        </div>

        {/* Context strip */}
        <div className="mb-10 rounded-md border border-oaa-hairline bg-white p-5">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Avatar variant="student" name={student.name} size="md" />
              <div>
                <p className="text-[15px] font-semibold text-oaa-ink">
                  {student.name}
                </p>
                <p className="text-[13px] text-oaa-muted">
                  {student.program} · {student.cohort}
                </p>
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <span className="rounded-xs border border-oaa-hairline bg-white px-2 py-0.5 text-[12px] text-oaa-ink">
                {req.topic}
              </span>
              {req.scheduledTime && (
                <span className="text-[12px] text-oaa-muted">
                  {req.scheduledTime}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Section 1 — Strength tags */}
        <div>
          <p className="font-mono text-[11px] tracking-[0.08em] uppercase text-oaa-muted">
            What stood out?
          </p>
          <p className="mt-1 text-[13px] text-oaa-muted">
            Pick what&rsquo;s true, skip what isn&rsquo;t.
          </p>
          <div className="mt-3">
            <ChipPicker
              options={STRENGTH_TAGS}
              value={strengthTags}
              onChange={setStrengthTags}
            />
          </div>
        </div>

        {/* Section 2 — Hiring signal */}
        <div className="mt-10">
          <p className="font-mono text-[11px] tracking-[0.08em] uppercase text-oaa-muted">
            Hiring signal?
          </p>
          <div className="mt-3 flex flex-col gap-2">
            {HIRING_SIGNAL_OPTIONS.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => setHiringSignal(opt)}
                className={`flex w-full items-center justify-between rounded-md border px-4 py-3 text-left text-[14px] leading-[1.45] transition-colors ${
                  hiringSignal === opt
                    ? "border-oaa-clay-tint-border bg-oaa-clay-tint-bg text-oaa-ink"
                    : "border-oaa-hairline bg-white text-oaa-ink hover:border-oaa-ink/30"
                }`}
              >
                <span>{opt}</span>
                {hiringSignal === opt && (
                  <Check
                    className="ml-3 h-4 w-4 shrink-0 text-oaa-clay"
                    strokeWidth={2}
                    aria-hidden
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Section 3 — Private notes */}
        <div className="mt-10">
          <p className="font-mono text-[11px] tracking-[0.08em] uppercase text-oaa-muted">
            Private notes
          </p>
          <p className="mt-1 text-[13px] text-oaa-muted">Only you see this.</p>
          <textarea
            className="mt-3 w-full resize-none rounded-sm border border-oaa-hairline bg-white px-4 py-3 text-[14px] text-oaa-ink placeholder:text-oaa-muted/50 focus:border-oaa-ink/30 focus:outline-none"
            rows={4}
            placeholder="Add a private note&hellip;"
            value={privateNotes}
            onChange={(e) => setPrivateNotes(e.target.value)}
          />
        </div>
      </main>

      {/* Sticky save bar */}
      <div className="fixed bottom-0 left-0 right-0 z-10 border-t border-oaa-hairline bg-white px-8 py-4">
        <div className="mx-auto flex max-w-[720px] items-center justify-end">
          <PrimaryButton
            type="button"
            onClick={handleSave}
            disabled={!hiringSignal}
          >
            Save to past students
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}
