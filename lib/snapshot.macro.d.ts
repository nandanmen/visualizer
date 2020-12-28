export type Recordable<T = unknown> = {
  entryPoint: (snapshot: Snapshot) => (...args: Parameters<T>) => ReturnType<T>
  params: string
  code: string
}

export type Snapshot<T = unknown> = {
  data: Partial<T>[]
  push(val: Partial<T>): void
}

export default function snapshot<T extends (...args: any) => any>(
  algo: T
): Recordable<T>
