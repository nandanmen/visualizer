import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

import { getAlgorithms } from '../../lib/algorithm'
import { Iterable, IterableItem } from '../../components/Iterable'
import { Pattern, usePatternContext } from '../../components/Pattern'

const variants = {
  active: {
    opacity: 1,
    y: 0,
  },
  inactive: {
    opacity: 0.2,
    y: 10,
  },
}

function SlidingWindow() {
  const { models } = usePatternContext()
  const { activeAlgorithm, args, state, steps } = models
  const [input] = args
  const { done, start, end } = state
  const isActive = (index) => (done ? true : index >= start && index <= end)
  return (
    <>
      <Iterable>
        {Array.from(input).map((item, index) => (
          <IterableItem
            variants={variants}
            key={`${activeAlgorithm}-${item}-${index}`}
            animate={isActive(index) ? 'active' : 'inactive'}
            className={{
              result: done,
            }}
          >
            {item}
          </IterableItem>
        ))}
        <AnimatePresence>
          {!done && <Window start={start} end={end} />}
        </AnimatePresence>
      </Iterable>
      <section className="mt-16">
        <code className="block">
          Iteration: {steps.indexOf(state) + 1} / {steps.length}
        </code>
      </section>
    </>
  )
}

function Window({ start, end }) {
  const windowSize = end - start + 1
  return (
    <motion.div
      style={{ width: `${windowSize * 4}rem`, left: `${start * 4}rem` }}
      initial={{ opacity: 0, y: -80 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 80 }}
      className="border-black border-4 h-32 absolute rounded-lg"
      layout
    />
  )
}

const pattern = 'sliding-window'

export default function SlidingWindowPage({ files }) {
  return (
    <Pattern name="Sliding Window" pattern={pattern} files={files}>
      <SlidingWindow />
    </Pattern>
  )
}

export async function getStaticProps() {
  return {
    props: {
      files: getAlgorithms(pattern),
    },
  }
}
