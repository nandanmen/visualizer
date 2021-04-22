export type Snapshotter = {
  data: State[]
  push(val: Omit<State, 'line' | '__done' | '__returnValue'>): void
}

export type Recordable = {
  entryPoint: EntryFunction
  params: string
  code: string
}

export type EntryFunction = (
  snapshot: Snapshotter
) => (...args: unknown[]) => unknown

export default function snapshot(algo): Recordable
