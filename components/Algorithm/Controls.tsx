import React from 'react'
import clsx, { ClassValue } from 'clsx'
import { BsFillPlayFill, BsPauseFill } from 'react-icons/bs'
import { FaUndoAlt } from 'react-icons/fa'
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi'

import { Button } from '~components/Button'
import { AlgorithmContext } from '~lib/types'

type ControlsProps = {
  context: AlgorithmContext
  className?: ClassValue
}

export default function Controls({
  context: { actions, models },
  className = '',
}: ControlsProps) {
  return (
    <section className={clsx(className)}>
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
