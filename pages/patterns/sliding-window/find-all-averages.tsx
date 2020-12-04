import React from 'react'

import { Iterable, IterableItem } from '~components/Iterable'
import { Window } from '~components/Window'
import { makeAlgorithmPage } from '~lib/makeAlgorithmPage'
import { DisplayProps, RecordableFunction } from '~lib/types'

const meta = {
  title: 'Find All Averages',
  pattern: 'Sliding Window',
  description: 'Given an array, find the averages of all subarrays of size k.',
}

function FindAllAverages({
  state,
  inputs,
}: DisplayProps<typeof findAllAverages>) {
  const { done, start, end, result } = state
  const { arr, k } = inputs
  const isActive = (index: number) =>
    done ? true : index >= start && index <= end

  return (
    <>
      <section className="pt-8">
        <Iterable>
          {Array.from(arr).map((item, index) => (
            <IterableItem
              key={`${item}-${index}`}
              animate={isActive(index) ? 'active' : 'inactive'}
              className={{
                result: done,
              }}
            >
              {item}
            </IterableItem>
          ))}
          <Window show={!done} start={start} end={end} />
        </Iterable>
        <section className="mt-16">
          <code className="block">Subarray size: {k}</code>
          <code className="block">
            Result: {JSON.stringify(result.map(Number), null, 2)}
          </code>
        </section>
      </section>
    </>
  )
}

// --

const findAllAverages: RecordableFunction<
  { arr: number[]; k: number },
  {
    start: number
    end: number
    sum: number
    result: number[]
    done: boolean
  }
> = ({ record }, { arr, k }) => {
  const result = []
  let windowStart = 0
  let windowSum = 0
  for (let windowEnd = 0; windowEnd < arr.length; windowEnd++) {
    windowSum += arr[windowEnd]
    record({
      start: windowStart,
      end: windowEnd,
      sum: windowSum,
      result: [...result],
    })

    if (windowEnd >= k - 1) {
      result.push((windowSum / k).toFixed(2))
      windowSum -= arr[windowStart]
      windowStart++
    }
  }

  record({
    done: true,
    result: [...result],
  })

  return result
}

export default makeAlgorithmPage(
  {
    algorithm: findAllAverages,
    inputs: {
      arr: [1, 3, 2, 6, -1, 4, 1, 8, 2],
      k: 3,
    },
    ...meta,
  },
  FindAllAverages
)
