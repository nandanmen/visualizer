import { v4 } from 'uuid'

export function addIds(arr) {
  return arr.map((val) => ({ id: v4(), val }))
}

export function identity(item) {
  return item
}
