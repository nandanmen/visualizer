import React from 'react'

import findPairWithSum from '../../algorithms/two-pointers/pair-sum'
import { Iterable, IterableItem } from '../../components/IterableAlt'
import { Controls } from '../../components/Controls'
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

const args = [[1, 2, 3, 4, 6, 9, 12], 7]
const [input, target] = args

export default function TwoPointersPage() {
  const { state, steps, isPlaying, toggle, reset } = useAlgorithm(
    findPairWithSum,
    args
  )
  const { done, head, tail, result } = state
  const isResult = (index) => (done && result ? result.includes(index) : false)
  const notFound = done && result === null
  const isActive = (index) =>
    notFound || isResult(index) || index === head || index === tail

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <main style={{ minWidth: '50vw' }}>
        <h1 className="text-3xl font-semibold mb-4">Two Pointers</h1>
        <Controls
          options={[findPairWithSum]}
          algorithm={findPairWithSum.__vizName}
          isPlaying={isPlaying}
          toggle={toggle}
          reset={reset}
        />
        <section className="w-full flex flex-col items-center">
          <Iterable>
            {input.map((item, index) => (
              <div className="relative" key={item}>
                <IterableItem
                  variants={variants}
                  animate={isActive(index) ? 'active' : 'inactive'}
                  className={
                    isResult(index)
                      ? 'result'
                      : notFound
                      ? 'not-found'
                      : undefined
                  }
                >
                  {item}
                </IterableItem>
              </div>
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
      </main>
    </div>
  )
}
