'use client'

import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import { Lightbulb, Map, Clock } from 'lucide-react'

const features = [
  {
    icon: Lightbulb,
    title: 'AI-Powered Recommendations',
    description: 'Get personalized Itinerary Suggstions for you.',
  },
  {
    icon: Map,
    title: 'Custom Tailored Itinerary',
    description: 'Easily customize and adjust your travel plans get the dream Trip.',
  },
  {
    icon: Clock,
    title: 'Instant Planning',
    description: 'Save time with our lightning-fast AI trip planner.',
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
          Why Choose Palecha Tours?
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