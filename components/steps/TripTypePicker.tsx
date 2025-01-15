"use client";
import { useOnboardingStore } from '@/app/store/onboardingStore';
import { Users, Heart, Home, Group } from 'lucide-react';

type TripType = 'Solo Trip' | 'Partner trip' | 'Friends Trip' | 'Family trip';

export default function TripTypePicker() {
  const { updateData, setStep, data } = useOnboardingStore();

  // Trip type options with their respective icons
  const tripTypes: { type: TripType; icon: any }[] = [
    { type: 'Solo Trip', icon: Users },
    { type: 'Partner trip', icon: Heart },
    { type: 'Friends Trip', icon: Group },
    { type: 'Family trip', icon: Home },
  ];

  const handleTripTypeSelect = (type: TripType) => {
    updateData({
      tripType: {
        ...data.tripType,
        type,
      },
    });
  };

  const handlePetSelection = (withPets: boolean) => {
    updateData({
      tripType: {
        ...data.tripType,
        withPets,
      },
    });
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-4">
        What kind of trip are you planning?
      </h1>
      <p className="text-gray-600 mb-8">Select one.</p>

      <div className="grid grid-cols-2 gap-4 w-full max-w-xl mb-12">
        {tripTypes.map(({ type, icon: Icon }) => (
          <button
            key={type}
            onClick={() => handleTripTypeSelect(type)}
            className={`p-6 rounded-lg border flex items-center gap-3 ${
              data.tripType.type === type
                ? 'bg-emerald-400 text-white border-emerald-400'
                : 'hover:border-gray-300'
            }`}
          >
            <Icon className="size-6" />
            <span className="font-medium">{type}</span>
          </button>
        ))}
      </div>

      <div className="w-full max-w-xl mb-12">
        <p className="text-gray-600 mb-4 flex items-center gap-2">
          Are you travelling with pets?
          <span className="cursor-help text-gray-400">ⓘ</span>
        </p>
        <div className="flex gap-4">
          <button
            onClick={() => handlePetSelection(true)}
            className={`flex-1 py-3 rounded-full border ${
              data.tripType.withPets
                ? 'bg-emerald-400 text-white border-emerald-400'
                : 'hover:border-gray-300'
            }`}
          >
            Yes
          </button>
          <button
            onClick={() => handlePetSelection(false)}
            className={`flex-1 py-3 rounded-full border ${
              data.tripType.withPets === false
                ? 'bg-emerald-400 text-white border-emerald-400'
                : 'hover:border-gray-300'
            }`}
          >
            No
          </button>
        </div>
      </div>

      <div className="flex justify-between w-full max-w-xl">
        <button
          onClick={() => setStep(2)}
          className="text-black underline"
        >
          Back
        </button>
        <button
          onClick={() => data.tripType.type && setStep(4)}
          className={`px-6 py-2 rounded-full ${
            data.tripType.type
              ? 'bg-black text-white'
              : 'bg-gray-200 text-gray-500'
          }`}
          disabled={!data.tripType.type}
        >
          Next
        </button>
      </div>
    </div>
  );
}