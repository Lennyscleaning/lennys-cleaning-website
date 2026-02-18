'use client';

import { useState } from 'react';

/* ─── Constants ─── */

const DAYS = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

function generateTimeSlots(): { value: string; label: string }[] {
  const slots: { value: string; label: string }[] = [];
  for (let hour = 6; hour <= 20; hour++) {
    for (let min = 0; min < 60; min += 30) {
      if (hour === 20 && min > 0) break;
      const h24 = String(hour).padStart(2, '0');
      const m = String(min).padStart(2, '0');
      const value = `${h24}:${m}`;
      const h12 = hour > 12 ? hour - 12 : hour;
      const ampm = hour >= 12 ? 'PM' : 'AM';
      const label = `${h12}:${m.padStart(2, '0')} ${ampm}`;
      slots.push({ value, label });
    }
  }
  return slots;
}

const TIME_SLOTS = generateTimeSlots();

/* ─── Types ─── */

interface DayAvailability {
  day: string;
  isAvailable: boolean;
  startTime: string;
  endTime: string;
}

type Step = 'phone' | 'availability';

/* ─── Component ─── */

export default function AvailabilityForm() {
  const [step, setStep] = useState<Step>('phone');
  const [phone, setPhone] = useState('');
  const [contractorId, setContractorId] = useState('');
  const [contractorName, setContractorName] = useState('');
  const [availability, setAvailability] = useState<DayAvailability[]>(
    DAYS.map((day) => ({
      day,
      isAvailable: false,
      startTime: '08:00',
      endTime: '17:00',
    })),
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  async function handleLookup(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/pro/lookup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Something went wrong');
        return;
      }

      if (!data.found) {
        setError(
          "We couldn\u2019t find an account with that number. Contact us at hello@lennyscleaning.com if you think this is an error.",
        );
        return;
      }

      setContractorId(data.contractorId);
      setContractorName(data.contractorName);

      // Pre-populate with existing availability
      if (data.availability && data.availability.length > 0) {
        const merged = DAYS.map((day) => {
          const existing = data.availability.find(
            (a: DayAvailability) => a.day === day,
          );
          return (
            existing || {
              day,
              isAvailable: false,
              startTime: '08:00',
              endTime: '17:00',
            }
          );
        });
        setAvailability(merged);
      }

      setStep('availability');
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  function updateDay(index: number, updates: Partial<DayAvailability>) {
    setAvailability((prev) =>
      prev.map((day, i) => (i === index ? { ...day, ...updates } : day)),
    );
  }

  async function handleSave() {
    setError('');
    setSuccess(false);
    setLoading(true);

    try {
      const res = await fetch('/api/pro/availability', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contractorId, availability }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Failed to save availability');
        return;
      }

      setSuccess(true);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    'w-full bg-warm-white border border-cream-dark rounded-sm px-4 py-3 font-body text-[15px] text-charcoal placeholder:text-charcoal-light/50 focus:outline-none focus:ring-2 focus:ring-forest/30 focus:border-forest transition-colors duration-200';

  const selectClass =
    'flex-1 bg-warm-white border border-cream-dark rounded-sm px-3 py-2.5 font-body text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-forest/30 focus:border-forest transition-colors duration-200';

  return (
    <div className="min-h-screen bg-warm-white">
      <div className="max-w-[480px] mx-auto px-5 pt-[120px] pb-20">
        {/* ══════ PHONE LOOKUP ══════ */}
        {step === 'phone' && (
          <form onSubmit={handleLookup}>
            <p className="overline mb-3">OPERATOR PORTAL</p>
            <h1 className="font-display font-semibold text-charcoal leading-[1.1] tracking-tight mb-3 text-[clamp(28px,5vw,40px)]">
              Set your availability
            </h1>
            <p className="font-body text-[17px] text-charcoal-light leading-relaxed mb-8">
              Enter your phone number to manage your weekly schedule.
            </p>

            <label className="block font-body text-sm font-medium text-charcoal mb-2">
              Phone number
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="(253) 555-1234"
              className={`${inputClass} mb-6`}
              autoFocus
              required
            />

            {error && (
              <div className="bg-error/10 border border-error/20 rounded-sm px-4 py-3 mb-6">
                <p className="font-body text-sm text-error leading-relaxed">
                  {error}
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !phone.trim()}
              className="btn-secondary w-full text-base py-4 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Looking up\u2026' : 'Continue'}
            </button>
          </form>
        )}

        {/* ══════ AVAILABILITY GRID ══════ */}
        {step === 'availability' && (
          <div>
            <p className="overline mb-3">YOUR SCHEDULE</p>
            <h1 className="font-display font-semibold text-charcoal leading-[1.1] tracking-tight mb-2 text-[clamp(24px,5vw,36px)]">
              Hi, {contractorName || 'there'}
            </h1>
            <p className="font-body text-[16px] text-charcoal-light leading-relaxed mb-8">
              Toggle each day on or off and set the hours you&apos;re available
              for jobs.
            </p>

            <div className="space-y-3">
              {availability.map((day, i) => (
                <div
                  key={day.day}
                  className={`rounded-md border transition-colors duration-200 ${
                    day.isAvailable
                      ? 'border-forest/20 bg-forest/[0.03]'
                      : 'border-cream-dark bg-cream/50'
                  }`}
                >
                  {/* Day header + toggle */}
                  <div className="flex items-center justify-between px-4 py-3.5">
                    <span
                      className={`font-body font-medium text-[15px] ${
                        day.isAvailable ? 'text-charcoal' : 'text-charcoal-light'
                      }`}
                    >
                      {day.day}
                    </span>
                    <button
                      type="button"
                      role="switch"
                      aria-checked={day.isAvailable}
                      aria-label={`Toggle ${day.day}`}
                      onClick={() =>
                        updateDay(i, { isAvailable: !day.isAvailable })
                      }
                      className={`relative w-11 h-6 rounded-full transition-colors duration-200 shrink-0 ${
                        day.isAvailable ? 'bg-forest' : 'bg-gray-l'
                      }`}
                    >
                      <span
                        className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200 ${
                          day.isAvailable ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>

                  {/* Time range (visible when available) */}
                  {day.isAvailable && (
                    <div className="flex items-center gap-2 px-4 pb-4">
                      <select
                        value={day.startTime}
                        onChange={(e) =>
                          updateDay(i, { startTime: e.target.value })
                        }
                        aria-label={`${day.day} start time`}
                        className={selectClass}
                      >
                        {TIME_SLOTS.map((slot) => (
                          <option key={slot.value} value={slot.value}>
                            {slot.label}
                          </option>
                        ))}
                      </select>
                      <span className="font-body text-sm text-charcoal-light shrink-0">
                        to
                      </span>
                      <select
                        value={day.endTime}
                        onChange={(e) =>
                          updateDay(i, { endTime: e.target.value })
                        }
                        aria-label={`${day.day} end time`}
                        className={selectClass}
                      >
                        {TIME_SLOTS.map((slot) => (
                          <option key={slot.value} value={slot.value}>
                            {slot.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Messages */}
            {error && (
              <div className="bg-error/10 border border-error/20 rounded-sm px-4 py-3 mt-6">
                <p className="font-body text-sm text-error leading-relaxed">
                  {error}
                </p>
              </div>
            )}

            {success && (
              <div className="bg-success/10 border border-success/20 rounded-sm px-4 py-3 mt-6">
                <p className="font-body text-sm text-success leading-relaxed">
                  Your availability has been updated. You&apos;ll receive job
                  offers during your available hours.
                </p>
              </div>
            )}

            {/* Save button */}
            <button
              type="button"
              onClick={handleSave}
              disabled={loading}
              className="btn-secondary w-full text-base py-4 mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Saving\u2026' : 'Save availability'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
