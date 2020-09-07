import React from 'react'
import { AnimatePresence } from 'framer-motion'

import { Iterable, IterableItem } from '~components/Iterable'
import { Algorithm } from '~components/Algorithm'
import { Pointer } from '~components/Pointer'
import { useAlgorithm } from '~lib/useAlgorithm'
import { addIds } from '~utils/helpers'

const input = [-2, -1, 0, 2, 3]

export default function SortedSquares() {
  const context = useAlgorithm(sortedSquare, { arr: input })

  const { done, head, tail, result } = context.models.state
  const { arr } = context.models.inputs
  const isActive = (index) => index === head || index === tail

  return (
    <Algorithm title="Sorted Squares" pattern="Two Pointers" context={context}>
      <section className="mb-4">
        <Iterable>
          {arr.map((item, index) => (
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
                  className={['rounded-md mr-2', { result: done }]}
                >
                  {item.val}
                </IterableItem>
              ))}
            </AnimatePresence>
          </Iterable>
        </section>
      )}
    </Algorithm>
  )
}

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

function sortedSquare({ record }, { arr }) {
  const withIds = addIds(arr)
  const squares = []

  let head = 0
  let tail = arr.length - 1

  while (head <= tail) {
    const currHead = withIds[head]
    const currTail = withIds[tail]

    const headSquare = currHead.val * currHead.val
    const tailSquare = currTail.val * currTail.val

    record({
      head,
      tail,
      result: [...squares],
      done: false,
    })

    if (headSquare < tailSquare) {
      squares.push({ val: tailSquare, id: currTail.id })
      tail--
    } else {
      squares.push({ val: headSquare, id: currHead.id })
      head++
    }
  }

  record({
    result: [...squares],
    done: false,
  })
  const reversed = squares.reverse()
  record({
    result: [...squares],
    done: true,
  })

  return reversed
}
