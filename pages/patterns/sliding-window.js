import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

import { getAlgorithms } from '../../lib/algorithm'
import { Iterable, IterableItem } from '../../components/Iterable'
import { Controls } from '../../components/Controls'
import { PatternLayout } from '../../components/PatternLayout'
import { Loading } from '../../components/Loading'
import { useAlgorithm } from '../../lib/useAlgorithm'
import { useImplementation } from '../../lib/useImplementation'

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

const title = 'Sliding Window'

export default function SlidingWindowPage({ files }) {
  const algorithms = useImplementation('sliding-window', files)

  const [activeAlgorithm, setActiveAlgorithm] = useState(files[0])
  const [args, setArgs] = useState(null)

  const func = algorithms && algorithms[activeAlgorithm]
  const { state, steps, isPlaying, toggle, reset } = useAlgorithm(func, args)

  useEffect(() => {
    if (func && typeof func === 'function') {
      setArgs(func.__defaultInput)
    }
  }, [func])

  if (steps.length > 0) {
    const [input] = args
    const { done, start, end } = state
    const isActive = (index) => (done ? true : index >= start && index <= end)

    return (
      <PatternLayout name={title}>
        <Controls
          algorithms={algorithms}
          activeAlgorithm={activeAlgorithm}
          isPlaying={isPlaying}
          toggle={toggle}
          reset={reset}
          onSelect={setActiveAlgorithm}
        />
        <section className="w-full mt-16 flex flex-col items-center">
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
        </section>
      </PatternLayout>
    )
  }

  return <Loading />
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

export async function getStaticProps() {
  return {
    props: {
      files: getAlgorithms('sliding-window'),
    },
  }
}
