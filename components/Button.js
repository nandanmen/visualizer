import React from 'react'
import { motion } from 'framer-motion'
import clsx from 'clsx'

export function Button({ onClick, children, className, ...props }) {
  return (
    <motion.button
      className={clsx(
        'font-semibold bg-highlight border-3 border-stroke rounded-full w-10 h-10 flex items-center justify-center text-stroke text-sm hover:bg-tertiary',
        className
      )}
      whileHover={{ scale: 1.05 }}
      onClick={onClick}
      {...props}
    >
      {children}
    </motion.button>
  )
}
