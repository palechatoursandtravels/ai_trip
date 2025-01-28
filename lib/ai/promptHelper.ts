import { fetchOnboardingData } from "../onboarding";

// lib/promptHelpers.ts
interface FormattedOnboardingData {
    destination: string;
    dateRange: string;
    tripType: string;
    interests: string[];
  }
  
  export async function getOnboardingDataForPrompt(): Promise<FormattedOnboardingData | null> {
    // Try to get from localStorage first
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
    
    // Fallback to API
    try {
      const dbData = await fetchOnboardingData();
      if (dbData && !(dbData as any).error) {
        return formatOnboardingData(dbData);
      }
    } catch (error) {
      console.error('Error getting onboarding data from API:', error);
    }
    
    return null;
  }
  
  function formatOnboardingData(data: any): FormattedOnboardingData {
    const formatDate = (date: string | null) => {
      if (!date) return '';
      try {
        return new Date(date).toLocaleDateString();
      } catch {
        return '';
      }
    };
  
    return {
      destination: data.destination.name || 'Not specified',
      dateRange: data.dateRange.startDate && data.dateRange.endDate
        ? `from ${formatDate(data.dateRange.startDate)} to ${formatDate(data.dateRange.endDate)}`
        : 'dates not specified',
      tripType: `${data.tripType.type}${data.tripType.withPets ? ' with pets' : ''}`,
      interests: Array.isArray(data.interests) ? data.interests : []
    };
  }