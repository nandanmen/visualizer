import React from 'react'
import { AnimateSharedLayout, AnimatePresence } from 'framer-motion'

import { Iterable, IterableItem } from '~components/Iterable'
import { Algorithm } from '~components/Algorithm'
import { Pointer } from '~components/Pointer'
import { useAlgorithm } from '~lib/useAlgorithm'

export default function RemoveDuplicates() {
  const input = [2, 3, 3, 3, 6, 9, 9]
  const state = useAlgorithm(removeDuplicates, [input])

  const { done, curr, result } = state.models.state
  const isActive = (index) => index === curr

  return (
    <Algorithm title="Remove Duplicates" pattern="Two Pointers" state={state}>
      <section>
        <Iterable>
          {input.map((item, index) => (
            <IterableItem
              key={`${item}-${index}`}
              animate={isActive(index) ? 'active' : 'inactive'}
              className={'rounded-md mr-2'}
            >
              {item}
              {isActive(index) && <Pointer />}
            </IterableItem>
          ))}
        </Iterable>
      </section>
      <section className="mt-8">
        <Iterable>
          <AnimateSharedLayout>
            <AnimatePresence>
              {result.map((item, index) => (
                <IterableItem
                  key={`${item}-${index}`}
                  animate="active"
                  initial="hidden"
                  exit="hidden"
                  className={['rounded-md mr-2', { result: done }]}
                  layout
                >
                  {item}
                </IterableItem>
              ))}
            </AnimatePresence>
          </AnimateSharedLayout>
        </Iterable>
      </section>
    </Algorithm>
  )
}

function removeDuplicates({ record }, arr) {
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

  return result
}
