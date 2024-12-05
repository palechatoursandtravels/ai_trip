'use client';

import AboutUs from "@/components/AboutUs";
import ContactUs from "@/components/ContactUS";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import FAQ from "@/components/FrequentlyAnswer";
import Gradient from "@/components/Gradient";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import NavBar from "@/components/NavBar";
import TypingEffect from "@/components/TypingEffect";
import Link from "next/link";


export default function LandingPage() {
 

  return (
   <>
   <div className="min-h-screen overflow-y-auto grainy">
    <NavBar/>
    <MaxWidthWrapper className="mb-12 mt-10 sm:mt-40 flex flex-col items-center justify-center text-center dark:text-white">
      <div aria-hidden="true" className="pointer-events-none mx-auto mb-4 max-w-fit items-center justify-center space-x-2 overflow-hidden 
      rounded-full border border-gray-200 bg-white px-7 py-2 shadow-md backdrop-blur 
      transition-all hover:border-gray-300 hover:bg-whie/50"
      >
        <p className="text-2xl font-semibold text-pink-400">Travel Hassel-free</p>
        {/* <p className="text-sm font-bold text-pink-200">YOU PACK, WE PLAN THE REST</p> */}
      </div>

      <h1 className="max-w-4xl text-5xl font-bold md:text-6xl lg:text-4xl">
      PALECHA TOURS AND TRAVELS <br /><span className="text-teal-400 text-3xl">YOU PACK, WE PLAN THE REST</span>
      </h1>

      <p className="mt-5 max-w-prose text-zinc-400 sm:text-lg">
        Assistant Allows you to plan, Customize and Create Itineraries in Seconds.
        <br />
        Start Planning Right Away!
      </p>
      <TypingEffect/>
    </MaxWidthWrapper>
        {/* Value Proposition Section */}
      <Gradient/>
      <Features/>
      <AboutUs className="mt-10 mb-1"/>
      {/* Feature Section */}
      <div className="mx-auto my-32 max-w-5xl sm:mt-56">
        <div className="mb-12 px-6 lg:px-8">
          <div className="mx-auto max-w-2xl sm:text-center">
            <h2 className="mt-2 font-bold text-4xl text-black-900 sm:text-5xl dark:text-white">
              Start Planning!
            </h2>
            <p className="mt-4 text-lg text-teal-400">
              Planning your Trips has never been easier than with Mimi
            </p>
          </div>
        </div>
        {/* Steps */}
        <ol className="my-8 space-y-4 pt-8 md:flex md:space-x-12 md:space-y-0">
          <li className="md:flex-1 ">
            <div className="flex flex-col space-y-2 border-l-4 border-zince-300 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4">
              <span className="text-sm font-medium text-teal-500">
                Step 1
              </span>
              <span className="text-xl font-semibold ">
                Sign Up for an Account
              </span>
              <span className="mt-2 text-teal-700">
              Either Thinking of Travel or want to refine the <Link href="/login" target="_black" className="underline underline-offset-2">Itinerary</Link>.
              </span>
            </div>
          </li>
          {/* step 2 */}
          <li className="md:flex-1 ">
            <div className="flex flex-col space-y-2 border-l-4 border-zince-300 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4">
              <span className="text-sm font-medium text-teal-500">
                Step 2
              </span>
              <span className="text-xl font-semibold ">
                Start Filling preferences
              </span>
              <span className="mt-2 text-teal-700">
              Plan Your Dream Trip with AI
              </span>
            </div>
          </li>
          {/* Step 3 */}
          <li className="md:flex-1 ">
            <div className="flex flex-col space-y-2 border-l-4 border-zince-300 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4">
              <span className="text-sm font-medium text-teal-500">
                Step 3
              </span>
              <span className="text-xl font-semibold ">
                Start Planing and Packing
              </span>
              <span className="mt-2 text-teal-700">
              Discover personalized travel experiences tailored just for you
              </span>
            </div>
          </li>
        </ol>
      </div>
      <FAQ/>
      <ContactUs/>
      <Footer/>
    </div>
   </>
  );
}