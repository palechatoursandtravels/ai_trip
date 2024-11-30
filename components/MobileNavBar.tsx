'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from './ui/button';
import { ArrowRight, Menu, X } from 'lucide-react';
import MaxWidthWrapper from './MaxWidthWrapper';
import { motion, AnimatePresence } from 'framer-motion';

// Centralized Smooth Scroll Utility
const smoothScroll = (targetId: string) => {
  const targetElement = document.querySelector(targetId);
  if (targetElement) {
    targetElement.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  }
};

const MobileNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // Ensure smooth scroll polyfill for older browsers
    if (typeof window !== 'undefined') {
      import('smoothscroll-polyfill').then(smoothscroll => {
        smoothscroll.polyfill();
      });
    }
  }, []);

  // Function to toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Handle navigation with smooth scroll
  const handleNavigation = (targetId: string) => {
    setIsMenuOpen(false);
    
    // Client-side navigation
    if (window.location.pathname !== '/landingPage') {
      window.location.href = `/landingPage${targetId}`;
    } else {
      // Use smooth scroll for in-page navigation
      smoothScroll(targetId);
    }
  };

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup effect
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  // Framer Motion variants for menu animation
  const menuVariants = {
    hidden: { 
      opacity: 0,
      x: '100%' 
    },
    visible: { 
      opacity: 1,
      x: 0,
      transition: {
        type: 'tween',
        duration: 0.3
      }
    },
    exit: { 
      opacity: 0,
      x: '100%',
      transition: {
        type: 'tween',
        duration: 0.3
      }
    }
  };

  return (
    <nav className="sticky h-14 inset-x-0 top-0 z-50 w-full border-b backdrop-blur-3xl border-gray-200 bg-white/75 transition-all dark:bg-black/75 dark:border-gray-800 sm:hidden">
      <MaxWidthWrapper>
        <div className="flex h-14 items-center justify-between">
          {/* Logo */}
          <Link href="/landingPage" className='flex z-40 font-semibold'>
            <span>Assisstant.</span>
          </Link>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={toggleMenu} 
            className="z-50 focus:outline-none"
            aria-label="Toggle mobile menu"
          >
            {isMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>

          {/* Mobile Menu Overlay */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div 
                className="fixed inset-0 bg-white dark:bg-black z-40"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={menuVariants}
              >
                <MaxWidthWrapper>
                  <div className="flex flex-col h-screen justify-center items-center bg-white space-y-8 text-center">
                    {/* Logo section */}
                    <Link 
                      href="/landingPage" 
                      className='text-black dark:text-white font-bold text-3xl mb-8'
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Assisstant.
                    </Link>

                    {/* Navigation Links */}
                    <div className="space-y-6 w-full px-4">
                      <button 
                        onClick={() => handleNavigation('#AboutUs')} 
                        className='block w-full text-black dark:text-white font-medium text-2xl py-4 hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors rounded-lg'
                      >
                        About Us
                      </button>
                      
                      <button 
                        onClick={() => handleNavigation('#Features')} 
                        className='block w-full text-black dark:text-white font-medium text-2xl py-4 hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors rounded-lg'
                      >
                        Features
                      </button>
                      <button 
                        onClick={() => handleNavigation('#contact')} 
                        className='block w-full text-black dark:text-white font-medium text-2xl py-4 hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors rounded-lg'
                      >
                        Contact Us
                      </button>
                    </div>
                    
                    {/* CTA Button */}
                    <Button 
                      className='w-full max-w-xs mx-auto text-white bg-zinc-900 hover:bg-teal-200 ring-2 ring-pink-200 hover:text-black text-xl py-6'
                      onClick={() => {
                        window.open('/login', '_blank');
                        setIsMenuOpen(false);
                      }}
                    >
                      Get Started <ArrowRight className='ml-1.5 size-5' />
                    </Button>
                  </div>
                </MaxWidthWrapper>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};

export default MobileNavbar;