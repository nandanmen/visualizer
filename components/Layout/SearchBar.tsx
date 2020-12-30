/* eslint-disable react/jsx-key */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react'
import Downshift from 'downshift'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { matchSorter } from 'match-sorter'

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

export default function SearchBar() {
  const router = useRouter()

  const handleChange = (item) => {
    if (!item) {
      return
    }
    const { link, pattern } = item
    router.push(`/patterns/${pattern}/${link}`)
  }

  return (
    <Downshift<Algorithm>
      onChange={handleChange}
      itemToString={(item) => (item ? item.name : '')}
    >
      {({
        getInputProps,
        getItemProps,
        getLabelProps,
        getMenuProps,
        isOpen,
        inputValue,
        highlightedIndex,
        selectedItem,
        setState,
      }) => {
        const visiblePatterns = getVisibleItems(inputValue)
        return (
          <div>
            <label {...getLabelProps()}>Enter an algorithm or pattern</label>
            <input
              {...getInputProps({
                onFocus: () => setState({ inputValue: '', isOpen: true }),
              })}
            />
            <ul {...getMenuProps()}>
              {isOpen
                ? visiblePatterns.map(({ name, link, algorithms }) => (
                    <ul key={link}>
                      {name}
                      {algorithms.map((algo) => {
                        const index = allAlgorithms.indexOf(algo)
                        return (
                          <li
                            {...getItemProps({
                              key: algo.name,
                              index,
                              item: algo,
                              style: {
                                backgroundColor:
                                  highlightedIndex === index
                                    ? 'lightgray'
                                    : 'white',
                                fontWeight:
                                  selectedItem === algo ? 'bold' : 'normal',
                              },
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
                : null}
            </ul>
          </div>
        )
      }}
    </Downshift>
  )
}

// --

function format(str: string) {
  return str.split('-').join(' ')
}

function getVisibleItems(inputValue: string) {
  const matches = matchSorter(allAlgorithms, inputValue, {
    keys: ['name', 'pattern'],
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
