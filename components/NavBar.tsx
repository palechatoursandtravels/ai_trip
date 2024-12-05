"use client";
import React, { useEffect } from 'react'
import MaxWidthWrapper from './MaxWidthWrapper'
import { Button } from './ui/button'
import { ArrowRight } from 'lucide-react';
import MobileNavbar from './MobileNavBar'

const smoothScroll = (targetId: string) => {
  const targetElement = document.querySelector(targetId);
  if (targetElement) {
    targetElement.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  }
};

const NavBar = () => {
  useEffect(() => {
    // Ensure smooth scroll polyfill for older browsers
    if (typeof window !== 'undefined') {
      import('smoothscroll-polyfill').then(smoothscroll => {
        smoothscroll.polyfill();
      });
    }
  }, []);

  const handleNavigation = (targetId: string) => {
    // Client-side navigation
    if (window.location.pathname !== '/landingPage') {
      window.location.href = `/landingPage${targetId}`;
    } else {
      smoothScroll(targetId);
    }
  };

  return (
    <>
    <nav className="hidden sm:block sticky h-14 inset-x-0 top-0 z-30 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all dark:bg-black/75 dark:border-gray-800">
        <MaxWidthWrapper>
            <div className="flex h-14 items-center justify-between">
                {/* Centered Navigation Items */}
                <div className="grow flex justify-center items-center space-x-4 gap-4">
                    <button 
                      onClick={() => handleNavigation('#AboutUs')} 
                      className='text-black font-medium text-sm hover:text-teal-600 transition-colors'
                    >
                        About Us
                    </button>
                    <button 
                      onClick={() => handleNavigation('#Features')} 
                      className='text-black font-medium text-sm hover:text-teal-600 transition-colors'
                    >
                        Features
                    </button>
                    <button 
                      onClick={() => handleNavigation('#contact')} 
                      className='text-black font-medium text-sm hover:text-teal-600 transition-colors'
                    >
                        Contact Us
                    </button>
                </div>

                {/* Get Started Button */}
                <Button 
                  className='text-white bg-zinc-900 hover:bg-teal-200 ring-2 ring-pink-200 hover:text-black' 
                  onClick={() => {window.open('/login', '_blank')}}
                >
                    Get Started <ArrowRight className='ml-1.5 size-5 '/>
                </Button>
            </div>
        </MaxWidthWrapper>
    </nav>

    {/* Mobile Navbar */}
    <MobileNavbar />
    </>
  )
}

export default NavBar