import { OnboardingData } from '@/lib/onboarding';
import { create } from 'zustand';

interface OnboardingStore {
  step: number;
  data: OnboardingData;
  setStep: (step: number) => void;
  updateData: (data: Partial<OnboardingData>) => void;
  resetData: () => void;
}

const initialData: OnboardingData = {
  destination: {
    name: '',
    placeId: '',
  },
  dateRange: {
    startDate: null,
    endDate: null,
  },
  tripType: {
    type: 'Solo Trip',
    withPets: false,
  },
  interests: [],
};

export const useOnboardingStore = create<OnboardingStore>((set) => ({
  step: 1,
  data: initialData,
  setStep: (step) => set({ step }),
  updateData: (newData) => 
    set((state) => ({ 
      data: { ...state.data, ...newData }
    })),
  resetData: () => set({ data: initialData, step: 1 }),
}));
