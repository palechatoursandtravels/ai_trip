// overview.tsx
'use client';

import { getCurrentUsername } from '@/lib/db/actions';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
; // Import the new server action
import { toast } from 'sonner';

export const Overview = () => {
  const [username, setUsername] = useState<string>('there');

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const fetchedUsername = await getCurrentUsername();
        setUsername(fetchedUsername);
      } catch (error) {
        console.error('Failed to fetch username', error);
        toast.error('Could not retrieve username');
        // Fallback to 'there' is already set in the initial state
      }
    };

    fetchUsername();
  }, []);

  return (
    <motion.div
    key="overview"
    className="max-w-3xl mx-auto md:mt-20 relative"
    initial={{ opacity: 0, scale: 0.98 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.98 }}
    transition={{ delay: 0.5 }}
  >
    {/* Watermark effect with blurred text */}
    <div className="absolute inset-0 flex items-center justify-center opacity-10">
      <p className="text-8xl font-bold text-gray-200 blur-sm">
        Hello
      </p>
    </div>
    
    <div className="rounded-xl p-6 flex flex-col gap-8 leading-relaxed text-center max-w-xl relative z-10">
      <div className="space-y-2">
        <p className="text-lg text-gray-500 uppercase tracking-widest">
          Welcome Back
        </p>
        <h1 
          className={`
            text-6xl md:text-5xl font-bold 
            text-transparent bg-clip-text bg-gradient-to-r 
            from-[#6366F1] to-[#EC4899] 
            drop-shadow-lg
          `}
        >
          Hi, {username}!
        </h1>
      </div>
    </div>
  </motion.div>
  );
};