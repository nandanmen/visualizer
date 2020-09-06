import React from 'react'
import { BsFillPlayFill, BsPauseFill } from 'react-icons/bs'
import { FaUndoAlt } from 'react-icons/fa'
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi'

import { Button } from '~components/Button'
import { Layout } from '~components/Layout'

export function Algorithm({ title, pattern, state, children }) {
  const { actions, models } = state
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
        <Button onClick={actions.reset}>
          <FaUndoAlt />
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
      <section className="visual mt-4 p-12 bg-gray-200 rounded-md w-full flex flex-col items-center">
        {children}
      </section>
    </Layout>
  )
}
