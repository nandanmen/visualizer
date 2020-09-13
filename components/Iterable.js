import React from 'react'
import { motion } from 'framer-motion'
import clsx from 'clsx'

import { Pointer } from './Pointer'

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

const itemVariants = {
  rounded: 'rounded-md mr-2',
}

export function IterableItem({
  children,
  className,
  variant = '',
  active,
  pointer,
  ...motionProps
}) {
  return (
    <motion.div
      variants={variants}
      animate={active ? 'active' : 'inactive'}
      className={clsx(
        'w-16 h-16 bg-blue-500 text-white flex items-center justify-center text-xl',
        itemVariants[variant],
        className
      )}
      layout
      {...motionProps}
    >
      {children}
      {pointer && <Pointer />}
    </motion.div>
  )
}

IterableItem.variants = Object.fromEntries(
  Object.entries(itemVariants).map(([key]) => [key, key])
)
