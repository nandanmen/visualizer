import React from 'react'

import { Iterable, IterableItem } from '~components/Iterable'
import { Window } from '~components/Window'
import defineAlgorithm from '~lib/defineAlgorithm'
import snapshot from '../../../lib/snapshot.macro'

export default defineAlgorithm(
  {
    title: 'Find All Averages',
    pattern: 'Sliding Window',
    description:
      'Given an array, find the averages of all subarrays of size k.',
    inputs: [[1, 3, 2, 6, -1, 4, 1, 8, 2], 3],
    algorithm: snapshot((arr: number[], k: number) => {
      const result = []
      let windowStart = 0
      let windowSum = 0

      for (let windowEnd = 0; windowEnd < arr.length; windowEnd++) {
        windowSum += arr[windowEnd]
        debugger

        if (windowEnd >= k - 1) {
          result.push((windowSum / k).toFixed(2))
          windowSum -= arr[windowStart]
          windowStart++
        }
      }

      debugger
      return result
    }),
  },
  function FindAllAverages({ state, inputs }) {
    const { __done: done, windowStart, windowEnd, result } = state
    const [arr, k] = inputs
    const isActive = (index: number) =>
      done ? true : index >= windowStart && index <= windowEnd
    return (
      <>
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
            <Window show={!done} start={windowStart} end={windowEnd} />
          </Iterable>
          <section className="mt-16">
            <code className="block">Subarray size: {k}</code>
            <code className="block">
              Result: {JSON.stringify(result.map(Number), null, 2)}
            </code>
          </section>
        </section>
      </>
    )
  }
)
