import React, { useState, useEffect, createContext, useContext } from 'react'
import Link from 'next/link'

import { useAlgorithm } from '~lib/useAlgorithm'
import { useImplementation } from '~lib/useImplementation'
import { Controls } from './Controls'
import { Layout } from './Layout'
import { Loading } from './Loading'
import { Title } from './Title'

const PatternContext = createContext()

export function usePatternContext() {
  const context = useContext(PatternContext)

  if (!context) {
    throw new Error(
      `usePatternContext cannot be used outside of a pattern context.`
    )
  }

  return context
}

export function Pattern({ name, pattern, files, children }) {
  const algorithms = useImplementation(pattern, files)

  const [activeAlgorithm, setActiveAlgorithm] = useState(files[0])
  const [args, setArgs] = useState(null)

  const func = algorithms && algorithms[activeAlgorithm]
  const { state, steps, isPlaying, toggle, reset } = useAlgorithm(func, args)

  const models = {
    activeAlgorithm,
    algorithms,
    args,
    state,
    steps,
  }

  const actions = {
    setArgs,
  }

  useEffect(() => {
    if (func && typeof func === 'function') {
      setArgs(func.__defaultInput)
    }
  }, [func])

  if (steps.length > 0) {
    return (
      <Layout title={name}>
        <Link href="/">
          <a>Home</a>
        </Link>
        <Title>{name}</Title>
        <Controls
          algorithms={algorithms}
          activeAlgorithm={activeAlgorithm}
          isPlaying={isPlaying}
          toggle={toggle}
          reset={reset}
          onSelect={setActiveAlgorithm}
        />
        <section className="w-full mt-16 flex flex-col items-center">
          <PatternContext.Provider value={{ models, actions }}>
            {children}
          </PatternContext.Provider>
        </section>
      </Layout>
    )
  }

  return <Loading />
}
