import rfdc from 'rfdc'
import type { Snapshot } from './snapshot.macro'

const clone = rfdc()

const snapshot = {
  createSnapshot(): Snapshot {
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
