import React from 'react'
import Head from 'next/head'

import SearchBar from './SearchBar'

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, user-scalable=no" />
      </Head>
      <div>
        <header>
          <SearchBar />
        </header>
        {children}
      </div>
    </>
  )
}
