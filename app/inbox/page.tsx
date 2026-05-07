import { AlumnusNav } from "@/components/oaa/AlumnusNav";
import { LiveCallBanner } from "@/components/oaa/LiveCallBanner";
import { InboxRowHome } from "@/components/oaa/InboxRowHome";
import { UpcomingCallCard } from "@/components/oaa/UpcomingCallCard";
import { PENDING_REQUESTS, UPCOMING_CALLS } from "@/lib/mock-inbox";
import Link from "next/link";

// For demo: show the live banner for Anik's call (12 min away)
const IMMINENT_CALL = UPCOMING_CALLS.find((r) => r.id === "inbox-anik");

export default function AlumnusInboxHome() {
  return (
    <>
      <AlumnusNav active="inbox" unreadCount={PENDING_REQUESTS.length} />

      <main className="mx-auto max-w-[1200px] px-8 pb-32 pt-12">
        {/* Greeting */}
        <h1 className="mb-8 font-sans text-[40px] font-semibold leading-[1.05] tracking-[-0.01em] text-oaa-ink">
          Hi Adam.
        </h1>

        {/* Live call banner */}
        {IMMINENT_CALL && (
          <div className="mb-8">
            <LiveCallBanner
              minutesUntil={12}
              studentName={IMMINENT_CALL.student.name}
              topic={IMMINENT_CALL.topic}
            />
          </div>
        )}

        {/* Pending inbox */}
        <section className="mb-12">
          <div className="mb-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <h2 className="text-[20px] font-semibold text-oaa-ink">Inbox</h2>
              {PENDING_REQUESTS.length > 0 && (
                <span className="rounded-full bg-oaa-clay px-2.5 py-0.5 font-mono text-[11px] leading-none text-white">
                  {PENDING_REQUESTS.length} pending
                </span>
              )}
            </div>
            <Link
              href="/inbox/all"
              className="text-[14px] font-medium text-oaa-ink transition-colors hover:text-oaa-ink/70"
            >
              View all →
            </Link>
          </div>

          {PENDING_REQUESTS.length > 0 ? (
            <div className="flex flex-col gap-2">
              {PENDING_REQUESTS.map((req) => (
                <InboxRowHome key={req.id} request={req} />
              ))}
            </div>
          ) : (
            <p className="text-[14px] text-oaa-muted">No pending requests.</p>
          )}
        </section>

        {/* Upcoming calls */}
        {UPCOMING_CALLS.length > 0 && (
          <section>
            <h2 className="mb-4 text-[20px] font-semibold text-oaa-ink">Upcoming calls</h2>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {UPCOMING_CALLS.map((req) => (
                <UpcomingCallCard
                  key={req.id}
                  request={req}
                  isImminent={req.id === IMMINENT_CALL?.id}
                />
              ))}
            </div>
          </section>
        )}

        {/* Past students shortcut */}
        <div className="mt-12 rounded-md border border-oaa-hairline bg-white px-5 py-4 flex items-center justify-between gap-4">
          <div>
            <p className="text-[14px] font-medium text-oaa-ink">Past students</p>
            <p className="text-[13px] text-oaa-muted">
              Your post-call notes and reflections.
            </p>
          </div>
          <Link
            href="/past-students"
            className="shrink-0 text-[14px] font-medium text-oaa-ink transition-colors hover:text-oaa-ink/70"
          >
            View all →
          </Link>
        </div>

        {/* Low-availability nudge */}
        <div className="mt-4 rounded-md border border-oaa-hairline bg-white px-5 py-4">
          <p className="text-[14px] text-oaa-muted">
            You have{" "}
            <span className="font-medium text-oaa-ink">6 slots open</span> this
            week.{" "}
            <Link
              href="/profile/alumnus"
              className="text-oaa-clay underline underline-offset-2 transition-colors hover:text-oaa-clay/80"
            >
              Update availability
            </Link>
          </p>
        </div>
      </main>
    </>
  );
}
