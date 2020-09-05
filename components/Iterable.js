import React from 'react'
import { motion } from 'framer-motion'

const variants = {
  active: {
    opacity: 1,
    y: 0,
  },
  disabled: {
    opacity: 0.2,
    y: 10,
  },
}

export function Iterable({ activeIndices, data, children }) {
  const dataAsArr = [...data]
  return (
    <div className="flex items-center relative">
      {dataAsArr.map((item, i) => (
        <motion.div
          variants={variants}
          animate={activeIndices.includes(i) ? 'active' : 'disabled'}
          className="w-16 h-16 bg-blue-500 text-white flex items-center justify-center text-xl"
          key={i}
        >
          {item}
        </motion.div>
      ))}
      {children}
    </div>
  )
}
