import React from 'react'
import { AnimatePresence } from 'framer-motion'

import { Iterable, IterableItem } from '~components/Iterable'
import { makeAlgorithmPage } from '~lib/makeAlgorithmPage'

function RemoveDuplicates({ state, inputs }) {
  const { done, curr, result } = state
  const { arr } = inputs
  const isActive = (index) => index === curr

  return (
    <>
      <section>
        <Iterable>
          {arr.map((item, index) => (
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
            {result.map((item, index) => (
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

export default makeAlgorithmPage(
  {
    title: 'Remove Duplicates',
    pattern: 'Two Pointers',
    description: 'Given a sorted array, remove its duplicates.',
    algorithm: removeDuplicates,
    inputs: {
      arr: [2, 3, 3, 3, 6, 9, 9],
    },
  },
  RemoveDuplicates
)

// --

function removeDuplicates({ record }, { arr }) {
  const result = []

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== arr[i - 1]) {
      result.push(arr[i])
    }
    record({
      done: false,
      curr: i,
      result: [...result],
    })
  }

  record({
    done: true,
    result: [...result],
  })

  return result
}
