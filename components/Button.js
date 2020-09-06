import React from 'react'
import { motion } from 'framer-motion'
import clsx from 'clsx'

export function Button({ onClick, children, className, ...props }) {
  return (
    <motion.button
      className={clsx(
        'font-semibold bg-gray-200 rounded-full w-10 h-10 flex items-center justify-center text-gray-800',
        className
      )}
      onClick={onClick}
      {...props}
    >
      {children}
    </motion.button>
  )
}
