/* eslint-disable react/jsx-key */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react'
import Downshift from 'downshift'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { matchSorter } from 'match-sorter'
import clsx from 'clsx'

type Algorithm = {
  name: string
  link: string
  pattern: string
}

const routes = [
  ['sliding-window', ['find-all-averages', 'non-repeat-substring']],
  [
    'two-pointers',
    [
      'pair-sum',
      'remove-duplicates',
      'sorted-squares',
      'triplet-sum-to-zero',
      'closest-triplet',
      'dutch-flag-sort',
    ],
  ],
] as [string, string[]][]

const patterns = routes.map(([pattern, algorithms]) => ({
  name: format(pattern),
  link: pattern,
  algorithms: algorithms.map((link) => ({
    name: format(link),
    link,
    pattern,
  })),
}))

const allAlgorithms = patterns.flatMap((pattern) => pattern.algorithms)

export default function SearchBar({ className = '' }) {
  const router = useRouter()

  const handleChange = (item: Algorithm) => {
    if (!item) {
      return
    }
    const { link, pattern } = item
    router.push(`/patterns/${pattern}/${link}`)
  }

  const currentPath = format(getCurrentPath(router.pathname))
  return (
    <Downshift<Algorithm>
      onChange={handleChange}
      itemToString={(item) => (item ? item.name : '')}
      initialInputValue={currentPath}
    >
      {({
        getInputProps,
        getItemProps,
        getMenuProps,
        isOpen,
        inputValue,
        highlightedIndex,
        selectedItem,
        setState,
      }) => {
        const visiblePatterns = getVisibleItems(inputValue)
        return (
          <div className={clsx('relative', className)}>
            <input
              {...getInputProps({
                className:
                  'w-full block border-3 border-black rounded-lg p-2 text-center',
                onFocus: () => setState({ inputValue: '', isOpen: true }),
              })}
            />
            <ul
              {...getMenuProps({
                className: clsx(
                  "'absolute bg-white w-full shadow-md rounded-lg mt-1'",
                  { 'p-6': isOpen, 'pt-4': isOpen && visiblePatterns.length }
                ),
              })}
            >
              {isOpen ? (
                visiblePatterns.length ? (
                  visiblePatterns.map(({ name, link, algorithms }) => (
                    <ul key={link}>
                      <p className="text-gray-500 font-mono my-2">{name}</p>
                      {algorithms.map((algo) => {
                        const index = allAlgorithms.indexOf(algo)
                        const highlighted = highlightedIndex === index
                        const selected =
                          selectedItem === algo || algo.name === currentPath
                        return (
                          <li
                            {...getItemProps({
                              key: algo.name,
                              index,
                              item: algo,
                              className: clsx('-mx-2 px-2 rounded-sm', {
                                'bg-blue-100': highlighted,
                                'font-semibold': selected,
                              }),
                            })}
                          >
                            <Link href={`/patterns/${link}/${algo.link}`}>
                              <a>{algo.name}</a>
                            </Link>
                          </li>
                        )
                      })}
                    </ul>
                  ))
                ) : (
                  <p className="font-mono text-center text-gray-500">
                    No algorithms found :-(
                  </p>
                )
              ) : null}
            </ul>
          </div>
        )
      }}
    </Downshift>
  )
}

// --

function format(str: string) {
  const words = str.split('-')
  return words.map((word) => word[0].toUpperCase() + word.slice(1)).join(' ')
}

function getCurrentPath(pathName: string) {
  const words = pathName.split('/')
  return words[words.length - 1]
}

function getVisibleItems(inputValue: string) {
  const matches = matchSorter(allAlgorithms, inputValue, {
    keys: ['name', (item) => format(item.pattern)],
  })
  return patterns
    .filter((pattern) =>
      matches.find((algorithm) => algorithm.pattern === pattern.link)
    )
    .map((pattern) => ({
      ...pattern,
      algorithms: pattern.algorithms.filter((algorithm) =>
        matches.includes(algorithm)
      ),
    }))
}
