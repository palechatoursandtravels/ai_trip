import React from 'react';
import Image from 'next/image';
import Footer from '@/components/Footer';
import NavBar from '@/components/NavBar';

export default function PrivacyPolicy() {
  return (
    <>
    <NavBar/>
    <div className="min-h-screen bg-white text-black">
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-teal-700 mb-6">
              Privacy Policy
            </h1>
            <div className="prose max-w-prose">
              <section className="mb-6">
                <h2 className="text-xl md:text-2xl font-semibold text-teal-600 mb-4">
                  Your Data, Your Journey
                </h2>
                <p className="text-sm md:text-base leading-relaxed">
                  At Palecha Tours, we believe your travel data is as personal as your passport. 
                  Our commitment is to protect your information with the same care we plan your adventures.
                </p>
              </section>

              <section className="mb-6">
                <h2 className="text-xl md:text-2xl font-semibold text-teal-600 mb-4">
                  Key Privacy Principles
                </h2>
                <ul className="list-disc pl-5 text-sm md:text-base space-y-2">
                  <li>Transparent data collection</li>
                  <li>Secure information handling</li>
                  <li>Personalized travel experiences</li>
                  <li>Strict compliance with Indian data laws</li>
                </ul>
              </section>
            </div>
          </div>
          
          <div className="hidden md:block">
            <div className="relative w-full max-w-[700px] aspect-video">
              <Image 
                src="/images/palecha_logo.jpg" 
                alt="Travel Privacy Illustration" 
                fill
                className="object-cover rounded-lg shadow-lg ml-7"
                placeholder="blur"
                blurDataURL="/images/palecha_logo.jpg"
              />
            </div>
          </div>
        </div>

        <div className="mt-12 bg-teal-50 p-6 rounded-lg">
          <h3 className="text-2xl font-bold text-teal-700 mb-4">
            What We Protect
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h4 className="font-semibold text-teal-600 mb-2">Personal Details</h4>
              <p className="text-sm">Name, contact information, and demographics</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h4 className="font-semibold text-teal-600 mb-2">Travel Preferences</h4>
              <p className="text-sm">Destinations, interests, and travel styles</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h4 className="font-semibold text-teal-600 mb-2">Security Measures</h4>
              <p className="text-sm">Encryption, secure storage, and strict access controls</p>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-sm text-gray-600">
            Last Updated: November 2024 | Palecha Tours and Travel
          </p>
        </div>
      </div>
    </div>
    <Footer/>
    
    
    </>
  );
}