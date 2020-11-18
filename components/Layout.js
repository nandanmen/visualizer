import Head from 'next/head'
import React from 'react'
import Link from 'next/link'
import clsx from 'clsx'

import styles from './styles/Layout.module.scss'
import { Nav } from './Nav'

export function Layout({ children }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, user-scalable=no" />
      </Head>
      <header
        className={clsx(
          styles.header,
          'flex w-full justify-between mx-auto md:px-6 lg:px-12 h-16 items-center font-mono font-semibold'
        )}
      >
        <Link href="/patterns/sliding-window/find-all-averages">
          <a>Visualizer</a>
        </Link>
        <nav>
          <ul className="flex">
            <li className="mr-4">
              <Link href="/about">
                <a>About</a>
              </Link>
            </li>
            <li>
              <a
                href="https://github.com/narendrasss/visualizer"
                rel="noreferrer"
                target="_blank"
              >
                GitHub
              </a>
            </li>
          </ul>
        </nav>
      </header>
      <div className={clsx(styles.container, 'w-full md:px-6 lg:px-12')}>
        <Nav />
        <main
          className={clsx(
            styles.main,
            'w-full py-12 flex flex-col',
            'md:items-center md:pt-20 md:mt-6',
            'lg:mt-0 lg:pt-0'
          )}
        >
          {children}
        </main>
      </div>
    </>
  )
}
