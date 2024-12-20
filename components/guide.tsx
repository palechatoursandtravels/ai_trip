"use client";
// components/guide.tsx
import { useState } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, X, MapPin, Clock, Phone, MessageSquare } from 'lucide-react';
import { GuideProps, GuideStep, GuideStepProps } from '@/lib/ai/guide';


const GuideStepComponent = ({ step, stepNumber, totalSteps }: GuideStepProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex flex-col items-center text-center px-4"
    >
      <div className="mb-4">
        {step.icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
      <p className="text-gray-600 dark:text-gray-300 mb-4">{step.description}</p>
      <div className="text-sm text-gray-500">
        Step {stepNumber} of {totalSteps}
      </div>
    </motion.div>
  );
};

export function Guide({ isOpen, onClose }: GuideProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const steps: GuideStep[] = [
    {
      title: "Welcome to Travel Buddy!",
      description: "I'm your AI travel assistant. Let me help you plan your perfect trip with personalized recommendations and detailed itineraries.",
      icon: <MessageSquare className="size-12 text-blue-500" />
    },
    {
      title: "Share Your Destination",
      description: "Tell me where you'd like to go, or share a photo of a place you're interested in. I'll analyze it and provide detailed information.",
      icon: <MapPin className="size-12 text-green-500" />
    },
    {
      title: "Plan Your Journey",
      description: "I'll create a detailed itinerary with hotel suggestions, food recommendations, and places to visit - complete with helpful links!",
      icon: <Clock className="size-12 text-purple-500" />
    },
    {
      title: "Contact Information",
      description: "Please provide your name and Indian phone number (+91 format) so I can personalize your travel experience.",
      icon: <Phone className="size-12 text-red-500" />
    }
  ];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogTitle className="text-center">
            Getting Started with Travel Buddy
        </DialogTitle>
        <div className="relative p-6">
          {/* <button
            onClick={onClose}
            className="absolute right-2 top-2 text-gray-500 hover:text-gray-700"
          >
            <X className="size-6" />
          </button> */}
          
          <AnimatePresence mode="wait">
            <GuideStepComponent
              key={currentStep}
              step={steps[currentStep]}
              stepNumber={currentStep + 1}
              totalSteps={steps.length}
            />
          </AnimatePresence>

          <div className="flex justify-between mt-6">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 0}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="size-4" />
              Previous
            </Button>

            {currentStep === steps.length - 1 ? (
              <Button onClick={onClose} className="flex items-center gap-2 bg-teal-500 hover:bg-teal-500">
                Get Started
                <ChevronRight className="size-4" />
              </Button>
            ) : (
              <Button onClick={nextStep} className="flex items-center gap-2 bg-teal-500">
                Next
                <ChevronRight className="size-4" />
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}