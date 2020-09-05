import React from 'react'
import { BiUpArrow } from 'react-icons/bi'

import { getAlgorithms } from '../../lib/algorithm'
import { Iterable, IterableItem } from '../../components/Iterable'
import { Pattern, usePatternContext } from '../../components/Pattern'

const variants = {
  active: {
    opacity: 1,
    y: 0,
  },
  inactive: {
    opacity: 0.2,
    y: 10,
  },
}

function TwoPointers() {
  const { models } = usePatternContext()
  const { args, state, steps } = models

  const [input, target] = args
  const { done, head, tail, result } = state
  const notFound = done && result === null

  const isResult = (index) => {
    return done && result ? result.includes(index) : false
  }

  const isActive = (index) => {
    return notFound || isResult(index) || index === head || index === tail
  }

  const showArrow = (index) => {
    return done ? false : isActive(index)
  }

  return (
    <>
      <Iterable>
        {input.map((item, index) => (
          <IterableItem
            variants={variants}
            key={item}
            animate={isActive(index) ? 'active' : 'inactive'}
            className={[
              'relative',
              {
                result: isResult(index),
                'not-found': notFound,
              },
            ]}
          >
            {item}
            {showArrow(index) && (
              <div className="arrow-down absolute text-blue-500">
                <BiUpArrow />
              </div>
            )}
          </IterableItem>
        ))}
      </Iterable>
      <section className="mt-8">
        <code className="block">
          Iteration: {steps.indexOf(state) + 1} / {steps.length}
        </code>
        <code className="block">Target: {target}</code>
        {notFound && <code className="block">Not found :(</code>}
      </section>
    </>
  )
}

const pattern = 'two-pointers'

export default function TwoPointersPage({ files }) {
  return (
    <Pattern name="Two Pointers" pattern={pattern} files={files}>
      <TwoPointers />
    </Pattern>
  )
}

export async function getStaticProps() {
  return {
    props: {
      files: getAlgorithms(pattern),
    },
  }
}
