"use client";

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { useOnboardingStore } from '@/app/store/onboardingStore';

export default function InterestsPicker() {
  const { updateData, setStep, data } = useOnboardingStore();
  const [customInterest, setCustomInterest] = useState('');

  // Predefined interests for Varkala
  const defaultInterests = [
    'Must-see Attractions',
    'Great Food',
    'Hidden Gems',
    'Varkala Cliff Beaches',
    'Varkala Coastal Cuisine',
    'Yoga and Wellness',
    'Sacred Sites',
    'Outdoor Activities',
    'Shopping for Local Crafts',
    'Adventure and Sports',
    'Arts & Theatre',
    'Culture',
  ];

  const handleInterestToggle = (interest: string) => {
    const newInterests = data.interests.includes(interest)
      ? data.interests.filter(i => i !== interest)
      : [...data.interests, interest];

    updateData({ interests: newInterests });
  };

  const handleAddCustomInterest = () => {
    if (customInterest.trim() && !data.interests.includes(customInterest)) {
      updateData({ interests: [...data.interests, customInterest.trim()] });
      setCustomInterest('');
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-4">
        Tell us what you&apos;re interested in
      </h1>
      <p className="text-gray-600 mb-8">Select all that apply.</p>

      <div className="flex flex-wrap gap-3 w-full max-w-2xl mb-8">
        {defaultInterests.map((interest) => (
          <button
            key={interest}
            onClick={() => handleInterestToggle(interest)}
            className={`px-4 py-2 rounded-full border ${
              data.interests.includes(interest)
                ? 'bg-black text-white border-black'
                : 'hover:border-gray-300'
            }`}
          >
            {interest}
          </button>
        ))}
        
        <button
          onClick={() => {
            const input = document.createElement('input');
            input.type = 'text';
            input.placeholder = 'Add custom interest';
            input.className = 'px-4 py-2 rounded-full border';
            document.body.appendChild(input);
            input.focus();
          }}
          className="px-4 py-2 rounded-full border flex items-center gap-2"
        >
          <Plus className="size-4" />
          Add interest
        </button>
      </div>

      <div className="flex justify-between w-full max-w-xl">
        <button
          onClick={() => setStep(3)}
          className="text-black underline"
        >
          Back
        </button>
        <button
          onClick={() => {
            if (data.interests.length > 0) {
              // Here you would typically save all data and redirect to chat
              console.log('Complete onboarding data:', data);
              // Router.push('/chat');
            }
          }}
          className={`px-6 py-2 rounded-full ${
            data.interests.length > 0
              ? 'bg-black text-white'
              : 'bg-gray-200 text-gray-500'
          }`}
          disabled={data.interests.length === 0}
        >
          Submit
        </button>
      </div>
    </div>
  );
}