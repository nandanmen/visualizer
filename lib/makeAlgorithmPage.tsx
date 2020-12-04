import React from 'react'

import { Algorithm } from '~components/Algorithm'
import { AlgorithmPage } from '~components/AlgorithmPage'
import { RecordableFunction, Params } from '~lib/types'

type AlgorithmOptions<T extends RecordableFunction> = {
  title: string
  description: string
  pattern: string
  algorithm: T
  inputs: Params<T>
}

export function makeAlgorithmPage<T extends RecordableFunction>(
  options: AlgorithmOptions<T>,
  Component: (props: unknown) => JSX.Element
) {
  const { title, pattern, description, algorithm, inputs } = options
  const Page = function () {
    return (
      <AlgorithmPage title={title} pattern={pattern} description={description}>
        <Algorithm algorithm={algorithm} inputs={inputs}>
          <Component />
        </Algorithm>
      </AlgorithmPage>
    )
  }
  Page.displayName = `${Component.name}Page`
  return Page
}
