import React from 'react'
import { AnimatePresence } from 'framer-motion'

import { Iterable, IterableItem } from '~components/Iterable'
import { Algorithm } from '~components/Algorithm'
import { Window } from '~components/Window'
import { useAlgorithm } from '~lib/useAlgorithm'

const args = {
  str: 'aabccbb',
}

export default function NonRepeatSubstring() {
  const context = useAlgorithm(nonRepeatSubstring, args)

  const { done, start, end, maxStr } = context.models.state
  const { str } = context.models.inputs

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
    <Algorithm title="Non-Repeat Substring" pattern="Sliding Window">
      <Algorithm.Controls context={context} />
      <Algorithm.Display>
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
            <AnimatePresence>
              {!done && <Window start={start} end={end} />}
            </AnimatePresence>
          </Iterable>
        </section>
        <section className="mt-16">
          <code className="block">Max size: {maxStr[1] - maxStr[0] + 1}</code>
        </section>
      </Algorithm.Display>
    </Algorithm>
  )
}

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
