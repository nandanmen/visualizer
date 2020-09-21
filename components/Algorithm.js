import React, { useState } from 'react'
import { motion, AnimateSharedLayout } from 'framer-motion'
import { BsFillPlayFill, BsPauseFill } from 'react-icons/bs'
import { FaUndoAlt, FaCheck, FaTimes, FaCog } from 'react-icons/fa'
import { RiPencilFill } from 'react-icons/ri'
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi'

import { Button } from '~components/Button'
import { Input } from '~components/Input'
import { Layout } from '~components/Layout'

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

export function Algorithm({
  title,
  pattern,
  context: { actions, models },
  children,
  serialize = defaultSerializer,
  unserialize = defaultUnserializer,
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
    <Layout title={title}>
      <header className="mb-12">
        <p className="text-base text-gray-500">{pattern}</p>
        <h1 className="text-5xl font-semibold">{title}</h1>
      </header>
      <section className="flex">
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
      </section>
      {editing !== null && (
        <form className="mt-4 flex" onSubmit={save}>
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
        </form>
      )}
      <AnimateSharedLayout>
        <motion.section
          className="visual mt-4 p-12 bg-gray-200 rounded-md w-full flex flex-col items-center"
          layout
        >
          {children}
        </motion.section>
      </AnimateSharedLayout>
    </Layout>
  )
}
