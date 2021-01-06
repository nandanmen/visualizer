import React from 'react'
import Head from 'next/head'

import SearchBar from './SearchBar'

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, user-scalable=no" />
      </Head>
      <div className="z-0">
        <header className="fixed w-full z-20 flex justify-center items-center py-4 px-8">
          <SearchBar className="w-1/3" />
        </header>
        {children}
      </div>
    </>
  )
}
