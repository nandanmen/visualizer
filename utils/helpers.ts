import { v4 } from 'uuid'

type IdWrapper<T> = {
  id: string
  val: T
}

export function addIds<T>(arr: T[]): IdWrapper<T>[] {
  return arr.map((val) => ({ id: v4(), val }))
}

export function identity<T>(item: T): T {
  return item
}
