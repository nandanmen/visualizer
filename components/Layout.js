import Head from 'next/head'
import React from 'react'

export function Layout({ title, children }) {
  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>
      <main className="main pt-48">{children}</main>
    </div>
  )
}
