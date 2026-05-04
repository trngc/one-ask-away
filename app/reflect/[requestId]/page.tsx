"use client";

import { use, useState } from "react";
import { useRouter } from "next/navigation";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";

import { BackHeader } from "@/components/oaa/BackHeader";
import { Avatar } from "@/components/oaa/Avatar";
import { ChipPicker } from "@/components/oaa/ChipPicker";
import { PrimaryButton } from "@/components/oaa/buttons";
import { MOCK_REQUESTS, STUDENT } from "@/lib/mock-student";
import { reflectionStore } from "@/lib/reflection-store";

type Props = { params: Promise<{ requestId: string }> };

const OUTCOME_TAGS = [
  "Got specific advice",
  "Heard a new perspective",
  "Clarified my next step",
  "Got a referral or intro",
  "Identified a gap to work on",
  "Got resources to follow up on",
  "Validated my direction",
  "Built rapport for follow-up",
  "Found a new direction",
];

const FOLLOW_UP_OPTIONS = [
  "Definitely — I have a clear next ask",
  "Maybe — if something specific comes up",
  "Not yet — I need to do the work first",
  "No — we covered what I needed",
  "Not sure yet",
];

export default function ReflectPage({ params }: Props) {
  const { requestId } = use(params);
  const found = MOCK_REQUESTS.find((r) => r.id === requestId);
  if (!found) notFound();
  const req = found;

  const router = useRouter();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [followUpIntent, setFollowUpIntent] = useState<string | null>(null);
  const [note, setNote] = useState("");

  const firstName = req.alumniName.split(" ")[0];

  function handleSave() {
    reflectionStore.add({
      alumniId: req.alumniId,
      alumniName: req.alumniName,
      alumniRole: req.alumniRole,
      alumniCompany: req.alumniCompany,
      topic: req.topic,
      helpful: followUpIntent ?? "",
      note,
      savedAt: new Date(),
    });
    router.push("/past-contacts");
  }

  return (
    <div className="min-h-screen bg-oaa-bg">
      {/* Screen status strip — matches /requests/[id] screenLabel pattern */}
      <div className="border-b border-oaa-hairline bg-white px-8 py-2">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between">
          <span className="font-mono text-[10px] tracking-[0.08em] uppercase text-oaa-muted">
            20 · Reflection
          </span>
          <span className="font-mono text-[10px] tracking-[0.08em] uppercase text-oaa-muted">
            Student · match → ask → outcome → reflect
          </span>
        </div>
      </div>

      <BackHeader
        backHref={`/requests/${requestId}`}
        backLabel="Back to request"
        rightContent={<Avatar variant="student" name={STUDENT.name} size="sm" />}
      />

      <main className="mx-auto max-w-[720px] px-8 pt-10 pb-24">
        {/* Page header */}
        <div className="mb-8">
          <p className="mb-3 font-mono text-[11px] tracking-[0.08em] uppercase text-oaa-muted">
            20 · Reflection
          </p>
          <h1 className="text-[40px] font-semibold leading-[1.15] tracking-[-0.01em] text-oaa-ink">
            How did it go?
          </h1>
          <p className="mt-2 text-[15px] text-oaa-muted">
            Your reflection stays in your space.
          </p>
        </div>

        {/* Context strip */}
        <div className="mb-10 rounded-md border border-oaa-hairline bg-white p-5">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Avatar variant="alumnus" name={req.alumniName} size="md" />
              <div>
                <p className="text-[15px] font-semibold text-oaa-ink">
                  {req.alumniName}
                </p>
                <p className="text-[13px] text-oaa-muted">
                  {req.alumniRole} · {req.alumniCompany}
                </p>
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <span className="rounded-xs border border-oaa-hairline bg-white px-2 py-0.5 text-[12px] text-oaa-ink">
                {req.topic}
              </span>
              <span className="text-[12px] text-oaa-muted">Today</span>
            </div>
          </div>
        </div>

        {/* Section 1 — What stood out */}
        <div>
          <p className="font-mono text-[11px] tracking-[0.08em] uppercase text-oaa-muted">
            What stood out
          </p>
          <p className="mt-1 text-[13px] text-oaa-muted">
            Pick what&rsquo;s true, skip what isn&rsquo;t.
          </p>
          <div className="mt-3">
            <ChipPicker
              options={OUTCOME_TAGS}
              value={selectedTags}
              onChange={setSelectedTags}
            />
          </div>
        </div>

        {/* Section 2 — Follow-up intent */}
        <div className="mt-10">
          <p className="font-mono text-[11px] tracking-[0.08em] uppercase text-oaa-muted">
            Follow-up
          </p>
          <p className="mt-2 text-[20px] font-semibold leading-[1.2] text-oaa-ink">
            How likely are you to reach back out to {firstName}?
          </p>
          <div className="mt-3 flex flex-col gap-2">
            {FOLLOW_UP_OPTIONS.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => setFollowUpIntent(opt)}
                className={`flex w-full items-center justify-between rounded-md border px-4 py-3 text-left text-[14px] leading-[1.45] transition-colors ${
                  followUpIntent === opt
                    ? "border-oaa-clay-tint-border bg-oaa-clay-tint-bg text-oaa-ink"
                    : "border-oaa-hairline bg-white text-oaa-ink hover:border-oaa-ink/30"
                }`}
              >
                <span>{opt}</span>
                {followUpIntent === opt && (
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

        {/* Section 3 — Optional notes */}
        <div className="mt-10">
          <p className="font-mono text-[11px] tracking-[0.08em] uppercase text-oaa-muted">
            Anything else?
          </p>
          <p className="mt-1 text-[13px] text-oaa-muted">Only you see this.</p>
          <textarea
            className="mt-3 w-full resize-none rounded-sm border border-oaa-hairline bg-white px-4 py-3 text-[14px] text-oaa-ink placeholder:text-oaa-muted/50 focus:border-oaa-ink/30 focus:outline-none"
            rows={4}
            placeholder="Add a private note&hellip;"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>

        {/* AI next step card */}
        <div className="mt-10 rounded-md border border-oaa-clay-tint-border bg-oaa-clay-tint-bg px-6 py-5">
          <p className="mb-2 font-mono text-[11px] tracking-[0.08em] uppercase text-oaa-clay">
            Suggested next step
          </p>
          <p className="text-[15px] text-oaa-ink">
            Follow up with {firstName} in 4 weeks with a portfolio update.
          </p>
        </div>
      </main>

      {/* Sticky save bar */}
      <div className="fixed bottom-0 left-0 right-0 z-10 border-t border-oaa-hairline bg-white px-8 py-4">
        <div className="mx-auto flex max-w-[720px] items-center justify-end">
          <PrimaryButton
            type="button"
            onClick={handleSave}
            disabled={!followUpIntent}
          >
            Save reflection
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}
