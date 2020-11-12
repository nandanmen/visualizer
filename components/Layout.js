import Head from 'next/head'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import clsx from 'clsx'
import { useMediaQuery } from 'beautiful-react-hooks'
import { motion } from 'framer-motion'
import { FaBars, FaTimes } from 'react-icons/fa'

import styles from './styles/Layout.module.scss'

export function Layout({ title, children }) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width, user-scalable=no" />
      </Head>
      <div className={clsx(styles.container, 'w-full flex md:p-6 lg:p-12')}>
        <Nav />
        <main
          className={clsx(
            styles.main,
            'w-full py-12 flex flex-col',
            'md:items-center md:pt-20',
            'lg:pt-12'
          )}
        >
          {children}
        </main>
      </div>
    </>
  )
}

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

const navVariants = {
  hidden: {
    scaleX: 0,
    scaleY: 0,
  },
  show: {
    scaleX: 1,
    scaleY: 1,
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.3,
    },
  },
}

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 10,
  },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.05,
    },
  }),
}

function Nav() {
  const showNavButton = useMediaQuery('(max-width: 80rem)')
  const isMed = useMediaQuery('(min-width: 48rem)')
  const [isNavOpen, setIsNavOpen] = useState(!showNavButton)
  const router = useRouter()

  useEffect(() => {
    if (!showNavButton) {
      setIsNavOpen(true)
    }
  }, [showNavButton])

  return (
    <>
      {showNavButton && (
        <button
          className={clsx(
            styles.nav_button,
            'fixed bg-white rounded-full border-stroke border-4 w-16 h-16 z-50 flex items-center justify-center'
          )}
          onClick={() => setIsNavOpen((open) => !open)}
        >
          {isNavOpen ? <FaTimes size="1.5rem" /> : <FaBars size="1.5rem" />}
        </button>
      )}
      <motion.aside
        style={isMed ? { originX: 0, originY: 0 } : { originX: 1, originY: 1 }}
        variants={navVariants}
        animate={isNavOpen ? 'show' : 'hidden'}
        transition={{ type: 'spring', stiffness: 210, damping: 20 }}
        initial="hidden"
        className={clsx(
          styles.nav_container,
          'fixed p-8 flex-1 border-4 border-stroke rounded-lg bg-white z-40 mt-8 mb-12 mx-8',
          'md:mt-12'
        )}
      >
        <nav className={styles.nav}>
          <ul>
            {Object.entries(routes).map(([pattern, algorithms], i) => (
              <li key={pattern} className="mb-4">
                <motion.h1
                  custom={i}
                  variants={itemVariants}
                  className="text-lg font-semibold mb-4"
                >
                  {pattern.split('-').join(' ')}
                </motion.h1>
                <ul className="font-mono text-sm">
                  {algorithms.map((algorithm, j) => {
                    const href = `/patterns/${pattern}/${algorithm}`
                    const isActive = router.pathname === href
                    return (
                      <motion.li
                        custom={i + j + 1}
                        variants={itemVariants}
                        key={algorithm}
                      >
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
                      </motion.li>
                    )
                  })}
                </ul>
              </li>
            ))}
          </ul>
        </nav>
      </motion.aside>
    </>
  )
}
