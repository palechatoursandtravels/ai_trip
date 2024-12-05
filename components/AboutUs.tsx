'use client'

import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { cn } from '@/lib/utils'

const AboutUs = ({ className }: { className?: string }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section ref={ref} className={cn('py-15 bg-gray-100 my-11', className)} id="AboutUs">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="md:w-1/2 mb-8 md:mb-0 relative flex justify-center items-center"
          >
            <div className="relative w-full max-w-[700px] aspect-video">
              <Image
                src="/images/palecha_logo.jpg"
                alt="About Palecha Tours"
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:w-1/2 md:pl-12"
          >
            <h2 className="text-4xl font-bold mb-6">About US</h2>
            <p className="text-xl text-muted-foreground mb-6">
             At Palecha Tours, we envision a future where travel planning is effortless, personalized, and efficient. By combining the power of AI with the expertise of human travel consultants, we aim to revolutionize the way you experience the world.

            </p>
            <p className="text-xl text-muted-foreground">
              Say goodbye to hours of research and hello to instant, personalized travel plans.
              With Palecha Tours, your dream vacation is just a conversation away.
            </p>
            
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default AboutUs