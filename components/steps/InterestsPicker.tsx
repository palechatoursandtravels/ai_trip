"use client";

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { useOnboardingStore } from '@/app/store/onboardingStore';
import { useRouter } from 'next/navigation';
import { OnboardingData, saveOnboardingData } from '@/lib/onboarding';
import { toast } from 'sonner';

export default function InterestsPicker() {
  const { updateData, setStep, data } = useOnboardingStore();
  const [customInterest, setCustomInterest] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

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

  // Get custom interests (interests that aren't in defaultInterests)
  const customInterests = data.interests.filter(
    interest => !defaultInterests.includes(interest)
  );

  const handleInterestToggle = (interest: string) => {
    const newInterests = data.interests.includes(interest)
      ? data.interests.filter(i => i !== interest)
      : [...data.interests, interest];
    updateData({ interests: newInterests });
  };

  const handleAddCustomInterest = () => {
    const trimmedInterest = customInterest.trim();
    
    if (!trimmedInterest) {
      return;
    }
    
    if (data.interests.includes(trimmedInterest)) {
     
      return;
    }

    // Create a new array with the existing interests plus the new one
    const updatedInterests = [...data.interests, trimmedInterest];

    
    // Update the store with the new interests array
    updateData({ interests: updatedInterests });
    
    // Reset the input and hide it
    setCustomInterest('');
    setShowCustomInput(false);
  };

  const isDataComplete = (data: OnboardingData) => {
    return data.destination.name &&
      data.destination.placeId &&
      data.dateRange.startDate &&
      data.dateRange.endDate &&
      data.tripType.type &&
      data.interests.length > 0;
  };

  const handleSubmit = async () => {
    if (data.interests.length > 0 && !isSubmitting) {
      setIsSubmitting(true);
      try {
        // Ensure all required data is present
        if (!isDataComplete(data)) {
          toast.error("Please complete all required information");
          return;
        }
        
        await saveOnboardingData(data);
        toast.success("Great! Redirecting To your Planner!");
        setTimeout(() => {
          router.push("/");
        }, 2000);
      } catch (error) {
        console.error('Error saving onboarding data:', error);
        toast.error("Something went wrong. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };
  
  // Helper function for the component


  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAddCustomInterest();
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
        
        {/* Custom interests */}
        {customInterests.map((interest) => (
          <button
            key={`custom-${interest}`}
            onClick={() => handleInterestToggle(interest)}
            className="px-4 py-2 rounded-full border bg-black text-white border-black"
          >
            {interest}
          </button>
        ))}
        
        <button
          onClick={() => setShowCustomInput(true)}
          className="px-4 py-2 rounded-full border flex items-center gap-2 hover:border-gray-300"
        >
          <Plus className="size-4" />
          Add interest
        </button>
      </div>

      <div className="w-full max-w-xl">
        <div className="flex justify-between mb-4">
          <button
            onClick={() => setStep(3)}
            className="text-black underline"
          >
            Back
          </button>
          <button
            onClick={handleSubmit}
            className={`px-6 py-2 rounded-full ${
              data.interests.length > 0 && !isSubmitting
                ? 'bg-black text-white'
                : 'bg-gray-200 text-gray-500'
            }`}
            disabled={data.interests.length === 0 || isSubmitting}
          >
           {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </div>

        {showCustomInput && (
          <div className="flex gap-2 justify-center">
            <input
              type="text"
              value={customInterest}
              onChange={(e) => setCustomInterest(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter your interest"
              className="px-4 py-2 rounded-full border focus:outline-none focus:border-black"
              autoFocus
            />
            <button
              onClick={handleAddCustomInterest}
              className="px-4 py-2 rounded-full bg-black text-white disabled:bg-gray-200 disabled:text-gray-500"
              disabled={!customInterest.trim()}
            >
              Add
            </button>
          </div>
        )}
      </div>
    </div>
  );
}