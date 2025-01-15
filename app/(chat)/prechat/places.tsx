import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import Script from 'next/script';

// Define interface for Google Places Autocomplete
declare global {
  interface Window {
    google: {
      maps: {
        places: {
          Autocomplete: new (input: HTMLInputElement, options?: object) => any;
        };
      };
    };
  }
}

// Interface for the selected place
interface Place {
  name: string;
  placeId: string;
}

const LocationSearch = () => {
  // State to store the selected place
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  
  // Function to initialize Google Places Autocomplete
  const initializeAutocomplete = () => {
    const input = document.getElementById('location-input') as HTMLInputElement;
    const autocomplete = new window.google.maps.places.Autocomplete(input, {
      types: ['(cities)']
    });

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      setSelectedPlace({
        name: place.formatted_address || place.name,
        placeId: place.place_id
      });
    });
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center pt-20">
      {/* Google Places Script */}
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
        onLoad={initializeAutocomplete}
      />
      
      {/* Powered by AI badge */}
      <div className="absolute top-4 right-4 flex items-center space-x-2 text-sm text-gray-500">
        <div className="size-5 bg-purple-100 rounded-full flex items-center justify-center">
          <span className="text-purple-600">⚡</span>
        </div>
        <span>Powered by AI</span>
        <span>1 of 4</span>
      </div>

      {/* Close button */}
      <button className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
        ×
      </button>

      {/* Main content */}
      <div className="w-full max-w-2xl px-4">
        <h1 className="text-4xl font-bold text-center mb-4">
          First, where do you want to go?
        </h1>
        <p className="text-gray-600 text-center mb-8">
          You&apos;ll get custom recs you can save and turn into an itinerary.
        </p>

        {/* Search input */}
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <svg
              className="size-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <Input
            id="location-input"
            className="w-full pl-10 pr-4 py-3 text-gray-900 border rounded-full focus:ring-2 focus:ring-blue-500"
            placeholder="Choose a city or town"
            type="text"
          />
        </div>
      </div>

      {/* Next button */}
      <div className="fixed bottom-8 right-8">
        <button 
          className="bg-gray-200 text-gray-500 px-6 py-2 rounded-full font-medium disabled:opacity-50"
          disabled={!selectedPlace}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default LocationSearch;