'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "Why Palecha’s?",
    answer:
      "AI-Powered, Human-Centered Travel. We harness the best of both worlds to create extraordinary journeys",
  },
  {
    question: "How does Our process create unique travel experiences?",
    answer:
      "The Future of Travel, Today. We blend cutting-edge AI technology with the warmth of human expertise to deliver personalized, unforgettable travel experiences",
  },
  {
    question: "How do you create personalized recommendations?",
    answer:
      "Our smart AI dives deep into your travel preferences, analyzing your interests, budget, and dream destinations. We blend cutting-edge technology with travel expertise to design trips that feel like they were crafted just for you.",
  },
  {
    question: "How this approach works?",
    answer:
      "Redefining Travel, One Journey at a Time. We believe that AI and human expertise, working together, can create unparalleled travel experiences. Let us show you the future of travel.",
  },
  {
    question: "Need support?",
    answer:
      "Got questions? Reach out to our support team at `palechatoursandtravels1@gmail.com`. We're always ready to help you turn travel dreams into reality.",
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
