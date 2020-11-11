import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function Window({ show, start, end }) {
  const windowSize = end - start + 1
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          style={{ width: `${windowSize * 4}rem`, left: `${start * 4}rem` }}
          initial={{ opacity: 0, y: -80 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -80 }}
          className="border-black border-4 h-32 absolute rounded-lg"
          layout
        />
      )}
    </AnimatePresence>
  )
}
