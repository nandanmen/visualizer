import React, { useState } from 'react'
import { motion, AnimateSharedLayout } from 'framer-motion'
import { BsFillPlayFill, BsPauseFill } from 'react-icons/bs'
import { FaUndoAlt, FaCheck, FaTimes } from 'react-icons/fa'
import { RiPencilFill } from 'react-icons/ri'
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi'

import { Button } from '~components/Button'
import { Layout } from '~components/Layout'

export function Algorithm({
  title,
  pattern,
  context: { actions, models },
  children,
}) {
  const [editing, setEditing] = useState(false)
  const [inputs, setInputs] = useState({})

  const save = () => {
    const newInputs = Object.fromEntries(
      Object.entries(inputs).map(([name, value]) => [name, JSON.parse(value)])
    )
    actions.reset()
    actions.setInputs(newInputs)
    setEditing(false)
  }

  const toggle = () => {
    const editableInputs = Object.fromEntries(
      Object.entries(models.inputs).map(([name, value]) => [
        name,
        JSON.stringify(value),
      ])
    )
    setEditing((editing) => !editing)
    setInputs(editableInputs)
  }

  return (
    <Layout title={title}>
      <header className="mb-16">
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
        <Button className="mr-2" onClick={() => (editing ? save() : toggle())}>
          {editing ? <FaCheck /> : <RiPencilFill size="1.2em" />}
        </Button>
        {editing && (
          <Button onClick={toggle}>
            <FaTimes />
          </Button>
        )}
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
      {editing && (
        <form>
          {Object.entries(inputs).map(([name, value]) => (
            <label key={name}>
              {name}
              <input
                type="text"
                value={value}
                onChange={(evt) =>
                  setInputs({ ...inputs, [name]: evt.target.value })
                }
              />
            </label>
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
