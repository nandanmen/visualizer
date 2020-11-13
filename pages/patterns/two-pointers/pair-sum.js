import React from 'react'

import { Iterable, IterableItem } from '~components/Iterable'
import { makeAlgorithmPage } from '~lib/makeAlgorithmPage'

function PairSum({ state, inputs }) {
  const { done, head, tail, result } = state
  const { nums, target } = inputs
  const isActive = (index) =>
    (done && result === null) || index === head || index === tail
  const showPointer = (index) => (done ? false : isActive(index))

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

export default makeAlgorithmPage(
  {
    title: 'Pair Sum',
    pattern: 'Two Pointers',
    description:
      'Given a sorted array and a target, find a pair of numbers that add up to the target.',
    algorithm: findPairWithSum,
    inputs: {
      nums: [1, 2, 3, 4, 6],
      target: 6,
    },
  },
  PairSum
)

// --

function findPairWithSum({ record }, { nums, target }) {
  let head = 0
  let tail = nums.length - 1

  while (head < tail) {
    const headNum = nums[head]
    const tailNum = nums[tail]

    record({
      head,
      tail,
      done: false,
    })

    if (headNum + tailNum === target) {
      record({
        head,
        tail,
        done: true,
        result: [head, tail],
      })
      return [head, tail]
    }

    if (headNum + tailNum > target) {
      tail--
    } else {
      head++
    }
  }

  record({
    done: true,
    result: null,
  })

  return null
}
