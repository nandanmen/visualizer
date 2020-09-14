import React from 'react'

import { Algorithm } from '~components/Algorithm'
import { useAlgorithm } from '~lib/useAlgorithm'
import * as List from '~lib/linked-list'

function parseArgs({ list }) {
  return { list: List.fromArray(list, { cycle: true }) }
}

function serialize(key, val) {
  return [key, List.serialize(val)]
}

function unserialize(key, val) {
  return [key, List.unserialize(val, { cycle: true })]
}

export default function LinkedListCycle() {
  const context = useAlgorithm(
    hasCycle,
    {
      list: [1, 2, 3, 4, 5, 6, 3],
    },
    parseArgs
  )
  const { state } = context.models
  return (
    <Algorithm
      title="Linked List Cycle"
      pattern={`Fast & Slow Pointers`}
      context={context}
      serialize={serialize}
      unserialize={unserialize}
    ></Algorithm>
  )
}

function hasCycle({ record }, { list }) {
  let fast = list
  let slow = list

  while (fast && fast.next) {
    record({ fast, slow })
    fast = fast.next.next
    slow = slow.next

    if (fast === slow) {
      record({ done: true, result: true, fast, slow })
      return true
    }
  }

  record({ done: false, result: false })
  return false
}
