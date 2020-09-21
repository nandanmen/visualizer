import React from 'react'

import { Algorithm } from '~components/Algorithm'
import { LinkedList } from '~components/LinkedList'
import { useAlgorithm } from '~lib/useAlgorithm'
import * as List from '~lib/linked-list'

function parseArgs({ list, cycleTo }) {
  return { list: List.fromArray(list, { cycle: cycleTo }), cycleTo }
}

function serialize(key, val) {
  if (key === 'list') {
    return [key, List.serialize(val)]
  }
  return [key, JSON.stringify(val)]
}

const getActiveItems = (state) => {
  const { fast, slow, done } = state
  if (done) {
    return null
  }
  if (fast.id === slow.id) {
    return new Map([[fast.id, { labels: ['slow', 'fast'] }]])
  }
  return new Map([
    [fast.id, { labels: ['fast'] }],
    [slow.id, { labels: ['slow'] }],
  ])
}

export default function LinkedListCycle() {
  const context = useAlgorithm(
    hasCycle,
    {
      list: [1, 2, 3, 4, 5, 6],
      cycleTo: 3,
    },
    parseArgs
  )
  const { state, inputs } = context.models
  const activeItems = state.done
    ? new Map(List.map(inputs.list, (item) => [item.id, { variant: 'done' }]))
    : getActiveItems(state)

  return (
    <Algorithm
      title="Linked List Cycle"
      pattern={`Fast & Slow Pointers`}
      context={context}
      serialize={serialize}
    >
      <LinkedList list={inputs.list} activeItems={activeItems} />
    </Algorithm>
  )
}

function hasCycle({ record }, { list }) {
  let fast = list
  let slow = list

  while (fast && fast.next) {
    record({ fast, slow })
    fast = fast.next
    record({ fast, slow })
    fast = fast.next
    slow = slow.next

    if (fast === slow) {
      record({ fast, slow })
      record({ done: true, result: true, fast, slow })
      return true
    }
  }

  record({ done: true, result: false })
  return false
}
