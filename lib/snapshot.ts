import rfdc from 'rfdc'

export type Snapshot<T = unknown> = {
  data: Partial<T>[]
  push(val: Partial<T>): void
}

const clone = rfdc()

const snapshot = {
  createSnapshot() {
    const data = []
    return {
      data,
      push(snapshot) {
        data.push(clone(snapshot))
      },
    }
  },
}

export default snapshot
