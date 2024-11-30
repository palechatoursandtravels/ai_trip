import React from 'react';
import Image from 'next/image';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

export default function TermsConditions() {
  return (
    <>
        <NavBar/>
        <div className="min-h-screen bg-white text-black">
            <div className="container mx-auto px-4 py-12 md:py-20">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                    <h1 className="text-3xl md:text-4xl font-bold text-teal-700 mb-6">
                    Terms & Conditions
                    </h1>
                    <div className="prose max-w-prose">
                    <section className="mb-6">
                        <h2 className="text-xl md:text-2xl font-semibold text-teal-600 mb-4">
                        Your Journey, Our Commitment
                        </h2>
                        <p className="text-sm md:text-base leading-relaxed">
                        Embarking on a digital journey with Palecha Tours means understanding the map of our 
                        service. These terms ensure a smooth, transparent travel planning experience.
                        </p>
                    </section>

                    <section className="mb-6">
                        <h2 className="text-xl md:text-2xl font-semibold text-teal-600 mb-4">
                        Key Service Terms
                        </h2>
                        <ul className="list-disc pl-5 text-sm md:text-base space-y-2">
                        <li>AI-powered personalized recommendations</li>
                        <li>User account responsibilities</li>
                        <li>Transparent pricing models</li>
                        <li>Intellectual property rights</li>
                        </ul>
                    </section>
                    </div>
                </div>
                
                <div className="hidden md:block">
                    <div className="relative w-full h-[500px]">
                    <Image 
                        src="/images/palecha_logo.jpg" 
                        alt="Travel Terms Illustration" 
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
                    Our Service Commitment
                </h3>
                <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-white p-4 rounded-lg shadow-md">
                    <h4 className="font-semibold text-teal-600 mb-2">User Experience</h4>
                    <p className="text-sm">Continuous improvement of AI travel recommendations</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-md">
                    <h4 className="font-semibold text-teal-600 mb-2">Data Integrity</h4>
                    <p className="text-sm">Protecting user data with advanced security protocols</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-md">
                    <h4 className="font-semibold text-teal-600 mb-2">Transparent Pricing</h4>
                    <p className="text-sm">Clear subscription models with flexible options</p>
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