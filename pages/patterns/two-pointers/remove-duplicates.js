import React from 'react'
import { AnimatePresence } from 'framer-motion'

import { Iterable, IterableItem } from '~components/Iterable'
import { Algorithm } from '~components/Algorithm'
import { useAlgorithm } from '~lib/useAlgorithm'

const input = [2, 3, 3, 3, 6, 9, 9]
const { variants } = IterableItem

export default function RemoveDuplicates() {
  const context = useAlgorithm(removeDuplicates, { arr: input })

  const { done, curr, result } = context.models.state
  const { arr } = context.models.inputs
  const isActive = (index) => index === curr

  return (
    <Algorithm
      title="Remove Duplicates"
      pattern="Two Pointers"
      context={context}
    >
      <section>
        <Iterable>
          {arr.map((item, index) => (
            <IterableItem
              key={`${item}-${index}`}
              active={isActive(index)}
              pointer={isActive(index)}
              variant={variants.rounded}
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
                variant={variants.rounded}
              >
                {item}
              </IterableItem>
            ))}
          </AnimatePresence>
        </Iterable>
      </section>
    </Algorithm>
  )
}

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
