import React from 'react'
import { AnimatePresence } from 'framer-motion'

import { Iterable, IterableItem } from '~components/Iterable'
import defineAlgorithm from '~lib/defineAlgorithm'
import { addIds } from '~utils/helpers'
import snapshot from '../../../lib/snapshot.macro'

export default defineAlgorithm(
  {
    title: 'Sorted Squares',
    pattern: 'Two Pointers',
    description:
      'Given a sorted array, return a sorted array of each element squared.',
    algorithm: snapshot((arr: number[]) => {
      const withIds = addIds(arr)
      let result = []
      let head = 0
      let tail = arr.length - 1

      while (head <= tail) {
        const currHead = withIds[head]
        const currTail = withIds[tail]

        const headSquare = currHead.val * currHead.val
        const tailSquare = currTail.val * currTail.val

        debugger

        if (headSquare < tailSquare) {
          result.push({ val: tailSquare, id: currTail.id })
          tail--
        } else {
          result.push({ val: headSquare, id: currHead.id })
          head++
        }
      }

      debugger
      result = result.reverse()
      debugger

      return result
    }),
    inputs: [[-2, -1, 0, 2, 3]],
  },
  SortedSquares
)

function SortedSquares({ state, inputs }) {
  const { __done: done, head, tail, result } = state
  const [arr] = inputs
  const isActive = (index) => index === head || index === tail

  return (
    <>
      <section className="mb-4">
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
      {result.length > 0 && (
        <section className="mt-4">
          <Iterable>
            <AnimatePresence>
              {result.map((item) => (
                <IterableItem
                  key={item.id}
                  animate="active"
                  initial="hidden"
                  exit="hidden"
                  className={{ result: done }}
                >
                  {item.val}
                </IterableItem>
              ))}
            </AnimatePresence>
          </Iterable>
        </section>
      )}
    </>
  )
}

// --

// Uncomment this to use the non-optimal O(nlogn) version
/* function sortedSquaresNLogN({ record }, { arr }) {
  const withIds = arr.map((n) => ({ val: n, id: v4() }))
  const squared = []

  for (let i = 0; i < withIds.length; i++) {
    const { val, id } = withIds[i]
    squared.push({ id, val: val * val })
    record({
      done: false,
      curr: i,
      result: [...squared],
    })
  }

  squared.sort((a, b) => a.val - b.val)
  record({ done: true, result: [...squared] })

  return squared
} */
