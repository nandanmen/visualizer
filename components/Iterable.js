import React from 'react'
import { motion } from 'framer-motion'
import clsx from 'clsx'

const variants = {
  active: {
    opacity: 1,
    y: 0,
  },
  inactive: {
    opacity: 0.2,
    y: 10,
  },
  hidden: {
    opacity: 0,
    y: 20,
  },
}

export function Iterable({ children }) {
  return <div className="flex items-center relative">{children}</div>
}

export function IterableItem({ children, className, ...motionProps }) {
  return (
    <motion.div
      variants={variants}
      className={clsx(
        'w-16 h-16 bg-blue-500 text-white flex items-center justify-center text-xl',
        className
      )}
      layout
      {...motionProps}
    >
      {children}
    </motion.div>
  )
}
