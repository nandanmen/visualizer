import React from 'react'

import { Algorithm } from '~components/Algorithm'
import { AlgorithmPage } from '~components/AlgorithmPage'

export default function defineAlgorithm(
  options: any,
  Component: (props: unknown) => JSX.Element
) {
  const { title, pattern, description, algorithm, inputs } = options
  const Page = function () {
    return (
      <AlgorithmPage title={title} pattern={pattern} description={description}>
        <Algorithm algorithm={algorithm.entryPoint} inputs={inputs}>
          <Component />
        </Algorithm>
      </AlgorithmPage>
    )
  }
  Page.displayName = `${Component.name}Page`
  return Page
}
