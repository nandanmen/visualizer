import React from 'react'

import { Iterable, IterableItem } from '~components/Iterable'
import defineAlgorithm from '~lib/defineAlgorithm'
import { addIds, sum } from '~utils/helpers'
import snapshot from '../../../lib/snapshot.macro'

export default defineAlgorithm(
  {
    title: 'Triplet Sum to Zero',
    pattern: 'Two Pointers',
    description: 'Given an array, find all triplets that add up to zero.',
    algorithm: snapshot((arr: number[]) => {
      const nums = addIds(arr)

      debugger
      nums.sort((a, b) => a.val - b.val)
      debugger

      const result = []
      for (let i = 0; i < nums.length - 2; i++) {
        const target = nums[i].val
        debugger

        if (i > 0 && target === nums[i - 1].val) {
          continue
        }

        const pairs = []
        const currTarget = -target
        let head = i + 1
        let tail = nums.length - 1

        while (head < tail) {
          const headNum = nums[head].val
          const tailNum = nums[tail].val

          debugger
          if (headNum + tailNum === currTarget) {
            pairs.push([head, tail])
            head++
            tail--

            while (head < tail && nums[head].val === nums[head - 1].val) {
              debugger
              head++
            }

            while (head < tail && nums[tail].val === nums[tail + 1].val) {
              debugger
              tail--
            }
          } else if (headNum + tailNum > currTarget) {
            tail--
          } else {
            head++
          }
        }

        for (const [head, tail] of pairs) {
          result.push([target, nums[head].val, nums[tail].val])
        }
      }
      debugger
      return result
    }),
    inputs: [[-3, 0, 1, 2, -1, 1, -2]],
  },
  TripleSumToZero
)

function TripleSumToZero({ state }) {
  const { __done: done, i: curr, head, tail, result, nums } = state

  const active = !done && curr === undefined
  const isActive = (index: number) =>
    done || active || [curr, head, tail].includes(index)
  const showPointer = (index: number) => !done && !active && isActive(index)

  const activeItems = nums
    .filter((_, index) => isActive(index))
    .map((item) => item.val)
  const match = activeItems.length === 3 && sum(activeItems) === 0

  return (
    <>
      <section>
        <Iterable>
          {nums.map((item, index) => (
            <IterableItem
              key={item.id}
              active={isActive(index)}
              className={{ result: done, 'bg-ok': isActive(index) && match }}
              pointer={showPointer(index)}
            >
              {item.val}
            </IterableItem>
          ))}
        </Iterable>
      </section>
      {result && result.length > 0 && (
        <section className="mt-8">
          <code className="block">{JSON.stringify(result, null, 1)}</code>
        </section>
      )}
    </>
  )
}
