import React from 'react'
import { motion } from 'framer-motion'
import { Iterable } from './Iterable'

export function IterableWindow({ data, start, end }) {
  const inWindow = (index) => index >= start && index <= end
  const windowSize = end - start + 1

  const activeIndices = [...data].reduce((acc, _, i) => {
    if (inWindow(i)) {
      acc.push(i)
    }
    return acc
  }, [])

  return (
    <Iterable data={data} activeIndices={activeIndices}>
      <motion.div
        style={{ width: `${windowSize * 4}rem`, left: `${start * 4}rem` }}
        className="border-black border-4 h-32 absolute rounded-lg"
        layout
      />
    </Iterable>
  )
}
