import React, { useContext } from 'react'

import { AlgorithmContext } from '../components/Algorithm'
import { IterableWindow } from '../components/IterableWindow'

export function SlidingWindow() {
  const context = useContext(AlgorithmContext)

  if (!context) {
    throw new Error(
      `SlidingWindow is being used outside of an AlgorithmContext`
    )
  }

  const { steps, activeStepIndex, args } = context
  const { start, end, result } = steps[activeStepIndex]
  return (
    <div className="w-full flex flex-col items-center justify-center pt-16 pb-8">
      <IterableWindow data={args[0]} start={start} end={end} />
      <div className="mt-16 text-center">
        <p>
          <code>
            Iteration: {activeStepIndex + 1} / {steps.length}
          </code>
        </p>
        <p>
          <code>Result: {JSON.stringify(result, null, 2)}</code>
        </p>
      </div>
    </div>
  )
}
