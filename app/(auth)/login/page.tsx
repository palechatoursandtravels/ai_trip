'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useActionState, useEffect, useState } from 'react';
import { toast } from 'sonner';

import { AuthForm } from '@/components/auth-form';
import { SubmitButton } from '@/components/submit-button';

import { login, type LoginActionState } from '../actions';
import { Compass, Map, Palmtree } from 'lucide-react';

export default function Page() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [isSuccessful, setIsSuccessful] = useState(false);

  const [state, formAction] = useActionState<LoginActionState, FormData>(
    login,
    {
      status: 'idle',
    },
  );

  useEffect(() => {
    if (state.status === 'failed') {
      toast.error('Invalid credentials!');
    } else if (state.status === 'invalid_data') {
      toast.error('Failed validating your submission!');
    } else if (state.status === 'success') {
      setIsSuccessful(true);
      router.push('/onboarding');  // Change this line to redirect to Onboarding
    
    }
  }, [state.status, router]);

  const handleSubmit = (formData: FormData) => {
    setEmail(formData.get('email') as string);
    formAction(formData);
  };

  return (
    <div className="min-h-dvh w-screen overflow-hidden relative bg-[url('/images/world-map-dots.jpg')] dark:bg-[url('/images/world-map-dots.jpg')] bg-cover bg-center">
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 dark:from-blue-900/20 dark:via-purple-900/20 dark:to-pink-900/20 backdrop-blur-3xl"></div>
      
      <div className="absolute -top-32 -left-32 size-64 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute -bottom-32 -right-32 size-64 bg-secondary/20 rounded-full blur-3xl animate-pulse delay-1000"></div>

      <div className="relative flex min-h-dvh w-full items-center justify-center px-4">
        <div className="w-full max-w-md">
          {/* Floating icons */}
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 flex gap-8">
            <Compass className="size-8 text-primary animate-pulse" />
            <Map className="size-8 text-secondary animate-pulse delay-500" />
            <Palmtree className="size-8 text-accent animate-pulse delay-1000" />
          </div>

          <div className="backdrop-blur-md bg-white/70 dark:bg-gray-900/70 p-8 rounded-3xl shadow-2xl dark:shadow-gray-900/30 border border-gray-200/50 dark:border-gray-700/50">
            <div className="space-y-6 mb-8">
              <div className="text-center space-y-2">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-green-500 via-teal-300 to-green-400 bg-clip-text text-transparent">
                  Welcome Back
                </h1>
                <p className="text-base text-gray-600 dark:text-gray-300">
                  Ready to plan your next adventure?
                </p>
              </div>
            </div>

            <AuthForm action={handleSubmit} defaultEmail={email}>
              <SubmitButton 
                isSuccessful={isSuccessful}
              >
                Continue Your Journey
              </SubmitButton>
              
              <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
                {"First time explorer? "}
                <Link
                  href="/register"
                  className="font-medium text-primary hover:text-teal-400 transition-colors duration-300 hover:underline"
                >
                  Start your adventure
                </Link>
              </p>
            </AuthForm>
          </div>
        </div>
      </div>
    </div>
  );
}