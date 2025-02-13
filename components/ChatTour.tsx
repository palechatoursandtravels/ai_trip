"use client";

import { useState } from 'react';
import Tour from 'reactour';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';

interface ChatTourProps {
  isOpen: boolean;
  onClose: () => void;
  onStart: () => void;
}

export function ChatTour({ isOpen, onClose, onStart }: ChatTourProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  
  // Define steps - updated for reactour format
  const steps = [
    {
      selector: '.sidebar-toggle',
      content: 'Welcome to the chat interface! This button toggles the sidebar where you can access your chat history.',
      position: 'right' as const,
    },
    {
      selector: '.Contact',
      content: 'Need expert assistance? Click here to contact our travel experts to finalize the travel plan Mandatory* who can help customize your plans!',
      position: 'left' as const,
    },
    {
      selector: 'form > div',
      content: 'Type your messages here to interact with our AI assistant. You can ask questions, request itineraries, or discuss travel plans!',
      position: 'top' as const,
    },
    {
      selector: '.tour-btn',
      content: 'You can always restart this tour by clicking this help button!',
      position: 'bottom' as const,
    }
  ];

 // Handle tour end
 const handleTourClose = () => {
    onClose();
    // Only show completion dialog if user completed the tour
    // (not if they just closed it at the start)
    if (isOpen) {
      setDialogOpen(true);
    }
  };

  return (
    <>
      <Tour
        steps={steps}
        isOpen={isOpen}
        onRequestClose={handleTourClose}
        rounded={8}
        accentColor="#14b8a6"
        className="custom-tour helper"
        showNavigation={true}
        showButtons={true}
        showNumber={true}
        disableKeyboardNavigation={false}
        disableInteraction={false}
        maskClassName="mask"
        closeWithMask={false}
      />

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Tour Completed!</DialogTitle>
          </DialogHeader>
          <div className="p-6">
            <p className="text-center mb-6">
              You&apos;ve completed the interface tour. Would you like to take it again?
            </p>
            <DialogFooter className="flex justify-between gap-4">
              <Button
                variant="outline"
                onClick={() => {
                  setDialogOpen(false);
                  onStart();
                }}
              >
                Take Tour Again
              </Button>
              <Button
                onClick={() => {
                  setDialogOpen(false);
                }}
                className="bg-teal-500 hover:bg-teal-600"
              >
                Finish
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}