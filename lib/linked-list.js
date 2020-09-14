function node(value) {
  return { value, next: null }
}

export function fromArray(arr, { cycle } = {}) {
  const seenMap = new Map()

  let head = null
  let curr = null

  for (const value of arr) {
    const listNode = node(value)

    if (head === null) {
      head = listNode
      curr = listNode
    } else {
      if (cycle && seenMap.has(value)) {
        curr.next = seenMap.get(value)
        head.__hasCycle = true
        return head
      }
      curr.next = listNode
      curr = listNode
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
  const seen = new Set()
  const result = []

  let curr = list
  while (curr) {
    result.push(curr.value)
    if (list.__hasCycle && seen.has(curr)) {
      return result
    }
    seen.add(curr)
    curr = curr.next
  }

  return result
}
