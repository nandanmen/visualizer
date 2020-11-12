import React from 'react'

import { Layout } from '~components/Layout'

export function AlgorithmPage({ title, pattern, children }) {
  return (
    <Layout title={title}>
      <header className="mb-12 px-4">
        <p className="text-base font-mono">{pattern}</p>
        <h1 className="text-5xl font-semibold text-stroke">{title}</h1>
      </header>
      {children}
    </Layout>
  )
}
