import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

import { getAlgorithms } from '../../lib/algorithm'
import { Iterable, IterableItem } from '../../components/IterableAlt'
import { Controls } from '../../components/Controls'
import { Layout } from '../../components/Layout'
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
      <Layout title={title}>
        <Link href="/">Home</Link>
        <h1 className="text-3xl font-semibold mb-4">{title}</h1>
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
      </Layout>
    )
  }

  return (
    <Layout title="Loading...">
      <h1 className="text-3xl font-semibold mb-4">Loading...</h1>
    </Layout>
  )
}

function Window({ start, end }) {
  const windowSize = end - start + 1
  return (
    <motion.div
      style={{ width: `${windowSize * 4}rem`, left: `${start * 4}rem` }}
      initial={{ opacity: 0, x: -500 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 500 }}
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
