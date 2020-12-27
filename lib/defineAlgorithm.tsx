import React from 'react'

import Algorithm from '~components/Algorithm'

export default function defineAlgorithm(
  options: any,
  Component: (props: unknown) => JSX.Element
) {
  const { title, pattern, description, algorithm, inputs } = options
  const Page = function () {
    return (
      <Algorithm
        algorithm={algorithm}
        inputs={inputs}
        title={title}
        description={description}
        pattern={pattern}
      >
        <Component />
      </Algorithm>
    )
  }
  Page.displayName = `${Component.name}Page`
  return Page
}
