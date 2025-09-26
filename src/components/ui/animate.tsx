"use client"

import { motion, MotionProps, Variants, useInView, useScroll, useTransform } from "framer-motion"
import { ReactNode, useRef } from "react"

// Common animation variants
export const fadeInUp: Variants = {
  initial: {
    opacity: 0,
    y: 20,
    filter: "blur(4px)",
  },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    filter: "blur(4px)",
    transition: {
      duration: 0.3,
    },
  },
}

export const fadeInScale: Variants = {
  initial: {
    opacity: 0,
    scale: 0.95,
    filter: "blur(8px)",
  },
  animate: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.3,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    filter: "blur(8px)",
    transition: {
      duration: 0.3,
    },
  },
}

export const slideInFromLeft: Variants = {
  initial: {
    opacity: 0,
    x: -30,
    filter: "blur(6px)",
  },
  animate: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.3,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
  exit: {
    opacity: 0,
    x: -30,
    filter: "blur(6px)",
    transition: {
      duration: 0.3,
    },
  },
}

export const slideInFromRight: Variants = {
  initial: {
    opacity: 0,
    x: 30,
    filter: "blur(6px)",
  },
  animate: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.3,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
  exit: {
    opacity: 0,
    x: 30,
    filter: "blur(6px)",
    transition: {
      duration: 0.3,
    },
  },
}

export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
}

export const staggerItem: Variants = {
  initial: {
    opacity: 0,
    y: 20,
    filter: "blur(4px)",
  },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.3,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
}

// Reusable animation components
interface AnimateProps extends MotionProps {
  children: ReactNode
  className?: string
}

export const FadeInUp = ({ children, className, ...props }: AnimateProps) => (
  <motion.div
    variants={fadeInUp}
    initial="initial"
    animate="animate"
    exit="exit"
    className={className}
    {...props}
  >
    {children}
  </motion.div>
)

export const FadeInScale = ({ children, className, ...props }: AnimateProps) => (
  <motion.div
    variants={fadeInScale}
    initial="initial"
    animate="animate"
    exit="exit"
    className={className}
    {...props}
  >
    {children}
  </motion.div>
)

export const SlideInFromLeft = ({ children, className, ...props }: AnimateProps) => (
  <motion.div
    variants={slideInFromLeft}
    initial="initial"
    animate="animate"
    exit="exit"
    className={className}
    {...props}
  >
    {children}
  </motion.div>
)

export const SlideInFromRight = ({ children, className, ...props }: AnimateProps) => (
  <motion.div
    variants={slideInFromRight}
    initial="initial"
    animate="animate"
    exit="exit"
    className={className}
    {...props}
  >
    {children}
  </motion.div>
)

export const StaggerContainer = ({ children, className, ...props }: AnimateProps) => (
  <motion.div
    variants={staggerContainer}
    initial="initial"
    animate="animate"
    className={className}
    {...props}
  >
    {children}
  </motion.div>
)

export const StaggerItem = ({ children, className, ...props }: AnimateProps) => (
  <motion.div
    variants={staggerItem}
    className={className}
    {...props}
  >
    {children}
  </motion.div>
)

// Page transition wrapper
export const PageTransition = ({ children, className, ...props }: AnimateProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
    exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
    transition={{
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94],
    }}
    className={className}
    {...props}
  >
    {children}
  </motion.div>
)

// Loading animation component
export const LoadingSpinner = ({ size = "md" }: { size?: "sm" | "md" | "lg" }) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  }

  return (
    <motion.div
      className={`${sizeClasses[size]} border-2 border-gray-200 border-t-blue-600 rounded-full`}
      animate={{ rotate: 360 }}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: "linear",
      }}
    />
  )
}

// Pulse animation for loading states
export const Pulse = ({ children, className, ...props }: AnimateProps) => (
  <motion.div
    animate={{
      opacity: [0.5, 1, 0.5],
    }}
    transition={{
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut",
    }}
    className={className}
    {...props}
  >
    {children}
  </motion.div>
)

// Scroll-triggered animation components
interface ScrollAnimateProps extends MotionProps {
  children: ReactNode
  className?: string
  threshold?: number
  triggerOnce?: boolean
}

export const ScrollFadeInUp = ({ 
  children, 
  className, 
  threshold = 0.1, 
  triggerOnce = true,
  ...props 
}: ScrollAnimateProps) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { 
    once: triggerOnce, 
    amount: threshold,
    margin: "-100px 0px"
  })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, filter: "blur(8px)" }}
      animate={isInView ? { 
        opacity: 1, 
        y: 0, 
        filter: "blur(0px)" 
      } : { 
        opacity: 0, 
        y: 50, 
        filter: "blur(8px)" 
      }}
      transition={{
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export const ScrollFadeInScale = ({ 
  children, 
  className, 
  threshold = 0.1, 
  triggerOnce = true,
  ...props 
}: ScrollAnimateProps) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { 
    once: triggerOnce, 
    amount: threshold,
    margin: "-100px 0px"
  })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8, filter: "blur(12px)" }}
      animate={isInView ? { 
        opacity: 1, 
        scale: 1, 
        filter: "blur(0px)" 
      } : { 
        opacity: 0, 
        scale: 0.8, 
        filter: "blur(12px)" 
      }}
      transition={{
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export const ScrollSlideInFromLeft = ({ 
  children, 
  className, 
  threshold = 0.1, 
  triggerOnce = true,
  ...props 
}: ScrollAnimateProps) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { 
    once: triggerOnce, 
    amount: threshold,
    margin: "-100px 0px"
  })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -100, filter: "blur(10px)" }}
      animate={isInView ? { 
        opacity: 1, 
        x: 0, 
        filter: "blur(0px)" 
      } : { 
        opacity: 0, 
        x: -100, 
        filter: "blur(10px)" 
      }}
      transition={{
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export const ScrollSlideInFromRight = ({ 
  children, 
  className, 
  threshold = 0.1, 
  triggerOnce = true,
  ...props 
}: ScrollAnimateProps) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { 
    once: triggerOnce, 
    amount: threshold,
    margin: "-100px 0px"
  })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 100, filter: "blur(10px)" }}
      animate={isInView ? { 
        opacity: 1, 
        x: 0, 
        filter: "blur(0px)" 
      } : { 
        opacity: 0, 
        x: 100, 
        filter: "blur(10px)" 
      }}
      transition={{
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}

// Parallax scroll effect
export const ParallaxScroll = ({ 
  children, 
  className, 
  speed = 0.5,
  ...props 
}: AnimateProps & { speed?: number }) => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", `${speed * 100}%`])

  return (
    <motion.div
      ref={ref}
      style={{ y }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}

// Staggered scroll animations
export const ScrollStaggerContainer = ({ 
  children, 
  className, 
  threshold = 0.1, 
  triggerOnce = true,
  ...props 
}: ScrollAnimateProps) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { 
    once: triggerOnce, 
    amount: threshold,
    margin: "-100px 0px"
  })

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.1,
            delayChildren: 0.05,
          },
        },
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export const ScrollStaggerItem = ({ 
  children, 
  className, 
  ...props 
}: AnimateProps) => {
  return (
    <motion.div
      variants={{
        hidden: { 
          opacity: 0, 
          y: 30, 
          filter: "blur(8px)" 
        },
        visible: { 
          opacity: 1, 
          y: 0, 
          filter: "blur(0px)",
          transition: {
            duration: 0.4,
            ease: [0.25, 0.46, 0.45, 0.94],
          },
        },
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}
