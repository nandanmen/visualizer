import React from 'react'

import Algorithm from '~components/Algorithm'
import type { Recordable } from './types'

export type AlgorithmOptions = {
  title: string
  pattern: string
  description: string
  algorithm: Recordable
  inputs: unknown[]
}

export default function defineAlgorithm(
  options: AlgorithmOptions,
  Component: (props: unknown) => JSX.Element
) {
  const Page = function () {
    return (
      <Algorithm {...options}>
        <Component />
      </Algorithm>
    )
  }
  Page.displayName = `${Component.name}Page`
  return Page
}
