"use client";

import { BackHeader } from "@/components/oaa/BackHeader";
import { Avatar } from "@/components/oaa/Avatar";
import { EmptyState } from "@/components/oaa/EmptyState";
import { STUDENT } from "@/lib/mock-student";

export default function StudentInboxPage() {
  return (
    <div className="min-h-screen bg-oaa-bg">
      <BackHeader
        backHref="/home"
        backLabel="Back to home"
        rightContent={<Avatar variant="student" name={STUDENT.name} size="sm" />}
      />

      <main className="mx-auto max-w-[720px] px-8 py-12">
        <div className="mb-8">
          <p className="mb-3 font-mono text-[11px] tracking-[0.08em] uppercase text-oaa-muted">
            Student inbox
          </p>
          <h1 className="text-[40px] font-semibold leading-[1.15] tracking-[-0.01em] text-oaa-ink">
            Inbox
          </h1>
        </div>

        <EmptyState
          eyebrow="Starting out"
          heading="Nothing in your inbox yet."
          subtitle="When alumni respond to your asks or send updates, you'll see them here."
        />
      </main>
    </div>
  );
}
