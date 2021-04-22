import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const ItemMargin = 0.5
const ItemWidth = 4

export function Window({ show, start, end }) {
  const windowSize = end - start + 1
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          style={{
            width: `${
              windowSize * ItemWidth + (windowSize - 1) * ItemMargin
            }rem`,
            left: `${start * ItemWidth + start * ItemMargin}rem`,
          }}
          initial={{ opacity: 0, y: -80 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -80 }}
          className="border-stroke border-3 bg-white h-32 absolute rounded-lg z-10"
          layout
        />
      )}
    </AnimatePresence>
  )
}
