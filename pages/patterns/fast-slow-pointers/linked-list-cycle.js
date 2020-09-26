import React from 'react'

import { Algorithm } from '~components/Algorithm'
import { LinkedList, LinkedListItem } from '~components/LinkedList'
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
  const { fast, slow, done } = state

  return (
    <Algorithm title="Linked List Cycle" pattern={`Fast & Slow Pointers`}>
      <Algorithm.Controls context={context} serialize={serialize} />
      <Algorithm.Display>
        <LinkedList list={inputs.list}>
          {({ item }) => (
            <LinkedListItem active={done || item === fast || item === slow}>
              <LinkedListItem.Content className={done && 'text-green-600'}>
                {item.value}
              </LinkedListItem.Content>
            </LinkedListItem>
          )}
        </LinkedList>
      </Algorithm.Display>
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
