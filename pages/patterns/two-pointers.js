import React, { useState, useEffect } from 'react'
import { BiUpArrow } from 'react-icons/bi'

import { getAlgorithms } from '../../lib/algorithm'
import { Iterable, IterableItem } from '../../components/Iterable'
import { Controls } from '../../components/Controls'
import { Loading } from '../../components/Loading'
import { PatternLayout } from '../../components/PatternLayout'
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

export default function TwoPointersPage({ files }) {
  const algorithms = useImplementation('two-pointers', files)

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
    const [input, target] = args
    const { done, head, tail, result } = state
    const isResult = (index) =>
      done && result ? result.includes(index) : false
    const notFound = done && result === null
    const isActive = (index) =>
      notFound || isResult(index) || index === head || index === tail
    const showArrow = (index) => (done ? false : isActive(index))

    return (
      <PatternLayout name="Two Pointers">
        <Controls
          algorithms={algorithms}
          activeAlgorithm={activeAlgorithm}
          isPlaying={isPlaying}
          toggle={toggle}
          reset={reset}
          onSelect={setActiveAlgorithm}
        />
        <section className="w-full flex flex-col items-center">
          <Iterable>
            {input.map((item, index) => (
              <IterableItem
                variants={variants}
                key={item}
                animate={isActive(index) ? 'active' : 'inactive'}
                className={[
                  'relative',
                  {
                    result: isResult(index),
                    'not-found': notFound,
                  },
                ]}
              >
                {item}
                {showArrow(index) && (
                  <div className="arrow-down absolute text-blue-500">
                    <BiUpArrow />
                  </div>
                )}
              </IterableItem>
            ))}
          </Iterable>
          <section className="mt-8">
            <code className="block">
              Iteration: {steps.indexOf(state) + 1} / {steps.length}
            </code>
            <code className="block">Target: {target}</code>
            {notFound && <code className="block">Not found :(</code>}
          </section>
        </section>
      </PatternLayout>
    )
  }

  return <Loading />
}

export async function getStaticProps() {
  return {
    props: {
      files: getAlgorithms('two-pointers'),
    },
  }
}
