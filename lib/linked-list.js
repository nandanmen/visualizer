import { v4 } from 'uuid'

function defaultComparator(a, b) {
  return a === b
}

function node(value) {
  return { id: v4(), value, next: null }
}

export function fromArray(arr, { cycle = null } = {}) {
  const seenMap = new Map()

  let head = null
  let curr = null

  for (const value of arr) {
    const listNode = node(value)

    if (head === null) {
      head = listNode
      curr = listNode
    } else {
      curr.next = listNode
      curr = listNode
      if (value === arr[arr.length - 1] && seenMap.has(cycle)) {
        curr.next = seenMap.get(cycle)
        curr.__isCycle = true
        head.__hasCycle = true
        return head
      }
    }

    seenMap.set(value, listNode)
  }

  return head
}

export function serialize(list) {
  const arr = toArray(list)
  return JSON.stringify(arr)
}

export function unserialize(listStr, options) {
  return fromArray(JSON.parse(listStr), options)
}

export function toArray(list) {
  return map(list, (item) => item.value)
}

export function map(list, fn) {
  const seen = new Set()
  const result = []

  let curr = list
  let index = 0
  while (curr) {
    if (list.__hasCycle && seen.has(curr)) {
      return result
    }
    result.push(fn(curr, index))
    seen.add(curr)
    curr = curr.next
    index++
  }

  return result
}

export function indexOf(list, item, compare = defaultComparator) {
  let curr = list
  let index = 0
  while (curr) {
    if (compare(curr, item)) {
      return index
    }
    if (curr.__isCycle) {
      break
    }
    curr = curr.next
    index++
  }
  return -1
}

export function getRange(list, items) {
  let minIndex = Number.POSITIVE_INFINITY
  let maxIndex = 0

  items.forEach((item) => {
    const index = indexOf(list, item, (a, b) => a.id === b)
    minIndex = Math.min(index, minIndex)
    maxIndex = Math.max(index, maxIndex)
  })

  return [minIndex, maxIndex]
}
