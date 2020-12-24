import React from 'react'

import { Iterable, IterableItem } from '~components/Iterable'
import { Window } from '~components/Window'
import defineAlgorithm from '~lib/defineAlgorithm'
import snapshot from '../../../lib/snapshot.macro'

export default defineAlgorithm(
  {
    title: 'Non-Repeat Substring',
    pattern: 'Sliding Window',
    description:
      'Given a string, find the longest substring with no repeating characters.',
    inputs: ['aabccbb'],
    algorithm: snapshot((str: string) => {
      const seen = {}
      let windowStart = 0
      let windowEnd = 0
      let windowUniqueCount = 0

      let maxStr = [0, 0]

      while (windowEnd < str.length) {
        const char = str[windowEnd]
        if (seen[char]) {
          seen[char]++
        } else {
          seen[char] = 1
          windowUniqueCount++
        }
        debugger

        while (windowUniqueCount !== windowEnd - windowStart + 1) {
          const startChar = str[windowStart]
          seen[startChar]--
          if (seen[startChar] === 0) {
            windowUniqueCount--
          }
          windowStart++
          debugger
        }

        const [head, tail] = maxStr
        if (tail - head < windowEnd - windowStart) {
          maxStr = [windowStart, windowEnd]
        }
        windowEnd++
      }

      debugger
      return maxStr
    }),
  },
  NonRepeatSubstring
)

function NonRepeatSubstring({ state, inputs }) {
  const { __done: done, windowStart, windowEnd, maxStr } = state
  const [str] = inputs

  const isActive = (index) =>
    done ? inResult(index) : index >= windowStart && index <= windowEnd
  const inResult = (index) => {
    if (done) {
      const [head, tail] = maxStr
      return index >= head && index <= tail
    }
    return false
  }

  return (
    <>
      <section className="pt-8">
        <Iterable>
          {Array.from(str).map((item, index) => (
            <IterableItem
              key={`${item}-${index}`}
              animate={isActive(index) ? 'active' : 'inactive'}
              className={{
                result: inResult(index),
              }}
            >
              {item}
            </IterableItem>
          ))}
          <Window show={!done} start={windowStart} end={windowEnd} />
        </Iterable>
      </section>
      <section className="mt-16">
        <code className="block">Max size: {maxStr[1] - maxStr[0] + 1}</code>
      </section>
    </>
  )
}
