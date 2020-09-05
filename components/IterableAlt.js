import React from 'react'
import { motion } from 'framer-motion'
import clsx from 'clsx'

export function Iterable({ children }) {
  return <div className="flex items-center relative">{children}</div>
}

export function IterableItem({ children, className, ...motionProps }) {
  return (
    <motion.div
      className={clsx(
        'w-16 h-16 bg-blue-500 text-white flex items-center justify-center text-xl',
        className
      )}
      {...motionProps}
    >
      {children}
    </motion.div>
  )
}
