import React from 'react'

import { Algorithm } from '~components/Algorithm'

export function makeAlgorithmPage(props, Component) {
  const Page = function () {
    return (
      <Algorithm {...props}>
        <Component />
      </Algorithm>
    )
  }
  Page.displayName = `${Component.name}Page`
  return Page
}
