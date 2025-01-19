'use client';

import { useOnboardingStore } from '@/app/store/onboardingStore';
import { saveOnboardingData } from '@/lib/onboarding';
import DestinationPicker from './steps/DestinationPicker';
import DatePicker from './steps/DatePicker';
import TripTypePicker from './steps/TripTypePicker';
import InterestsPicker from './steps/InterestsPicker';
import { useCallback, useEffect } from 'react';

const OnboardingFlow = () => {
  const { step, data } = useOnboardingStore();

  const handleCompletion = useCallback(async () => {
    if (step === 4) {
      try {
        await saveOnboardingData(data);
        // Handle successful save - maybe redirect or show success message
      } catch (error) {
        console.error('Failed to save onboarding data:', error);
        // Handle error - show error message
      }
    }
  }, [step, data]);

  useEffect(() => {
    if (step === 4) {
      handleCompletion();
    }
  }, [step, handleCompletion]);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="w-full h-2 bg-gray-200 rounded-full mb-8">
          <div 
            className="h-full bg-black rounded-full transition-all duration-300"
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>
        
        <div>Onboarding Step {step}</div>
        {/* Add your step components here */}
        {step === 1 && <DestinationPicker />}
        {step === 2 && <DatePicker />}
        {step === 3 && <TripTypePicker />}
        {step === 4 && <InterestsPicker />}
      </div>
    </div>
  );
};

export default OnboardingFlow;