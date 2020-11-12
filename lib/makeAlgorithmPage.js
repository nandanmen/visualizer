import React from 'react'

import { Algorithm } from '~components/Algorithm'
import { AlgorithmPage } from '~components/AlgorithmPage'

export function makeAlgorithmPage(
  { title, pattern, algorithm, inputs, ...opts },
  Component
) {
  const Page = function () {
    return (
      <AlgorithmPage title={title} pattern={pattern}>
        <Algorithm algorithm={algorithm} inputs={inputs} {...opts}>
          <Component />
        </Algorithm>
      </AlgorithmPage>
    )
  }
  Page.displayName = `${Component.name}Page`
  return Page
}
