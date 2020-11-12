import Head from 'next/head'
import React from 'react'

export function AlgorithmPage({ title, pattern, children }) {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <header className="mb-12 px-4 xl:px-0">
        <p className="text-base font-mono">{pattern}</p>
        <h1 className="text-5xl font-semibold text-stroke">{title}</h1>
      </header>
      {children}
    </>
  )
}
