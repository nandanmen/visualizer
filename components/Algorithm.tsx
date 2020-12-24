import React from 'react'
import clsx, { ClassValue } from 'clsx'
import { motion, AnimateSharedLayout } from 'framer-motion'
import { BsFillPlayFill, BsPauseFill } from 'react-icons/bs'
import { FaUndoAlt } from 'react-icons/fa'
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi'

import { Button } from '~components/Button'
import { useAlgorithm } from '~lib/useAlgorithm'
import { AlgorithmContext } from '~lib/types'

import styles from './styles/Algorithm.module.scss'

export function Algorithm({ children, algorithm, inputs, ...opts }) {
  const context = useAlgorithm(algorithm, inputs)
  return (
    <AnimateSharedLayout>
      <Algorithm.Controls context={context} {...opts} />
      <Algorithm.Display>
        {React.cloneElement(React.Children.only(children), context.models)}
      </Algorithm.Display>
    </AnimateSharedLayout>
  )
}

// ---

type ControlsProps = {
  context: AlgorithmContext
  className?: ClassValue
}

function Controls({
  context: { actions, models },
  className = '',
}: ControlsProps) {
  return (
    <motion.div layout className="px-4 xl:px-0">
      <motion.section
        layout
        className={clsx('flex text-sm lg:text-base', className)}
      >
        <Button
          className="mr-2"
          onClick={actions.toggle}
          title="Start animation"
        >
          {models.isPlaying ? (
            <BsPauseFill size="1.5em" />
          ) : (
            <BsFillPlayFill size="1.5em" />
          )}
        </Button>
        <Button className="mr-2" onClick={actions.reset} title="Reset">
          <FaUndoAlt />
        </Button>
        <section
          className={clsx(
            styles.stepper,
            'flex flex-grow items-center justify-end lg:ml-auto'
          )}
        >
          <Button
            className={styles.prev}
            onClick={actions.prev}
            title="Previous step"
          >
            <BiLeftArrowAlt size="1.5em" />
          </Button>
          <p className={clsx(styles.text, 'font-mono')}>
            {models.steps.indexOf(models.state) + 1} / {models.steps.length}
          </p>
          <Button
            className={clsx(styles.next, 'ml-2')}
            onClick={actions.next}
            title="Next step"
          >
            <BiRightArrowAlt size="1.5em" />
          </Button>
        </section>
      </motion.section>
    </motion.div>
  )
}

// ---

function Display({ children, className = 'mt-4' }) {
  return (
    <motion.section
      id="display"
      className={clsx(
        styles.display,
        'px-4 py-6 text-sm border-t-4 border-b-4 flex flex-col items-start font-mono bg-background border-stroke z-0 overflow-x-scroll',
        'md:text-base md:border-4 md:rounded-md md:p-16 md:items-center md:overflow-hidden',
        className
      )}
      layout
    >
      {children}
    </motion.section>
  )
}

// ---

Algorithm.Controls = Controls
Algorithm.Display = Display
