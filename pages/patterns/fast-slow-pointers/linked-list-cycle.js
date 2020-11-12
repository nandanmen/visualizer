import React from 'react'

import { LinkedList, LinkedListItem } from '~components/LinkedList'
import * as List from '~lib/linked-list'
import { makeAlgorithmPage } from '~lib/makeAlgorithmPage'

function LinkedListCycle({ state, inputs }) {
  const { fast, slow, done } = state
  return (
    <LinkedList list={inputs.list}>
      {({ item }) => (
        <LinkedListItem active={done || item === fast || item === slow}>
          {item === fast && <text>fast</text>}
          {item === slow && <text>slow</text>}
          <LinkedListItem.Content className={done && 'text-green-600'}>
            {item.value}
          </LinkedListItem.Content>
        </LinkedListItem>
      )}
    </LinkedList>
  )
}

// --

function parseArgs({ list, cycleTo }) {
  return { list: List.fromArray(list, { cycle: cycleTo }), cycleTo }
}

function serialize(key, val) {
  if (key === 'list') {
    return [key, List.serialize(val)]
  }
  return [key, JSON.stringify(val)]
}

export default makeAlgorithmPage(
  {
    title: 'Linked List Cycle',
    pattern: `Fast & Slow Pointers`,
    algorithm: hasCycle,
    inputs: {
      list: [1, 2, 3, 4, 5, 6],
      cycleTo: 3,
    },
    parseArgs,
    serialize,
  },
  LinkedListCycle
)

// --

function hasCycle({ record }, { list }) {
  let fast = list
  let slow = list

  while (fast && fast.next) {
    record({ fast, slow })
    fast = fast.next.next
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
