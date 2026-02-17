import type { BookingFormData, TimeSlot } from '../lib/types';
import { inputBase } from '../lib/types';

const timeSlots: TimeSlot[] = [
  '8:00 AM',
  '8:30 AM',
  '9:00 AM',
  '9:30 AM',
  '10:00 AM',
  '10:30 AM',
  '11:00 AM',
  '11:30 AM',
  '12:00 PM',
  '12:30 PM',
  '1:00 PM',
  '1:30 PM',
  '2:00 PM',
  '2:30 PM',
  '3:00 PM',
];

function getTodayString(): string {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

function isSunday(dateStr: string): boolean {
  const [year, month, day] = dateStr.split('-').map(Number);
  const d = new Date(year, month - 1, day);
  return d.getDay() === 0;
}

interface Props {
  data: BookingFormData;
  onChange: (updates: Partial<BookingFormData>) => void;
}

export default function Step4Schedule({ data, onChange }: Props) {
  const handleDateChange = (value: string) => {
    if (isSunday(value)) return;
    onChange({ date: value });
  };

  return (
    <div>
      <h2 className="font-display font-semibold text-2xl text-charcoal mb-2">
        When works best?
      </h2>
      <p className="font-body text-[15px] text-charcoal-light mb-6">
        Pick a date and preferred start time. We don&apos;t clean on Sundays.
      </p>
      <div className="space-y-6">
        <div>
          <label htmlFor="date" className="block font-body text-sm font-medium text-charcoal mb-2">
            Date
          </label>
          <input
            type="date"
            id="date"
            value={data.date}
            min={getTodayString()}
            onChange={(e) => handleDateChange(e.target.value)}
            className={inputBase}
          />
          {data.date && isSunday(data.date) && (
            <p className="font-body text-sm text-error mt-1">
              We don&apos;t clean on Sundays. Please choose another day.
            </p>
          )}
        </div>

        <div>
          <span className="block font-body text-sm font-medium text-charcoal mb-2">
            Preferred start time
          </span>
          <div className="flex flex-wrap gap-2">
            {timeSlots.map((slot) => {
              const selected = data.timeSlot === slot;
              return (
                <button
                  key={slot}
                  type="button"
                  onClick={() => onChange({ timeSlot: slot })}
                  className={`px-3 py-2 rounded-md font-body text-sm font-medium transition-all duration-200 ${
                    selected
                      ? 'bg-forest text-warm-white'
                      : 'bg-cream text-charcoal hover:bg-cream-dark'
                  }`}
                >
                  {slot}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
