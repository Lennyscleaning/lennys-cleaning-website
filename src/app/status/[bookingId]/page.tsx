'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

interface BookingStatus {
  bookingId: string;
  status: string;
  serviceType: string;
  scheduledDate: string;
  scheduledTime: string;
  address: string;
  city: string;
  operatorFirstName: string | null;
}

const stages = [
  { key: 'confirmed', label: 'Booking confirmed' },
  { key: 'assigned', label: 'Specialist assigned' },
  { key: 'en_route', label: 'Specialist en route' },
  { key: 'in_progress', label: 'Cleaning in progress' },
  { key: 'completed', label: 'Complete' },
];

function getStageIndex(status: string): number {
  const idx = stages.findIndex((s) => s.key === status);
  return idx >= 0 ? idx : 0;
}

function formatDate(dateStr: string): string {
  if (!dateStr) return '';
  const date = new Date(dateStr + 'T00:00:00');
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

const serviceLabels: Record<string, string> = {
  Standard: 'Standard cleaning',
  'Deep Clean': 'Deep cleaning',
  'Move-In-Out': 'Move-in / move-out',
  'Airbnb Turnover': 'Airbnb turnover',
  'Post-Construction': 'Post-construction',
};

export default function StatusPage() {
  const params = useParams();
  const bookingId = params.bookingId as string;

  const [data, setData] = useState<BookingStatus | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!bookingId) return;
    fetch(`/api/status/${encodeURIComponent(bookingId)}`)
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((json: BookingStatus) => {
        setData(json);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [bookingId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-warm-white flex items-center justify-center px-5">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-forest border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="font-body text-sm text-charcoal-light">Loading booking status...</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-warm-white flex items-center justify-center px-5">
        <div className="text-center max-w-[400px]">
          <div className="w-14 h-14 rounded-full bg-cream flex items-center justify-center mx-auto mb-5">
            <svg className="w-7 h-7 text-charcoal-light" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
            </svg>
          </div>
          <h1 className="font-display font-semibold text-2xl text-charcoal mb-2">
            Booking not found
          </h1>
          <p className="font-body text-[15px] text-charcoal-light leading-relaxed mb-6">
            We couldn&apos;t find a booking with that ID. If you just booked, it may take a moment to appear. Otherwise, please check the link in your confirmation message.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-forest font-medium text-[15px] hover:text-forest-dark transition-colors"
          >
            Go to homepage
            <span aria-hidden="true"> &rarr;</span>
          </Link>
        </div>
      </div>
    );
  }

  const currentStage = getStageIndex(data.status);
  const isCancelled = data.status === 'cancelled';

  return (
    <div className="min-h-screen bg-warm-white">
      <div className="max-w-[480px] mx-auto px-5 pt-10 pb-16">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-forest font-medium text-sm hover:text-forest-dark transition-colors mb-6"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
            Lenny&apos;s Cleaning
          </Link>
          <h1 className="font-display font-semibold text-2xl text-charcoal mb-1">
            Booking status
          </h1>
          <p className="font-body text-sm text-charcoal-light">
            {data.bookingId}
          </p>
        </div>

        {/* Cancelled state */}
        {isCancelled ? (
          <div className="bg-red-50 border border-red-200 rounded-md p-5 mb-8">
            <p className="font-body text-sm font-medium text-red-700">
              This booking has been cancelled.
            </p>
            <p className="font-body text-sm text-red-600 mt-1">
              Questions? Email us at{' '}
              <a href="mailto:hello@lennyscleaning.com" className="underline">
                hello@lennyscleaning.com
              </a>
            </p>
          </div>
        ) : (
          /* Status stepper */
          <div className="mb-8">
            <div className="flex flex-col">
              {stages.map((stage, i) => {
                const isComplete = i < currentStage;
                const isCurrent = i === currentStage;
                const isFuture = i > currentStage;

                return (
                  <div key={stage.key} className="flex gap-4">
                    {/* Vertical line + circle */}
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                          isComplete
                            ? 'bg-forest'
                            : isCurrent
                              ? 'bg-forest ring-4 ring-forest/20'
                              : 'bg-cream-dark'
                        }`}
                      >
                        {isComplete ? (
                          <svg className="w-4 h-4 text-warm-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                          </svg>
                        ) : (
                          <span
                            className={`font-body text-xs font-bold ${
                              isCurrent ? 'text-warm-white' : 'text-charcoal-light/50'
                            }`}
                          >
                            {i + 1}
                          </span>
                        )}
                      </div>
                      {/* Connector line */}
                      {i < stages.length - 1 && (
                        <div
                          className={`w-0.5 flex-1 min-h-[32px] ${
                            isComplete ? 'bg-forest' : 'bg-cream-dark'
                          }`}
                        />
                      )}
                    </div>

                    {/* Label + detail */}
                    <div className={`pb-6 ${i === stages.length - 1 ? 'pb-0' : ''}`}>
                      <p
                        className={`font-body text-[15px] font-medium leading-8 ${
                          isFuture ? 'text-charcoal-light/50' : 'text-charcoal'
                        }`}
                      >
                        {stage.label}
                      </p>
                      {/* Show operator name on assigned+ stages */}
                      {stage.key === 'assigned' && data.operatorFirstName && !isFuture && (
                        <p className="font-body text-sm text-charcoal-light mt-0.5">
                          Your specialist: {data.operatorFirstName}
                        </p>
                      )}
                      {/* Current stage indicator */}
                      {isCurrent && (
                        <span className="inline-flex items-center gap-1.5 mt-1 px-2.5 py-0.5 rounded-full bg-forest/10 text-forest text-xs font-medium">
                          <span className="w-1.5 h-1.5 rounded-full bg-forest animate-pulse" />
                          Current
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Booking details */}
        <div className="bg-cream/50 rounded-md p-5">
          <h2 className="font-body font-semibold text-sm text-charcoal mb-3 uppercase tracking-wide">
            Booking details
          </h2>
          {data.serviceType && (
            <div className="flex justify-between py-2 border-b border-cream-dark">
              <span className="font-body text-sm text-charcoal-light">Service</span>
              <span className="font-body text-sm font-medium text-charcoal">
                {serviceLabels[data.serviceType] ?? data.serviceType}
              </span>
            </div>
          )}
          {data.scheduledDate && (
            <div className="flex justify-between py-2 border-b border-cream-dark">
              <span className="font-body text-sm text-charcoal-light">Date</span>
              <span className="font-body text-sm font-medium text-charcoal">
                {formatDate(data.scheduledDate)}
              </span>
            </div>
          )}
          {data.scheduledTime && (
            <div className="flex justify-between py-2 border-b border-cream-dark">
              <span className="font-body text-sm text-charcoal-light">Time</span>
              <span className="font-body text-sm font-medium text-charcoal">
                {data.scheduledTime}
              </span>
            </div>
          )}
          {data.address && (
            <div className="flex justify-between py-2">
              <span className="font-body text-sm text-charcoal-light">Address</span>
              <span className="font-body text-sm font-medium text-charcoal text-right">
                {data.address}{data.city ? `, ${data.city}` : ''}
              </span>
            </div>
          )}
        </div>

        {/* Help */}
        <div className="mt-6 text-center">
          <p className="font-body text-sm text-charcoal-light">
            Questions about your booking?
          </p>
          <a
            href="mailto:hello@lennyscleaning.com"
            className="inline-flex items-center gap-1.5 mt-1 text-forest font-medium text-sm hover:text-forest-dark transition-colors"
          >
            hello@lennyscleaning.com
          </a>
        </div>
      </div>
    </div>
  );
}
