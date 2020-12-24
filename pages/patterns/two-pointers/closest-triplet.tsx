import React from 'react'

import { Iterable, IterableItem } from '~components/Iterable'
import defineAlgorithm from '~lib/defineAlgorithm'
import { addIds } from '~utils/helpers'
import snapshot from '../../../lib/snapshot.macro'

export default defineAlgorithm(
  {
    title: 'Closest Triples',
    pattern: 'Two Pointers',
    description:
      'Given an array and a target number, find the triple whose sum is closest to the given target.',
    algorithm: snapshot((arr: number[], target: number) => {
      const nums = addIds(arr)

      debugger
      nums.sort((a, b) => a.val - b.val)
      debugger

      let minDiff = Number.POSITIVE_INFINITY
      let minTriple = null
      for (let i = 0; i < nums.length - 2; i++) {
        const curr = nums[i].val

        debugger

        let head = i + 1
        let tail = nums.length - 1

        while (head < tail) {
          const diff = target - (curr + nums[head].val + nums[tail].val)

          debugger

          if (diff === 0) {
            debugger
            return target - diff
          }

          if (Math.abs(minDiff) > Math.abs(diff)) {
            minDiff = diff
            minTriple = [i, head, tail]
          }

          // If equal, prefer the positive diff because triple sum is smaller
          if (Math.abs(minDiff) === Math.abs(diff) && Math.sign(diff) > 0) {
            minDiff = diff
            minTriple = [i, head, tail]
          }

          if (diff > 0) {
            head++
          } else {
            tail--
          }
        }
      }

      debugger
      return target - minDiff
    }),
    inputs: [[1, -3, -1, 2], 1],
  },
  ClosestTriples
)

function ClosestTriples({ state, inputs }) {
  const { __done: done, i, head, tail, minTriple, minDiff, diff } = state

  const active = !done && i === undefined
  const isActive = (index: number) =>
    done ? minTriple.includes(index) : active || [i, head, tail].includes(index)
  const showPointer = (index: number) => !done && !active && isActive(index)

  return (
    <>
      <section>
        <Iterable>
          {state.nums.map(
            (item: { id: string; val: number }, index: number) => (
              <IterableItem
                key={item.id}
                active={isActive(index)}
                className={{ result: done && minTriple.includes(index) }}
                pointer={showPointer(index)}
              >
                {item.val}
              </IterableItem>
            )
          )}
        </Iterable>
      </section>
      <section className="mt-8 lg:text-center">
        <code className="block">Target: {inputs.target}</code>
        <code className="block">Min diff: {minDiff}</code>
        <code className="block">Current diff: {diff}</code>
      </section>
    </>
  )
}
