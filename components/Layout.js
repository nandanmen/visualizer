import Head from 'next/head'
import React from 'react'
import Link from 'next/link'

const routes = {
  'sliding-window': ['find-all-averages', 'non-repeat-substring'],
  'two-pointers': [
    'pair-sum',
    'remove-duplicates',
    'sorted-squares',
    'triplet-sum-to-zero',
    'closest-triplet',
    'dutch-flag-sort',
  ],
  'fast-slow-pointers': ['linked-list-cycle'],
}

function Nav() {
  return (
    <aside className="px-8 flex-1">
      <nav>
        <ul>
          {Object.entries(routes).map(([pattern, algorithms]) => (
            <li key={pattern}>
              {pattern}
              <ul className="ml-4">
                {algorithms.map((algorithm) => (
                  <li key={algorithm}>
                    <Link href={`/patterns/${pattern}/${algorithm}`}>
                      {algorithm}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}

export function Layout({ title, children }) {
  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>
      <div className="w-full flex py-24">
        <Nav />
        <main className="main">{children}</main>
      </div>
    </div>
  )
}
