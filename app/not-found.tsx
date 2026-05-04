import Link from "next/link";

import { Header } from "@/components/oaa/Header";
import { EmptyState } from "@/components/oaa/EmptyState";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-oaa-bg">
      <Header />

      <main className="mx-auto max-w-[720px] px-8 py-32">
        <EmptyState
          eyebrow="404"
          heading="This page doesn't exist."
          subtitle="The link may be broken or the page may have moved."
          ctaLabel="Go home"
          ctaHref="/"
        />
      </main>
    </div>
  );
}
