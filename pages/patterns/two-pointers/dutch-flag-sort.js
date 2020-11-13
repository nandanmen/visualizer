import React from 'react'

import { Iterable, IterableItem } from '~components/Iterable'
import { makeAlgorithmPage } from '~lib/makeAlgorithmPage'
import { addIds } from '~utils/helpers'

function DutchFlagSort({ state }) {
  const { done, input, curr, high, low } = state
  const isActive = (index) => done || [curr, high, low].includes(index)
  return (
    <>
      <section>
        <Iterable>
          {input.map((item, index) => (
            <IterableItem
              key={item.id}
              active={isActive(index)}
              className={{ result: done }}
              pointer={!done && isActive(index)}
            >
              {item.val}
            </IterableItem>
          ))}
        </Iterable>
      </section>
      {!done && (
        <section className="mt-8">
          <span className="mr-2">curr: {curr}</span>
          <span className="mr-2">high: {high}</span>
          <span>low: {low}</span>
        </section>
      )}
    </>
  )
}

export default makeAlgorithmPage(
  {
    title: 'Dutch Flag Sort',
    pattern: 'Two Pointers',
    description:
      'Given an array of only 0s, 1s, and 2s, sort the array in linear time.',
    algorithm: dutchFlagSort,
    inputs: { arr: [2, 2, 0, 1, 2, 0] },
  },
  DutchFlagSort
)

// --

function dutchFlagSort({ record }, { arr }) {
  const nums = addIds(arr)
  const recordWithNums = (data) => record({ input: [...nums], ...data })

  let low = 0
  let high = arr.length - 1

  let curr = 0
  while (curr <= high) {
    const num = nums[curr].val
    recordWithNums({ curr, high, low })
    if (num === 0) {
      if (curr !== low) {
        swap(nums, curr, low)
        recordWithNums({ curr, high, low })
      }
      curr++
      low++
    } else if (num === 1) {
      curr++
    } else if (num === 2) {
      swap(nums, curr, high)
      recordWithNums({ curr, high, low })
      high--
    }
  }

  recordWithNums({ done: true })
  return nums
}

const swap = (arr, i, j) => {
  const temp = arr[i]
  arr[i] = arr[j]
  arr[j] = temp
}
