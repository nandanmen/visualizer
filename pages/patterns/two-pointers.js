import React, { useState } from 'react'
import { BiUpArrow } from 'react-icons/bi'

import findPairWithSum from '../../algorithms/two-pointers/pair-sum'
import { Iterable, IterableItem } from '../../components/Iterable'
import { Controls } from '../../components/Controls'
import { Layout } from '../../components/Layout'
import { PatternLayout } from '../../components/PatternLayout'
import { useAlgorithm } from '../../lib/useAlgorithm'

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

export default function TwoPointersPage() {
  const [args] = useState([[1, 2, 3, 4, 6, 9, 12], 21])
  const { state, steps, isPlaying, toggle, reset } = useAlgorithm(
    findPairWithSum,
    args
  )

  const [input, target] = args
  const { done, head, tail, result } = state
  const isResult = (index) => (done && result ? result.includes(index) : false)
  const notFound = done && result === null
  const isActive = (index) =>
    notFound || isResult(index) || index === head || index === tail
  const showArrow = (index) => (done ? false : isActive(index))

  return (
    <PatternLayout name="Two Pointers">
      <Controls
        algorithms={{ findPairWithSum }}
        activeAlgorithm="findPairWithSum"
        isPlaying={isPlaying}
        toggle={toggle}
        reset={reset}
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
