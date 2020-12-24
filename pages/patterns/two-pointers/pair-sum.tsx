import React from 'react'

import { Iterable, IterableItem } from '~components/Iterable'
import defineAlgorithm from '~lib/defineAlgorithm'
import snapshot from '../../../lib/snapshot.macro'

export default defineAlgorithm(
  {
    title: 'Pair Sum',
    pattern: 'Two Pointers',
    description:
      'Given a sorted array and a target, find a pair of numbers that add up to the target.',
    algorithm: snapshot((nums: number[], target: number) => {
      let head = 0
      let tail = nums.length - 1

      while (head < tail) {
        const headNum = nums[head]
        const tailNum = nums[tail]
        debugger

        if (headNum + tailNum === target) {
          debugger
          return [head, tail]
        }

        if (headNum + tailNum > target) {
          tail--
        } else {
          head++
        }
      }

      debugger
      return null
    }),
    inputs: [[1, 2, 3, 4, 6], 6],
  },
  PairSum
)

function PairSum({ state, inputs }) {
  const { __done: done, head, tail, __returnValue: result } = state
  const [nums, target] = inputs
  const isActive = (index: number) =>
    (done && result === null) || index === head || index === tail
  const showPointer = (index: number) => (done ? false : isActive(index))

  return (
    <>
      <section>
        <Iterable>
          {nums.map((item, index) => (
            <IterableItem
              key={`${item}-${index}`}
              active={isActive(index)}
              className={{
                'not-found': done && !result,
                result: done && result && result.includes(index),
              }}
              pointer={showPointer(index)}
            >
              {item}
            </IterableItem>
          ))}
        </Iterable>
      </section>
      <section className="mt-8">
        <code className="block">Target: {target}</code>
        <code className="block">
          {done && result === null
            ? 'Not found :('
            : `Current sum: ${nums[head] + nums[tail]}`}
        </code>
      </section>
    </>
  )
}
