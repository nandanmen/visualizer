import React from 'react'

import { Iterable, IterableItem } from '~components/Iterable'
import { makeAlgorithmPage } from '~lib/makeAlgorithmPage'
import { Window } from '~components/Window'

function NonRepeatSubstring({ state, inputs }) {
  const { done, start, end, maxStr } = state
  const { str } = inputs

  const isActive = (index) =>
    inResult(index) || (index >= start && index <= end)
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
          <Window show={!done} start={start} end={end} />
        </Iterable>
      </section>
      <section className="mt-16">
        <code className="block">Max size: {maxStr[1] - maxStr[0] + 1}</code>
      </section>
    </>
  )
}

export default makeAlgorithmPage(
  {
    title: 'Non-Repeat Substring',
    pattern: 'Sliding Window',
    description:
      'Given a string, find the longest substring with no repeating characters.',
    algorithm: nonRepeatSubstring,
    inputs: {
      str: 'aabccbb',
    },
  },
  NonRepeatSubstring
)

// --

function nonRepeatSubstring({ record }, { str }) {
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

    record({
      start: windowStart,
      end: windowEnd,
      maxStr,
    })

    while (windowUniqueCount !== windowEnd - windowStart + 1) {
      const startChar = str[windowStart]
      seen[startChar]--
      if (seen[startChar] === 0) {
        windowUniqueCount--
      }
      windowStart++

      record({
        start: windowStart,
        end: windowEnd,
        maxStr,
      })
    }

    const [head, tail] = maxStr
    if (tail - head < windowEnd - windowStart) {
      maxStr = [windowStart, windowEnd]
    }
    windowEnd++
  }

  record({
    done: true,
    maxStr,
  })

  return maxStr
}
