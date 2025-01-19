"use client";
import { useState } from 'react';

import { addDays, isAfter, isBefore } from 'date-fns';
import { useOnboardingStore } from '@/app/store/onboardingStore';
import { Calendar } from '../ui/calendar';

export default function DatePicker() {
  const { updateData, setStep } = useOnboardingStore();
  const [selectedRange, setSelectedRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: undefined,
    to: undefined,
  });

  // Calculate the maximum allowed date (7 days from start date)
  const maxSelectableDate = selectedRange.from 
    ? addDays(selectedRange.from, 7) 
    : undefined;

  // Handle date selection and validation
  const handleSelect = (value: any) => {
    setSelectedRange(value);
    
    // Only proceed if both dates are selected
    if (value.from && value.to) {
      updateData({
        dateRange: {
          startDate: value.from,
          endDate: value.to,
        },
      });
      setStep(3);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-4">When are you going?</h1>
      <p className="text-gray-600 mb-8">Choose a date range, up to 7 days.</p>

      <div className="flex gap-8 justify-center">
        <Calendar
          mode="range"
          selected={selectedRange}
          onSelect={handleSelect}
          numberOfMonths={2}
          disabled={(date) => 
            isBefore(date, new Date()) || 
            (selectedRange.from && maxSelectableDate ? isAfter(date, maxSelectableDate) : false)
          }
          className="rounded-lg border shadow"
        />
      </div>

      {/* <button
        onClick={() => setStep(2)}
        className="mt-8 text-black underline"
      >
        I don&apos;t know my dates yet
      </button> */}

      <div className="mt-8 flex justify-between w-full max-w-xl">
        <button
          onClick={() => setStep(1)}
          className="text-black underline"
        >
          Back
        </button>
        <button
          onClick={() => selectedRange.from && selectedRange.to && setStep(3)}
          className={`px-6 py-2 rounded-full ${
            selectedRange.from && selectedRange.to
              ? 'bg-black text-white'
              : 'bg-gray-200 text-gray-500'
          }`}
          disabled={!selectedRange.from || !selectedRange.to}
        >
          Next
        </button>
      </div>
    </div>
  );
}
