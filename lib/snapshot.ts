import rfdc from 'rfdc'
import type { Snapshotter } from './types'

const clone = rfdc()

const snapshot = {
  createSnapshot(): Snapshotter {
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
