
// lib/promptHelpers.ts
interface FormattedOnboardingData {
    destination: string;
    dateRange: string;
    tripType: string;
    interests: string[];
  }
  
  export function getOnboardingDataForPrompt(): FormattedOnboardingData | null {
    if (typeof window === 'undefined') return null;
    
    try {
      const storedData = window.localStorage.getItem('onboarding-storage');
      if (!storedData) return null;
  
      // Parse the nested structure
      const parsedData = JSON.parse(storedData);
      const data = parsedData.state?.data;
  
      if (!data?.destination?.name || !data?.interests) {
        return null;
      }
  
      return {
        destination: data.destination.name,
        dateRange: data.dateRange.startDate && data.dateRange.endDate ? 
          `from ${new Date(data.dateRange.startDate).toLocaleDateString()} to ${new Date(data.dateRange.endDate).toLocaleDateString()}` : 
          'dates not specified',
        tripType: `${data.tripType.type}${data.tripType.withPets ? ' with pets' : ''}`,
        interests: data.interests
      };
    } catch (error) {
      console.error('Error getting onboarding data:', error);
      return null;
    }
  }
  
  