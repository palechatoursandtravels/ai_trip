/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useRef, useEffect, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { MapPin } from 'lucide-react';
import { CarouselProps } from '@/lib/locations';

const PeoplesChoices: React.FC<CarouselProps> = ({ locations }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [hoveredCard, setHoveredCard] = useState<string | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState(0);
    
    // Constants for animation
    const CARD_WIDTH = 320; // width + gap
    const ANIMATION_SPEED = 1; // pixels per frame
    const ITEMS_TO_SHOW = 4; // number of items visible at once
  
    useEffect(() => {
      let animationId: number;
      const totalWidth = locations.length * CARD_WIDTH;
  
      const animate = () => {
        if (!isHovered && !hoveredCard) {
          setPosition(prevPosition => {
            let newPosition = prevPosition - ANIMATION_SPEED;
            
            // Reset position when we've scrolled one card width
            if (Math.abs(newPosition) >= totalWidth) {
              newPosition = 0;
            }
            
            return newPosition;
          });
        }
        animationId = requestAnimationFrame(animate);
      };
  
      animationId = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(animationId);
    }, [isHovered, hoveredCard, locations.length]);
  
    const handleCardClick = (lat: number, lng: number, name: string) => {
      const encodedName = encodeURIComponent(name);
      const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedName}+${lat},${lng}`;
      window.open(mapsUrl, '_blank', 'noopener,noreferrer');
    };
  
    // Triple the locations array to ensure smooth infinite scroll
    const extendedLocations = [...locations, ...locations, ...locations];
  
    return (
      <div className="w-full max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-3xl justify-center text-center font-bold mb-8">Peoples Choices...</h2>
        
        <div 
          className="relative overflow-hidden"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => {
            setIsHovered(false);
            setHoveredCard(null);
          }}
        >
          <div 
            ref={containerRef}
            className="flex gap-5"
            style={{ 
              transform: `translateX(${position}px)`,
              transition: isHovered ? 'transform 0.3s ease-out' : 'none'
            }}
          >
            {extendedLocations.map((location, index) => (
              <Card
                key={`${location.id}-${index}`}
                className="shrink-0 w-[300px] relative cursor-pointer group"
                onMouseEnter={() => setHoveredCard(location.id)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => handleCardClick(
                  location.coordinates.lat, 
                  location.coordinates.lng,
                  location.name
                )}
              >
                <CardContent className="p-0 relative">
                  <div className="h-[200px] overflow-hidden rounded-t-lg">
                    <img
                      src={location.image}
                      alt={location.name}
                      className="size-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div 
                      className={`absolute inset-0 bg-gradient-to-t from-black/70 to-transparent 
                                flex flex-col items-center justify-end p-4 transition-opacity duration-300
                                ${hoveredCard === location.id ? 'opacity-100' : 'opacity-0'}`}
                    >
                      <MapPin className="mb-2" size={24} color="white" />
                      <p className="text-white text-lg font-semibold text-center">
                        {location.name}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  export default PeoplesChoices;