import { fetchOnboardingData } from "../onboarding";

// lib/promptHelpers.ts
interface FormattedOnboardingData {
    destination: string;
    dateRange: string;
    tripType: string;
    interests: string[];
  }
  
  export async function getOnboardingDataForPrompt(): Promise<FormattedOnboardingData | null> {
    // First try localStorage for client-side
    if (typeof window !== 'undefined') {
      try {
        const storedData = window.localStorage.getItem('onboarding-storage');
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          const data = parsedData.state?.data;
          
          if (data?.destination?.name && data?.interests) {
            return formatOnboardingData(data);
          }
        }
      } catch (error) {
        console.error('Error getting onboarding data from localStorage:', error);
      }
    }
    
    // If not found in localStorage, fetch from API
    try {
      const dbData = await fetchOnboardingData();
      if (!dbData || (dbData as any).error === 'Unauthorized') {
        return null;
      }
      if (dbData) {
        return formatOnboardingData(dbData);
      }
    } catch (error) {
      console.error('Error getting onboarding data from API:', error);
    }
    
    return null;
  }
  
  function formatOnboardingData(data: any): FormattedOnboardingData {
    return {
      destination: data.destination.name,
      dateRange: data.dateRange.startDate && data.dateRange.endDate ? 
        `from ${new Date(data.dateRange.startDate).toLocaleDateString()} to ${new Date(data.dateRange.endDate).toLocaleDateString()}` : 
        'dates not specified',
      tripType: `${data.tripType.type}${data.tripType.withPets ? ' with pets' : ''}`,
      interests: data.interests
    };
  }
  
  