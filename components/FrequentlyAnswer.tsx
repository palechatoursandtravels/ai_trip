'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "What is Palechas?",
    answer:
      "Imagine having a travel genius in your pocket, ready to craft the perfect trip at your fingertips. Palechas is an AI-powered travel companion that transforms trip planning from a chore to an exciting experience. Get personalized, instant travel plans that match your vibe and style—all with zero hassle.",
  },
  {
    question: "Is Palechas free?",
    answer:
      "Our core travel planning experience is 100% free. We believe amazing travel should be accessible to everyone.",
  },
  {
    question: "How do you create personalized recommendations?",
    answer:
      "Our smart AI dives deep into your travel preferences, analyzing your interests, budget, and dream destinations. We blend cutting-edge technology with travel expertise to design trips that feel like they were crafted just for you.",
  },
  {
    question: "How flexible are the travel plans?",
    answer:
      "Total flexibility is our promise. Swap destinations, adjust timelines, or completely remix your itinerary. Your journey, your rules—we're just here to make it epic.",
  },
  {
    question: "Need support?",
    answer:
      "Got questions? Reach out to our support team at support@palechatours.com. We're always ready to help you turn travel dreams into reality.",
  },
]

export default function FAQ() {
  return (
    <section className="py-20 bg-white" id="faqs">
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
