// components/SessionManager.tsx
'use client';

import { useEffect } from 'react';

import { ensureStoreHydration } from '@/app/store/onboardingStore';
import { sessionManager } from '@/lib/sessionTimer';

export function SessionManager({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    ensureStoreHydration();
    sessionManager.startTimer();
    return () => sessionManager.stopTimer();
  }, []);

  return children;
}