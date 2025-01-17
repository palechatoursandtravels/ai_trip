import { OnboardingData } from '@/lib/onboarding';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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


const syncToCookie = (state: any) => {
  if (typeof window !== 'undefined') {
    const value = encodeURIComponent(JSON.stringify(state));
    document.cookie = `onboarding-storage=${value}; path=/; max-age=86400`; // 24 hours
  }
};

export const useOnboardingStore = create<OnboardingStore>()(
  persist(
    (set) => ({
      step: 1,
      data: initialData,
      setStep: (step) => set({ step }),
      updateData: (newData) => 
        set((state) => {
          const updatedState = { 
            data: { ...state.data, ...newData }
          };
          syncToCookie({ state: updatedState }); // Sync to cookie when data updates
          return updatedState;
        }),
      resetData: () => {
        if (typeof window !== 'undefined') {
          document.cookie = 'onboarding-storage=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
        }
        return set({ data: initialData, step: 1 });
      },
    }),
    {
      name: 'onboarding-storage',
      skipHydration: false
    }
  )
);

// export const hydrateStore = () => {
//   if (typeof window !== 'undefined') {
//     useOnboardingStore.persist.rehydrate();
//   }
// };

// 2. Modify onboardingStore.ts to ensure proper data syncing
  // Add this at the bottom of onboardingStore.ts
  export function ensureStoreHydration() {
    if (typeof window !== 'undefined') {
      const currentState = useOnboardingStore.getState();
      
      // If the store isn't hydrated, force hydration
      if (!currentState.data.destination.name) {
        useOnboardingStore.persist.rehydrate();
      }
      
      // Debug log the current state
      console.log('Current store state:', currentState);
    }
  }