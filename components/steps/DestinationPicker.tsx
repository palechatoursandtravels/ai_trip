import { useOnboardingStore } from "@/app/store/onboardingStore";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';


export default function DestinationPicker() {
  const { updateData, setStep } = useOnboardingStore();

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-4">
        First, where do you want to go?
      </h1>
      <p className="text-gray-600 mb-8">
        You&apos;ll get custom recs you can save and turn into an itinerary.
      </p>
      
      <div className="w-full max-w-xl">
        <GooglePlacesAutocomplete
          placeholder="Choose a city or town"
          onPress={(data) => {
            updateData({
              destination: {
                name: data.description,
                placeId: data.place_id,
              },
            });
            setStep(2);
          }}
          query={{
            key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
            types: '(cities)',
          }}
          styles={{
            container: {
              flex: 0,
              width: '100%',
            },
            textInputContainer: {
              width: '100%',
            },
            textInput: {
              height: 50,
              borderRadius: 25,
              paddingHorizontal: 20,
              fontSize: 16,
            },
          }}
        />
      </div>
    </div>
  );
}