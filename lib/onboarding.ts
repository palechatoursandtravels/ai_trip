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
  