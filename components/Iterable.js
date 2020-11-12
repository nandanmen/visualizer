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

export function IterableItem({
  children,
  className,
  active,
  pointer,
  ...motionProps
}) {
  return (
    <motion.div
      variants={variants}
      animate={active ? 'active' : 'inactive'}
      className={clsx(
        'w-16 h-16 flex items-center border-3 border-stroke text-stroke bg-highlight justify-center text-xl mr-2 rounded-md z-20',
        { 'z-30': active },
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
