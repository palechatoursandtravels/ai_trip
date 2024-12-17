'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "What is Travel Buddy?",
    answer:
      "AI-Powered, Human-Centered Travel. We harness the best of both worlds to create extraordinary journeys, The Future of Travel, Today. We blend cutting-edge AI technology with the warmth of human expertise to deliver personalized, unforgettable travel experiences",
  },
  {
    question: "what unique value do you aim to bring to your clients?",
    answer:
      "Our smart AI Travel Buddy dives deep into your travel preferences, analyzing your interests, budget, and dream destinations. We blend cutting-edge technology with travel expertise to design trips that feel tailor-made just for you, while also negotiating the best deals to turn your dream into reality.",
  },
  {
    question: "How does the synergy between AI and human expertise elevate the travel planning experience compared to relying solely on either?",
    answer:
      "AI can help you create your dream itinerary in minutes with its vast knowledge and understanding. However, AI has its limitations—it cannot negotiate rates and may occasionally include minor errors. That’s where our human expertise comes in. Once you finalize your itinerary, our travel experts will review it, fix any issues, and negotiate the best deals for you. It’s the perfect blend of AI efficiency and human expertise working together for your ideal travel experience.",
  },
  {
    question: "How does AI help you save time in planning a trip?",
    answer:
      "Traditionally, planning a trip took a lot of time and effort as clients and experts worked to understand each other’s needs and finalize decisions. With Travel Buddy, this process becomes faster and easier, saving up to 80% of your time. You can plan your trip in minutes, anytime you want!",
  },
  {
    question: "What if there’s a mistake in my itinerary?",
    answer:
      "Our travel experts will carefully review your finalized itinerary to ensure everything is accurate. They will explain the entire plan to you in detail before any bookings are made. Travel Buddy is designed to speed up the planning process and enhance your experience but will never initiate bookings on its own.",
  },
]

export default function FAQ() {
  return (
    <section className="py-20 bg-gray-100" id="faqs">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Frequently Asked Questions</h2>
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent>
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
