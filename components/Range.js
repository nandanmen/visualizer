import React from 'react'
import { Iterable } from './Iterable'

export function Range({ data, start, end }) {
  const activeIndices = range(start, end)
  return <Iterable data={data} activeIndices={activeIndices} />
}

const range = (start, end) => {
  const arr = []
  for (let i = start; i < end; i++) {
    arr.push(i)
  }
  return arr
}
