"use client";

import React, { useState } from 'react';
import Joyride, { STATUS, Step, ACTIONS, EVENTS } from 'react-joyride';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';

interface ChatTourProps {
  isOpen: boolean;
  onClose: () => void;
  onStart: () => void;
}

export function ChatTour({ isOpen, onClose, onStart }: ChatTourProps) {
  // Simplify state management - follow Guide.tsx pattern
  // eslint-disable-next-line import/no-named-as-default-member
  const [dialogOpen, setDialogOpen] = useState(false);
  // eslint-disable-next-line import/no-named-as-default-member
  const [stepIndex, setStepIndex] = useState(0);

  // Define steps
  const steps: Step[] = [
    {
      target: '.sidebar-toggle',
      content: 'Welcome to the chat interface! This button toggles the sidebar where you can access your chat history.',
      disableBeacon: true,
      placement: 'right',
    },
    {
      target: '.Contact',
      content: 'Need expert assistance? Click here to contact our travel experts to finalize the travel plan Mandatory* who can help customize your plans!',
      placement: 'left',
    },
    {
      target: 'form > div',
      content: 'Type your messages here to interact with our AI assistant. You can ask questions, request itineraries, or discuss travel plans!',
      placement: 'top',
    },
    {
      target: '.tour-btn',
      content: 'You can always restart this tour by clicking this help button!',
      placement: 'bottom',
    }
  ];

  const handleJoyrideCallback = (data: any) => {
    const { action, index, status, type } = data;

    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      onClose();
      setDialogOpen(true);
    } else if (type === EVENTS.STEP_AFTER || type === EVENTS.TARGET_NOT_FOUND) {
      setStepIndex(index + (action === ACTIONS.PREV ? -1 : 1));
    }
  };

  return (
    <>
      <Joyride
        steps={steps}
        run={isOpen}
        continuous
        showProgress
        showSkipButton
        spotlightClicks
        hideCloseButton
        stepIndex={stepIndex}
        disableCloseOnEsc
        disableOverlayClose
        styles={{
          options: {
            primaryColor: '#14b8a6',
            zIndex: 1000,
            overlayColor: 'rgba(0, 0, 0, 0.5)',
          },
          tooltip: {
            backgroundColor: '#ffffff',
            color: '#000000',
            fontSize: '14px',
            padding: '16px',
          },
          buttonNext: {
            backgroundColor: '#14b8a6',
            color: '#ffffff',
          },
          buttonBack: {
            color: '#14b8a6',
            marginRight: '10px',
          },
          buttonSkip: {
            color: '#6b7280',
          },
        }}
        callback={handleJoyrideCallback}
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
                  setStepIndex(0);
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
