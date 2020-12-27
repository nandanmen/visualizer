import React from 'react'
import clsx, { ClassValue } from 'clsx'
import { motion, AnimateSharedLayout, AnimatePresence } from 'framer-motion'
import { BsFillPlayFill, BsPauseFill } from 'react-icons/bs'
import { FaUndoAlt } from 'react-icons/fa'
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi'

import { Button } from '~components/Button'
import { useAlgorithm } from '~lib/useAlgorithm'
import { AlgorithmContext } from '~lib/types'

import styles from './styles/Algorithm.module.scss'

export function Algorithm({
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

  const paramList = JSON.parse(params) as string[]
  return (
    <main className={clsx('h-screen w-screen grid antialiased', styles.main)}>
      <section className="flex flex-col justify-center items-end p-16 relative">
        <article className="max-w-md">
          <p className="text-gray-500 font-mono mb-2">{pattern}</p>
          <h1
            style={{ lineHeight: 1.1 }}
            className="font-serif text-5xl font-bold mb-8"
          >
            {title}
          </h1>
          <p className="mb-4">{description}</p>
          <form className="w-full">
            {paramList.map((paramName, index) => (
              <label key={paramName} className="block font-mono w-full mb-2">
                {paramName}
                <input
                  className="w-full block border-3 border-black rounded-lg p-2"
                  type="text"
                  defaultValue={JSON.stringify(context.models.inputs[index])}
                />
              </label>
            ))}
            <button className="bg-gray-300 rounded-lg w-full p-2 font-bold mt-4">
              Update
            </button>
          </form>
        </article>
        <button
          className="text-gray-500 font-mono hover:text-black"
          onClick={toggleCode}
        >
          Show code
        </button>
        <AnimatePresence>
          {showCode && (
            <motion.section
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.2 }}
              className="absolute w-full h-full left-0 bg-white px-16 py-20 flex items-center justify-center"
            >
              <button
                className="absolute top-0 left-0 m-4 text-lg bg-none rounded-full w-12 h-12 flex items-center justify-center border-3 border-black"
                onClick={toggleCode}
              >
                <BiLeftArrowAlt size="1.5em" />
              </button>
              <pre
                style={{ fontSize: '12px' }}
                className="w-full p-4 bg-gray-200 rounded-lg  max-h-full overflow-scroll relative language-javascript"
              >
                <motion.div
                  layout
                  style={{
                    height: '19.2px',
                    top: 16 + 19.2 * context.models.state.line,
                  }}
                  className="absolute w-full bg-gray-500 opacity-25 left-0"
                ></motion.div>
                <code className="language-javascript">{code}</code>
              </pre>
            </motion.section>
          )}
        </AnimatePresence>
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
            {React.cloneElement(React.Children.only(children), context.models)}
          </motion.section>
        </AnimateSharedLayout>
        <Controls
          style={{ top: '50%', transform: 'translateY(-50%)' }}
          context={context}
          className="absolute left-0 ml-6"
        />
      </section>
    </main>
  )
}

// ---

type ControlsProps = {
  context: AlgorithmContext
  className?: ClassValue
  style: any
}

function Controls({
  context: { actions, models },
  className = '',
  style,
}: ControlsProps) {
  return (
    <section className={clsx(className)} style={style}>
      <Button className="mb-2" onClick={actions.toggle} title="Start animation">
        {models.isPlaying ? (
          <BsPauseFill size="1.5em" />
        ) : (
          <BsFillPlayFill size="1.5em" />
        )}
      </Button>
      <Button className="mb-2" onClick={actions.reset} title="Reset">
        <FaUndoAlt />
      </Button>
      <Button className="mb-2" onClick={actions.prev} title="Previous step">
        <BiLeftArrowAlt size="1.5em" />
      </Button>
      <Button className="mb-2" onClick={actions.next} title="Next step">
        <BiRightArrowAlt size="1.5em" />
      </Button>
    </section>
  )
}
