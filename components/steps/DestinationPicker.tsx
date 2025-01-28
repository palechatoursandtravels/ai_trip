import { useOnboardingStore } from "@/app/store/onboardingStore";
import usePlacesAutocomplete, {
  getGeocode,
  getDetails
} from "use-places-autocomplete";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { X } from "lucide-react";

export default function DestinationPicker() {
  const { updateData, setStep } = useOnboardingStore();
  
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      types: ['(cities)']
    },
    debounce: 300
  });

  const handleSelect = async (suggestion: any) => {
    setValue(suggestion.description, false);
    clearSuggestions();

    try {
      const results = await getGeocode({ placeId: suggestion.place_id });
      
      updateData({
        destination: {
          name: suggestion.description,
          placeId: suggestion.place_id,
        },
      });
      setStep(2);
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <Link 
        href="/" 
        className="absolute top-0 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
        aria-label="Skip to chat"
      >
        <X className="size-6 text-gray-500" />
      </Link>
      <h1 className="text-4xl font-bold mb-4">
        First, where do you want to go?
      </h1>
      <p className="text-gray-600 mb-8">
        You&apos;ll get custom recs you can save and turn into an itinerary.
      </p>
      
      <div className="w-full max-w-xl relative">
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={!ready}
          placeholder="Choose a city or town"
          className="h-12 px-6 rounded-full text-lg"
        />
        
        {status === "OK" && (
          <ul className="absolute w-full bg-white mt-1 rounded-lg shadow-lg border border-gray-200 max-h-60 overflow-y-auto z-10">
            {data.map((suggestion) => (
              <li
                key={suggestion.place_id}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSelect(suggestion)}
              >
                {suggestion.description}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}