'use client';

import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from 'sonner';
import { SessionManager } from '@/components/SessionTimeProvider';
import { useEffect } from 'react';
import { updateContextPromptCache } from '@/lib/ai/prompts';
import { useOnboardingStore } from './store/onboardingStore';

function OnboardingInitializer() {
  useEffect(() => {
    // Update cache when component mounts
    updateContextPromptCache();

    // Set up listener for store changes
    const unsubscribe = useOnboardingStore.subscribe(() => {
      updateContextPromptCache();
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return null;
}

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      <SessionManager>
        <Toaster position="top-center" />
        <OnboardingInitializer />
        {children}
      </SessionManager>
    </ThemeProvider>
  );
}