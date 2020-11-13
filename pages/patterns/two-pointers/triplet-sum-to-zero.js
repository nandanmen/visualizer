import React from 'react'

import { Iterable, IterableItem } from '~components/Iterable'
import { makeAlgorithmPage } from '~lib/makeAlgorithmPage'
import { addIds } from '~utils/helpers'

function TripleSumToZero({ state }) {
  const { done, active, curr, head, tail, result } = state

  const isActive = (index) =>
    done || active || [curr, head, tail].includes(index)
  const showPointer = (index) => !done && !active && isActive(index)

  return (
    <>
      <section>
        <Iterable>
          {state.input.map((item, index) => (
            <IterableItem
              key={item.id}
              active={isActive(index)}
              className={{ result: done }}
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

export default makeAlgorithmPage(
  {
    title: 'Triplet Sum to Zero',
    pattern: 'Two Pointers',
    description: 'Given an array, find all triplets that add up to zero.',
    algorithm: findTriples,
    inputs: {
      arr: [-3, 0, 1, 2, -1, 1, -2],
    },
  },
  TripleSumToZero
)

// --

export function findTriples({ record }, { arr }) {
  const nums = addIds(arr)

  record({ input: [...nums], active: true })
  nums.sort((a, b) => a.val - b.val)
  record({ input: nums, active: true })

  const result = []
  for (let i = 0; i < nums.length - 2; i++) {
    const target = nums[i].val
    record({
      input: nums,
      curr: i,
      result: [...result],
    })
    if (i > 0 && target === nums[i - 1]) {
      continue
    }
    const pairs = findAllPairsWithSum(
      {
        record: (data) =>
          record({ ...data, input: nums, curr: i, result: [...result] }),
      },
      { nums, target: -target, head: i + 1 }
    )
    if (pairs) {
      for (const [head, tail] of pairs) {
        result.push([target, nums[head].val, nums[tail].val])
      }
    }
  }
  record({ done: true, input: nums, result: [...result] })
}

function findAllPairsWithSum({ record }, { nums, target, head }) {
  let tail = nums.length - 1
  const result = []

  while (head < tail) {
    const headNum = nums[head].val
    const tailNum = nums[tail].val

    record({
      head,
      tail,
      done: false,
    })

    if (headNum + tailNum === target) {
      result.push([head, tail])
      head++
      tail--

      while (head < tail && nums[head].val === nums[head - 1].val) {
        record({
          head,
          tail,
          done: false,
        })
        head++
      }

      while (head < tail && nums[tail].val === nums[tail + 1].val) {
        record({
          head,
          tail,
          done: false,
        })
        tail--
      }
    } else if (headNum + tailNum > target) {
      tail--
    } else {
      head++
    }
  }

  return result
}
