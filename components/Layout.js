import Head from 'next/head'
import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import clsx from 'clsx'

import styles from './styles/Layout.module.scss'

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
}

function Nav() {
  const router = useRouter()
  return (
    <aside className="p-8 flex-1 border-4 border-stroke h-full rounded-lg">
      <nav className={styles.nav}>
        <ul>
          {Object.entries(routes).map(([pattern, algorithms]) => (
            <li key={pattern} className="mb-4">
              <h1 className="text-lg font-semibold mb-4">
                {pattern.split('-').join(' ')}
              </h1>
              <ul className="font-mono text-sm">
                {algorithms.map((algorithm) => {
                  const href = `/patterns/${pattern}/${algorithm}`
                  const isActive = router.pathname === href
                  return (
                    <li key={algorithm}>
                      <Link href={href}>
                        <a
                          className={clsx(
                            'block px-4 -mx-4 rounded-md hover:bg-highlight',
                            {
                              [styles.active]: isActive,
                            }
                          )}
                        >
                          {algorithm.split('-').join(' ')}
                        </a>
                      </Link>
                    </li>
                  )
                })}
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
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div className={clsx(styles.container, 'w-full flex p-12')}>
        <Nav />
        <main
          className={clsx(
            styles.main,
            'w-full py-12 flex flex-col items-center'
          )}
        >
          {children}
        </main>
      </div>
    </>
  )
}
