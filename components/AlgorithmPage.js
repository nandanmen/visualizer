import React from 'react'

import { Layout } from '~components/Layout'

export function AlgorithmPage({ title, pattern, children }) {
  return (
    <Layout title={title}>
      <header className="mb-12">
        <p className="text-base text-gray-500">{pattern}</p>
        <h1 className="text-5xl font-semibold">{title}</h1>
      </header>
      {children}
    </Layout>
  )
}
