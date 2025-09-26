"use client"

import { motion } from "framer-motion"
import { ReactNode } from "react"
import { LoadingSpinner, Pulse } from "./animate"

interface LoadingOverlayProps {
  isLoading: boolean
  children: ReactNode
  message?: string
  blur?: boolean
}

export const LoadingOverlay = ({ 
  isLoading, 
  children, 
  message = "Loading...", 
  blur = true 
}: LoadingOverlayProps) => {
  if (!isLoading) return <>{children}</>

  return (
    <div className="relative">
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: blur ? 0.3 : 1 }}
        transition={{ duration: 0.3 }}
        className={blur ? "blur-sm pointer-events-none" : ""}
      >
        {children}
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm"
      >
        <div className="flex flex-col items-center gap-4">
          <LoadingSpinner size="lg" />
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 font-medium"
          >
            {message}
          </motion.p>
        </div>
      </motion.div>
    </div>
  )
}

interface LoadingCardProps {
  isLoading: boolean
  children: ReactNode
  skeleton?: ReactNode
}

export const LoadingCard = ({ isLoading, children, skeleton }: LoadingCardProps) => {
  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full"
      >
        {skeleton || <DefaultSkeleton />}
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  )
}

const DefaultSkeleton = () => (
  <div className="space-y-4 p-6 border rounded-lg bg-gray-50">
    <Pulse>
      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
    </Pulse>
    <Pulse>
      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
    </Pulse>
    <Pulse>
      <div className="h-4 bg-gray-200 rounded w-5/6"></div>
    </Pulse>
  </div>
)

interface LoadingButtonProps {
  isLoading: boolean
  children: ReactNode
  loadingText?: string
  disabled?: boolean
  className?: string
  onClick?: () => void
  variant?: "default" | "outline" | "ghost" | "destructive"
  type?: "button" | "submit" | "reset"
}

export const LoadingButton = ({ 
  isLoading, 
  children, 
  loadingText = "Loading...", 
  disabled,
  className = "",
  onClick,
  variant = "default",
  type = "button"
}: LoadingButtonProps) => {
  const getVariantClasses = () => {
    switch (variant) {
      case "outline":
        return disabled || isLoading 
          ? "border-gray-300 text-gray-500 cursor-not-allowed bg-transparent" 
          : "border-input bg-transparent hover:bg-accent hover:text-accent-foreground"
      case "ghost":
        return disabled || isLoading 
          ? "text-gray-500 cursor-not-allowed" 
          : "hover:bg-accent hover:text-accent-foreground"
      case "destructive":
        return disabled || isLoading 
          ? "bg-gray-300 text-gray-500 cursor-not-allowed" 
          : "bg-destructive text-destructive-foreground hover:bg-destructive/90"
      default:
        return disabled || isLoading 
          ? "bg-gray-300 text-gray-500 cursor-not-allowed" 
          : "bg-primary text-primary-foreground hover:bg-primary/90"
    }
  }

  return (
    <motion.button
      whileHover={{ scale: disabled || isLoading ? 1 : 1.02 }}
      whileTap={{ scale: disabled || isLoading ? 1 : 0.98 }}
      disabled={disabled || isLoading}
      onClick={onClick}
      type={type}
      className={`relative px-4 py-2 rounded-md font-medium transition-colors border cursor-pointer ${
        variant === "outline" ? "border" : "border-transparent"
      } ${getVariantClasses()} ${className}`}
    >
      {isLoading ? (
        <div className="flex items-center gap-2">
          <LoadingSpinner size="sm" />
          <span>{loadingText}</span>
        </div>
      ) : (
        children
      )}
    </motion.button>
  )
}

interface LoadingPageProps {
  message?: string
  showSpinner?: boolean
}

export const LoadingPage = ({ message = "Loading...", showSpinner = true }: LoadingPageProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex items-center justify-center bg-gray-50"
    >
      <div className="text-center space-y-6">
        {showSpinner && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <LoadingSpinner size="lg" />
          </motion.div>
        )}
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-2"
        >
          <h2 className="text-xl font-semibold text-gray-800">{message}</h2>
          <motion.div
            className="flex justify-center space-x-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-blue-600 rounded-full"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  )
}
