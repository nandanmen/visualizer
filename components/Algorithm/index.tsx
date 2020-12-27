import React from 'react'
import clsx from 'clsx'
import Head from 'next/head'
import { motion, AnimateSharedLayout } from 'framer-motion'

import { useAlgorithm } from '~lib/useAlgorithm'

import styles from './Algorithm.module.scss'
import ArgumentForm from './ArgumentForm'
import Controls from './Controls'
import SourceCode from './SourceCode'

export default function Algorithm({
  children,
  algorithm,
  inputs,
  title,
  pattern,
  description,
}) {
  const [showCode, toggleCode] = React.useReducer((show) => !show, false)
  const { entryPoint, params, code } = algorithm
  const context = useAlgorithm(entryPoint, inputs)

  const args = (JSON.parse(params) as string[]).map(
    (name, index) => [name, inputs[index]] as const
  )

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <main className={clsx('h-screen w-screen grid antialiased', styles.main)}>
        <section className="flex flex-col justify-center items-center p-16 relative">
          <article className="max-w-md">
            <p className="text-gray-500 font-mono mb-2">{pattern}</p>
            <h1
              style={{ lineHeight: 1.1 }}
              className="font-serif text-5xl font-bold mb-8"
            >
              {title}
            </h1>
            <p className="mb-4">{description}</p>
            <ArgumentForm
              args={args}
              onSubmit={(args) =>
                context.actions.setInputs(args.map(([, value]) => value))
              }
            />
          </article>
          <button
            className="text-gray-500 font-mono hover:text-black"
            onClick={toggleCode}
          >
            Show code
          </button>
          <SourceCode
            className="absolute w-full h-full left-0"
            code={code}
            open={showCode}
            onClose={toggleCode}
            activeLine={context.models.state.line}
          />
        </section>
        <section className="bg-gray-200 relative">
          <p className="absolute top-0 left-0 m-6 font-mono">
            {context.models.steps.indexOf(context.models.state) + 1} /{' '}
            {context.models.steps.length}
          </p>
          <AnimateSharedLayout>
            <motion.section
              className="w-full h-full flex flex-col items-center justify-center "
              id="display"
              layout
            >
              {React.cloneElement(
                React.Children.only(children),
                context.models
              )}
            </motion.section>
          </AnimateSharedLayout>
          <Controls
            context={context}
            className={clsx('absolute left-0 ml-6', styles.controls)}
          />
        </section>
      </main>
    </>
  )
}
