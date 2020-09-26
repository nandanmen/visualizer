import React from 'react'

import { Iterable, IterableItem } from '~components/Iterable'
import { Algorithm } from '~components/Algorithm'
import { useAlgorithm } from '~lib/useAlgorithm'
import { addIds } from '~utils/helpers'

const args = {
  arr: [1, -3, -1, 2],
  target: 1,
}
const { variants } = IterableItem

export default function ClosestTriples() {
  const context = useAlgorithm(findClosestTriples, args)

  const { state, inputs } = context.models
  const { done, active, curr, head, tail, triple, minDiff, currDiff } = state

  const isActive = (index) =>
    done ? triple.includes(index) : active || [curr, head, tail].includes(index)
  const showPointer = (index) => !done && !active && isActive(index)

  return (
    <Algorithm title="Closest Triplet" pattern="Two Pointers">
      <Algorithm.Controls context={context} />
      <Algorithm.Display>
        <section>
          <Iterable>
            {state.input.map((item, index) => (
              <IterableItem
                key={item.id}
                active={isActive(index)}
                className={{ result: done && triple.includes(index) }}
                variant={variants.rounded}
                pointer={showPointer(index)}
              >
                {item.val}
              </IterableItem>
            ))}
          </Iterable>
        </section>
        <section className="mt-8 text-center">
          <code className="block">Target: {inputs.target}</code>
          <code className="block">Min diff: {minDiff}</code>
          <code className="block">Current diff: {currDiff}</code>
        </section>
      </Algorithm.Display>
    </Algorithm>
  )
}

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
