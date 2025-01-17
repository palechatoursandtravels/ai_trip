// utils/sessionManager.ts
'use client';

import { useOnboardingStore } from '@/app/store/onboardingStore';

class SessionManager {
  private timeoutMinutes = 10;
  private timer: NodeJS.Timeout | null = null;
  private lastActivity: number = Date.now();

  constructor() {
    if (typeof window === 'undefined') return;
  }

  startTimer() {
    if (typeof window === 'undefined') return;

    this.timer = setInterval(() => {
      const currentTime = Date.now();
      const inactiveTime = (currentTime - this.lastActivity) / (1000 * 60);

      if (inactiveTime >= this.timeoutMinutes) {
        this.clearSession();
      }
    }, 60000);

    this.addActivityListeners();
  }

  private addActivityListeners() {
    if (typeof window === 'undefined') return;

    ['mousedown', 'keydown', 'scroll', 'touchstart'].forEach(event => {
      window.addEventListener(event, () => {
        this.updateActivity();
      });
    });
  }

  private updateActivity() {
    this.lastActivity = Date.now();
  }

  private clearSession() {
    useOnboardingStore.getState().resetData();
    
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  stopTimer() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }
}

export const sessionManager = new SessionManager();