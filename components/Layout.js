import Head from 'next/head'
import React from 'react'

export function Layout({ title, children }) {
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <Head>
        <title>{title}</title>
      </Head>
      <main style={{ minWidth: '50vw' }}>{children}</main>
    </div>
  )
}
