import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useMediaQuery } from 'beautiful-react-hooks'

const ItemMargin = 0.5

export function Window({ show, start, end }) {
  const isLarge = useMediaQuery('(min-width: 768px)')
  const windowSize = end - start + 1

  const itemWidth = isLarge ? 4 : 3
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          style={{
            width: `${
              windowSize * itemWidth + (windowSize - 1) * ItemMargin
            }rem`,
            left: `${start * itemWidth + start * ItemMargin}rem`,
          }}
          initial={{ opacity: 0, y: -80 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -80 }}
          className="border-stroke border-3 bg-secondary h-32 absolute rounded-lg z-10"
          layout
        />
      )}
    </AnimatePresence>
  )
}
