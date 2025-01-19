

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

  export async function fetchOnboardingData() {
    try {
      const baseUrl = typeof window !== 'undefined' 
        ? '' // Client-side: use relative URL
        : process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'; // Server-side: need absolute URL
  
      const response = await fetch(`${baseUrl}/api/getdata`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        credentials: 'include',
        cache: 'no-store'
      });
  
      // First check content type to ensure we're getting JSON
      const contentType = response.headers.get('content-type');
      if (!contentType?.includes('application/json')) {
        // If we're getting HTML instead of JSON, likely means we're not authenticated
        if (contentType?.includes('text/html')) {
          console.warn('Received HTML instead of JSON - likely authentication required');
          return null;
        }
        throw new Error(`Unexpected content type: ${contentType}`);
      }
  
      if (response.status === 401) {
        console.warn('User not authenticated');
        return null;
      }
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        console.error('Error response:', errorData || response.statusText);
        return null;
      }
  
      const data = await response.json();
      return data;
  
    } catch (error) {
      console.error('Error fetching onboarding data:', error);
      return null;
    }
  }