import React from 'react'

import { Iterable, IterableItem } from '~components/Iterable'
import { makeAlgorithmPage } from '~lib/makeAlgorithmPage'
import { addIds } from '~utils/helpers'

function ClosestTriples({ state, inputs }) {
  const { done, active, curr, head, tail, triple, minDiff, currDiff } = state

  const isActive = (index) =>
    done ? triple.includes(index) : active || [curr, head, tail].includes(index)
  const showPointer = (index) => !done && !active && isActive(index)

  return (
    <>
      <section>
        <Iterable>
          {state.input.map((item, index) => (
            <IterableItem
              key={item.id}
              active={isActive(index)}
              className={{ result: done && triple.includes(index) }}
              pointer={showPointer(index)}
            >
              {item.val}
            </IterableItem>
          ))}
        </Iterable>
      </section>
      <section className="mt-8 lg:text-center">
        <code className="block">Target: {inputs.target}</code>
        <code className="block">Min diff: {minDiff}</code>
        <code className="block">Current diff: {currDiff}</code>
      </section>
    </>
  )
}

export default makeAlgorithmPage(
  {
    title: 'Closest Triples',
    pattern: 'Two Pointers',
    description:
      'Given an array and a target number, find the triple whose sum is closest to the given target.',
    algorithm: findClosestTriples,
    inputs: {
      arr: [1, -3, -1, 2],
      target: 1,
    },
  },
  ClosestTriples
)

// --

export function findClosestTriples({ record }, { arr, target }) {
  const nums = addIds(arr)
  const recordWithNums = (data) => record({ input: [...nums], ...data })

  recordWithNums({ active: true })
  nums.sort((a, b) => a.val - b.val)
  recordWithNums({ active: true })

  let minDiff = Number.POSITIVE_INFINITY
  let minTriple = null
  for (let i = 0; i < nums.length - 2; i++) {
    const curr = nums[i].val

    recordWithNums({ curr: i, minDiff })

    let head = i + 1
    let tail = nums.length - 1

    while (head < tail) {
      const diff = target - (curr + nums[head].val + nums[tail].val)

      recordWithNums({ curr: i, head, tail, minDiff, currDiff: diff })

      if (diff === 0) {
        recordWithNums({
          done: true,
          triple: [i, head, tail],
          minDiff: 0,
          currDiff: diff,
        })
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

  recordWithNums({ done: true, triple: minTriple, minDiff, currDiff: minDiff })
  return target - minDiff
}
