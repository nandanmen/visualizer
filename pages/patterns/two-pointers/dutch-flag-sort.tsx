import React from 'react'

import { Iterable, IterableItem } from '~components/Iterable'
import defineAlgorithm from '~lib/defineAlgorithm'
import { addIds } from '~utils/helpers'
import snapshot from '../../../lib/snapshot.macro'

export default defineAlgorithm(
  {
    title: 'Dutch Flag Sort',
    pattern: 'Two Pointers',
    description:
      'Given an array of only 0s, 1s, and 2s, sort the array in linear time.',
    algorithm: snapshot((arr: number[]) => {
      function swap(arr: any[], i: number, j: number) {
        const temp = arr[i]
        arr[i] = arr[j]
        arr[j] = temp
      }

      const nums = addIds(arr)
      let low = 0
      let high = arr.length - 1
      let curr = 0

      while (curr <= high) {
        const num = nums[curr].val
        debugger

        if (num === 0) {
          if (curr !== low) {
            swap(nums, curr, low)
            debugger
          }

          curr++
          low++
        } else if (num === 1) {
          curr++
        } else if (num === 2) {
          swap(nums, curr, high)
          debugger
          high--
        }
      }

      debugger
      return nums
    }),
    inputs: [[2, 2, 0, 1, 2, 0]],
  },
  DutchFlagSort
)

function DutchFlagSort({ state }) {
  const { __done: done, curr, high, low, nums } = state
  const isActive = (index: number) => done || [curr, high, low].includes(index)
  return (
    <>
      <section>
        <Iterable>
          {nums.map((item, index) => (
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
