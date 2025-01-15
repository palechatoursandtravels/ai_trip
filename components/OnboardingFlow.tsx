import { useEffect } from 'react';
import { useRouter } from 'next/router';
import DestinationPicker from './steps/DestinationPicker';
import DatePicker from './steps/DatePicker';
import TripTypePicker from './steps/TripTypePicker';
import InterestsPicker from './steps/InterestsPicker';
import { useOnboardingStore } from '@/app/store/onboardingStore';

const OnboardingFlow = () => {
  const { step, data } = useOnboardingStore();
  const router = useRouter();

  useEffect(() => {
    // Check if onboarding is complete
    const isComplete = 
      data.destination.name &&
      data.dateRange.startDate &&
      data.tripType.type &&
      data.interests.length > 0;

    if (isComplete) {
      router.push('/chat'); // Redirect to chat interface when complete
    }
  }, [data, router]);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="w-full h-2 bg-gray-200 rounded-full mb-8">
          <div 
            className="h-full bg-black rounded-full transition-all"
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>
        
        {step === 1 && <DestinationPicker />}
        {step === 2 && <DatePicker />}
        {step === 3 && <TripTypePicker />}
        {step === 4 && <InterestsPicker />}
      </div>
    </div>
  );
};

export default OnboardingFlow;