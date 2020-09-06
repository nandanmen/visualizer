import React from 'react'
import { AnimatePresence } from 'framer-motion'

import { Iterable, IterableItem } from '~components/Iterable'
import { Algorithm } from '~components/Algorithm'
import { Window } from '~components/Window'
import { useAlgorithm } from '~lib/useAlgorithm'

const args = {
  arr: [1, 3, 2, 6, -1, 4, 1, 8, 2],
  k: 3,
}

export default function FindAllAverages() {
  const context = useAlgorithm(findAllAverages, args)

  const { done, start, end, result } = context.models.state
  const { arr, k } = context.models.inputs
  const isActive = (index) => index >= start && index <= end

  return (
    <Algorithm
      title="Find All Averages"
      pattern="Sliding Window"
      context={context}
    >
      <section className="pt-8">
        <Iterable>
          {Array.from(arr).map((item, index) => (
            <IterableItem
              key={`${item}-${index}`}
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
          <code className="block">Subarray size: {k}</code>
          <code className="block">
            Result: {JSON.stringify(result.map(Number), null, 2)}
          </code>
        </section>
      </section>
    </Algorithm>
  )
}

function findAllAverages({ record }, { arr, k }) {
  const result = []
  let windowStart = 0
  let windowSum = 0
  for (let windowEnd = 0; windowEnd < arr.length; windowEnd++) {
    windowSum += arr[windowEnd]
    record({
      start: windowStart,
      end: windowEnd,
      sum: windowSum,
      result: [...result],
    })

    if (windowEnd >= k - 1) {
      result.push((windowSum / k).toFixed(2))
      windowSum -= arr[windowStart]
      windowStart++
    }
  }
  return result
}
