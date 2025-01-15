"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import OnboardingFlow from '@/components/OnboardingFlow';

export default function OnboardingPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return <OnboardingFlow />;
}