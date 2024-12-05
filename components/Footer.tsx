'use client';
import React, { useEffect } from 'react'
import Link from 'next/link'
import { Facebook, Twitter, Instagram, PhoneCall } from 'lucide-react'
import { useRouter } from 'next/navigation';

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

export default function Footer() {
  const router = useRouter()
  useEffect(() => {
    // Ensure smooth scroll polyfill for older browsers
    if (typeof window !== 'undefined') {
      import('smoothscroll-polyfill').then(smoothscroll => {
        smoothscroll.polyfill();
      });
    }
  }, []);

  // Handle navigation with smooth scroll
  const handleNavigation = (targetId: string) => {
    // Client-side navigation
    if (window.location.pathname !== '/landingPage') {
      window.location.href = `/landingPage${targetId}`;
    } else {
      smoothScroll(targetId);
    }
  };

  return (
    <footer className="bg-gray-100 text-black py-8 md:py-12 border border-t-1 w-full">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8">
          <div className="mb-4 md:mb-0">
            <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-4">Palecha Tours</h3>
            <p className="text-xs md:text-sm">AI-powered travel planning for unforgettable experiences.</p>
          </div>
          <div className="mb-4 md:mb-0">
            <h4 className="text-base md:text-lg font-semibold mb-2 md:mb-4">Quick Links</h4>
            <ul className="space-y-1 md:space-y-2">
              <li>
                <button 
                  onClick={() => router.push('/')} 
                  className="text-xs md:text-sm hover:underline hover:text-teal-600 transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation('#AboutUs')} 
                  className="text-xs md:text-sm hover:underline hover:text-teal-600 transition-colors"
                >
                  About Us
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation('#Features')} 
                  className="text-xs md:text-sm hover:underline hover:text-teal-600 transition-colors"
                >
                  Features
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation('#faqs')} 
                  className="text-xs md:text-sm hover:underline hover:text-teal-600 transition-colors"
                >
                  FAQ
                </button>
              </li>
            </ul>
          </div>
          <div className="mb-4 md:mb-0">
            <h4 className="text-base md:text-lg font-semibold mb-2 md:mb-4">Concerns</h4>
            <ul className="space-y-1 md:space-y-2">
              <li>
                <Link 
                  href="/privacyPolicy" 
                  target="_blank" 
                  className="text-xs md:text-sm hover:underline hover:text-teal-600 transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link 
                  href="/termsConditions" 
                  target="_blank" 
                  className="text-xs md:text-sm hover:underline hover:text-teal-600 transition-colors"
                >
                  Terms and Conditions
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-base md:text-lg font-semibold mb-2 md:mb-4">Follow Us</h4>
            <div className="flex space-x-3 md:space-x-4">
              <Link href="https://jsdl.in/DT-30DUVN2NYGJ" className="hover:text-teal-600">
                <PhoneCall className="size-5 md:size-6" />
              </Link>
              <Link href="https://www.instagram.com/palechatours/" className="hover:text-teal-600">
                <Instagram className="size-5 md:size-6" />
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-6 md:mt-8 pt-4 md:pt-8 border-t border-primary-foreground/10 text-center">
          <p className="text-xs md:text-sm">&copy; 2024 Palecha Tours. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}