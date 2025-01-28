export interface Coordinates {
    lat: number;
    lng: number;
  }
  
  export interface Location {
    id: string;
    name: string;
    image: string;
    coordinates: Coordinates;
  }
  
  export interface CarouselProps {
    locations: Location[];
  }

// Compare this snippet from components/PeopleChoices.tsx:
export const locations: Location[] = [
    {
      id: '1',
      name: 'Paris',
      image: '/images/paris.jpg',  // Replace with actual Paris image
      coordinates: {
        lat: 48.8566,
        lng: 2.3522
      }
    },
    {
      id: '2',
      name: 'Uzbekistan - Samarkand',
      image: '/images/uzbekistan.jpg',  // Replace with actual Uzbekistan image
      coordinates: {
        lat: 39.6553,
        lng: 66.9597
      }
    },
    {
      id: '3',
      name: 'Thailand - Bangkok',
      image: '/images/thailand.jpg',  // Replace with actual Thailand image
      coordinates: {
        lat: 13.7563,
        lng: 100.5018
      }
    },
    {
      id: '4',
      name: 'Tokyo',
      image: '/images/tokyo.jpg',  // Replace with actual Tokyo image
      coordinates: {
        lat: 35.6762,
        lng: 139.6503
      }
    },
    {
      id: '5',
      name: 'New York',
      image: '/images/newyork.jpg',  // Replace with actual New York image
      coordinates: {
        lat: 40.7128,
        lng: -74.0060
      }
    },
    {
      id: '6',
      name: 'Mount Kailash',
      image: '/images/kailash.jpg',  // Replace with actual Kailash image
      coordinates: {
        lat: 31.0670,
        lng: 81.3111
      }
    },
    {
      id: '7',
      name: 'Lakshadweep Islands',
      image: '/images/lakshdweep.jpg',  // Replace with actual Lakshadweep image
      coordinates: {
        lat: 10.5593,
        lng: 72.6358
      }
    },
    {
      id: '8',
      name: 'Varkala, Kerala',
      image: '/images/varkala.jpg',  // Replace with actual Varkala image
      coordinates: {
        lat: 8.7370,
        lng: 76.7133
      }
    }
  ];