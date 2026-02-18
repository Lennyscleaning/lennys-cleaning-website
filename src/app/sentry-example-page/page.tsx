"use client";

import * as Sentry from "@sentry/nextjs";

export default function SentryExamplePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-warm-white">
      <div className="text-center">
        <h1 className="font-display text-2xl font-semibold text-charcoal mb-6">
          Sentry test page
        </h1>
        <button
          type="button"
          className="btn-primary px-6 py-3"
          onClick={async () => {
            await Sentry.startSpan(
              { name: "Example Frontend Span", op: "test" },
              async () => {
                const res = await fetch("/api/sentry-example-api");
                if (!res.ok) {
                  throw new Error("Sentry Example Frontend Error");
                }
              },
            );
          }}
        >
          Throw test error
        </button>
      </div>
    </div>
  );
}
