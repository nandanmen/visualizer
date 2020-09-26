import React from 'react'

import { Iterable, IterableItem } from '~components/Iterable'
import { Algorithm } from '~components/Algorithm'
import { useAlgorithm } from '~lib/useAlgorithm'

const input = {
  nums: [1, 2, 3, 4, 6],
  target: 6,
}
const { variants } = IterableItem

export default function PairSum() {
  const context = useAlgorithm(findPairWithSum, input)

  const { done, head, tail, result } = context.models.state
  const { nums, target } = context.models.inputs
  const isActive = (index) =>
    (done && result === null) || index === head || index === tail
  const showPointer = (index) => (done ? false : isActive(index))

  return (
    <Algorithm title="Pair Sum" pattern="Two Pointers">
      <Algorithm.Controls context={context} />
      <Algorithm.Display>
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
                variant={variants.rounded}
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
      </Algorithm.Display>
    </Algorithm>
  )
}

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
