'use client'

import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import { Lightbulb, Map, Clock, DollarSign, TimerOff, WineIcon, PhoneForwarded } from 'lucide-react'

const features = [
  {
    icon: Lightbulb,
    title: 'Instantaneous Planning',
    description: 'Our advanced AI system swiftly analyzes your preferences, budget, and travel dates to generate a comprehensive itinerary in minutes.',
  },
  {
    icon: Map,
    title: 'Expert Review',
    description: ' Our seasoned travel consultants meticulously review your AI-generated itinerary, identifying potential improvements and ensuring the best possible experience.',
  },
  {
    icon: Clock,
    title: 'Personalized Service',
    description: 'Benefit from the personalized attention of a dedicated travel consultant, who is available to answer your questions, address concerns, and provide expert advice throughout your journey.',
  },
  {
    icon: DollarSign,
    title: 'Exclusive Deals and Discounts',
    description: 'Benefit from our partnerships with top travel providers to secure the best deals on your behalf.',
  },
  {
    icon: TimerOff,
    title: 'Time-Saving',
    description: 'Our AI-powered platform streamlines the planning process, saving you valuable time and effort.',
  },
  {
    icon: PhoneForwarded,
    title: 'Exceptional Customer Service',
    description: 'Our dedicated team is committed to providing exceptional customer service, from initial inquiry to post-trip support.',
  },
]

export default function Features() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section ref={ref} className={`py-20 mt-20`} id="Features">
      <div className="container mx-auto px-4">
        <h2 className={`text-4xl font-bold text-center mb-12`}>
          Why Choose Us ?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className={`p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200 `}
              >
                <Icon className={`size-12 mb-6`} />
                <h3 className="text-2xl font-semibold mb-4 text-teal-500">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}