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


// const syncToCookie = (state: any) => {
//   if (typeof window !== 'undefined') {
//     const value = encodeURIComponent(JSON.stringify(state));
//     document.cookie = `onboarding-storage=${value}; path=/; max-age=86400`; // 24 hours
//   }
// };

export const useOnboardingStore = create<OnboardingStore>()(
  persist(
    (set) => ({
      step: 1,
      data: initialData,
      setStep: (step) => set({ step }),
      updateData: (newData) => 
        set((state) => ({
          data: { ...state.data, ...newData }
        })),
      resetData: () => set({ data: initialData, step: 1 }),
    }),
    {
      name: 'onboarding-storage',
      skipHydration: false,
      storage: {
        getItem: (name) => {
          if (typeof window === 'undefined') return null;
          const item = localStorage.getItem(name);
          return item ? JSON.parse(item) : null;
        },
        setItem: (name, value) => {
          if (typeof window === 'undefined') return;
          localStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: (name) => {
          if (typeof window === 'undefined') return;
          localStorage.removeItem(name);
        },
      },
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