

// types.ts
export interface OnboardingData {
    destination: {
      name: string;
      placeId: string;
    };
    dateRange: {
      startDate: Date | null;
      endDate: Date | null;
    };
    tripType: {
      type: 'Solo Trip' | 'Partner trip' | 'Friends Trip' | 'Family trip';
      withPets: boolean;
    };
    interests: string[];
  }
  
  export async function saveOnboardingData(data: OnboardingData) {
    try {
      if (typeof window !== 'undefined') {
        // Save in Zustand format
        const zustandData = {
          state: {
            data: data,
            step: 4 // Assuming step 4 is final
          }
        };
        
        // Save using the same key as Zustand store
        localStorage.setItem('onboarding-storage', JSON.stringify(zustandData));
        
        // Set cookie with same structure
        const encodedData = encodeURIComponent(JSON.stringify(zustandData));
        document.cookie = `onboarding-storage=${encodedData}; path=/; max-age=86400`;

        const response = await fetch('/api/onboarding', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ onboardingData: data }),
        });
  
        if (!response.ok) {
          throw new Error('Failed to save onboarding data');
        }

      }
      
      return true;
    } catch (error) {
      console.error('Error saving onboarding data:', error);
      throw error;
    }
  }