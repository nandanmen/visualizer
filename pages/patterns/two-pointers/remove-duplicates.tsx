import React from 'react'
import { AnimatePresence } from 'framer-motion'

import { Iterable, IterableItem } from '~components/Iterable'
import defineAlgorithm from '~lib/defineAlgorithm'
import snapshot from '../../../lib/snapshot.macro'

export default defineAlgorithm(
  {
    title: 'Remove Duplicates',
    pattern: 'Two Pointers',
    description: 'Given a sorted array, remove its duplicates.',
    algorithm: snapshot((arr: number[]) => {
      const result = []

      for (let i = 0; i < arr.length; i++) {
        if (arr[i] !== arr[i - 1]) {
          result.push(arr[i])
        }

        debugger
      }

      debugger
      return result
    }),
    inputs: [[2, 3, 3, 3, 6, 9, 9]],
  },
  RemoveDuplicates
)

function RemoveDuplicates({ state, inputs }) {
  const { __done: done, i: curr, result } = state
  const [arr] = inputs
  const isActive = (index: number) => index === curr
  return (
    <>
      <section>
        <Iterable>
          {arr.map((item: number, index: number) => (
            <IterableItem
              key={`${item}-${index}`}
              active={isActive(index)}
              pointer={isActive(index)}
            >
              {item}
            </IterableItem>
          ))}
        </Iterable>
      </section>
      <section className="mt-8">
        <Iterable>
          <AnimatePresence>
            {result.map((item: number, index: number) => (
              <IterableItem
                key={`${item}-${index}`}
                animate="active"
                initial="hidden"
                exit="hidden"
                className={{ result: done }}
              >
                {item}
              </IterableItem>
            ))}
          </AnimatePresence>
        </Iterable>
      </section>
    </>
  )
}
