/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import clsx from 'clsx'
import { useMediaQuery } from 'beautiful-react-hooks'
import { motion } from 'framer-motion'
import { FaBars, FaTimes } from 'react-icons/fa'

import styles from './styles/Nav.module.scss'

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

const format = (str) => str.split('-').join(' ')

export function Nav() {
  const showNavButton = useMediaQuery('(max-width: 80rem)')
  const isMed = useMediaQuery('(min-width: 48rem)')
  const [isNavOpen, setIsNavOpen] = useState(!showNavButton)
  const router = useRouter()

  useEffect(() => {
    if (!showNavButton) {
      setIsNavOpen(true)
    }
  }, [showNavButton])

  useEffect(() => {
    const toggle = (evt) => {
      if (evt.key === 'e') {
        setIsNavOpen(true)
      } else if (evt.key === 'Escape') {
        setIsNavOpen(false)
      }
    }
    if (showNavButton) {
      document.addEventListener('keydown', toggle)
    }
    return () => document.removeEventListener('keydown', toggle)
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
      {isNavOpen && showNavButton && (
        <div
          style={{
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.8,
          }}
          className="fixed bg-white z-40"
          onClick={() => setIsNavOpen(false)}
        ></div>
      )}
      <motion.aside
        style={isMed ? { originX: 0, originY: 0 } : { originX: 1, originY: 1 }}
        variants={navVariants}
        animate={isNavOpen ? 'show' : 'hidden'}
        transition={{ type: 'spring', stiffness: 210, damping: 20 }}
        initial="hidden"
        className={clsx(
          styles.nav_container,
          'fixed flex-1 z-40 mt-8 mb-12 mx-8',
          'xl:m-0'
        )}
      >
        <nav
          className={clsx(
            styles.nav,
            'p-8 border-4 border-stroke rounded-lg bg-white z-50'
          )}
        >
          <ul>
            {Object.entries(routes).map(([pattern, algorithms], i) => (
              <li key={pattern} className="mb-4">
                <motion.h1
                  custom={i}
                  variants={itemVariants}
                  className="text-lg font-semibold mb-4"
                >
                  {format(pattern)}
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
                            {format(algorithm)}
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
