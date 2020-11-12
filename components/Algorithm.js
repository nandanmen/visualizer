import React, { useState } from 'react'
import clsx from 'clsx'
import { motion, AnimateSharedLayout } from 'framer-motion'
import { BsFillPlayFill, BsPauseFill } from 'react-icons/bs'
import { FaUndoAlt, FaCheck, FaTimes, FaCog } from 'react-icons/fa'
import { RiPencilFill } from 'react-icons/ri'
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi'

import { Button } from '~components/Button'
import { Input } from '~components/Input'
import { useAlgorithm } from '~lib/useAlgorithm'

export function Algorithm({ children, algorithm, inputs, parseArgs, ...opts }) {
  const context = useAlgorithm(algorithm, inputs, parseArgs)
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

const forms = {
  Inputs: 'inputs',
  Settings: 'settings',
}

function defaultSerializer(key, val) {
  return [key, JSON.stringify(val)]
}

function defaultUnserializer(key, val) {
  return [key, val.length && JSON.parse(val)]
}

function Controls({
  context: { actions, models },
  serialize = defaultSerializer,
  unserialize = defaultUnserializer,
  className = '',
}) {
  const [editing, setEditing] = useState(null)
  const [inputs, setInputs] = useState({})

  const save = () => {
    const newInputs = Object.fromEntries(
      Object.entries(inputs).map(([name, value]) => unserialize(name, value))
    )
    actions.reset()
    editing === forms.Inputs
      ? actions.setInputs(newInputs)
      : actions.setSettings(newInputs)
    setEditing(null)
  }

  const toggle = (form) => {
    if (editing === null) {
      setEditing(form)
    } else {
      setEditing(null)
    }
    const editableInputs = Object.fromEntries(
      Object.entries(
        form === forms.Inputs ? models.inputs : models.settings
      ).map(([name, value]) =>
        form === forms.Inputs
          ? serialize(name, value)
          : [name, JSON.stringify(value)]
      )
    )
    setInputs(editableInputs)
  }

  return (
    <motion.div layout>
      <motion.section layout className={clsx('flex', className)}>
        <Button className="mr-2" onClick={actions.toggle}>
          {models.isPlaying ? (
            <BsPauseFill size="1.5em" />
          ) : (
            <BsFillPlayFill size="1.5em" />
          )}
        </Button>
        <Button className="mr-2" onClick={actions.reset}>
          <FaUndoAlt />
        </Button>
        <Button
          className="mr-2"
          onClick={() => (editing ? save() : toggle(forms.Inputs))}
        >
          {editing ? <FaCheck /> : <RiPencilFill size="1.2em" />}
        </Button>
        <Button
          className="mr-2"
          onClick={() => (editing ? save() : toggle(forms.Settings))}
        >
          {editing ? <FaTimes /> : <FaCog />}
        </Button>
        <section className="ml-auto flex items-center">
          <Button onClick={actions.prev}>
            <BiLeftArrowAlt size="1.5em" />
          </Button>
          <p className="mx-2 font-mono">
            {models.steps.indexOf(models.state) + 1} / {models.steps.length}
          </p>
          <Button onClick={actions.next}>
            <BiRightArrowAlt size="1.5em" />
          </Button>
        </section>
      </motion.section>
      {editing !== null && (
        <motion.form layout className="mt-4 flex" onSubmit={save}>
          {Object.entries(inputs).map(([name, value]) => (
            <Input
              key={name}
              label={name}
              value={value}
              onChange={(evt) =>
                setInputs({ ...inputs, [name]: evt.target.value })
              }
            />
          ))}
        </motion.form>
      )}
    </motion.div>
  )
}

// ---

function Display({ children, className = 'mt-4' }) {
  return (
    <motion.section
      className={clsx(
        'visual p-12 bg-gray-200 rounded-md w-full flex flex-col items-center',
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
