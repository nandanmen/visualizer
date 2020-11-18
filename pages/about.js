import Head from 'next/head'
import React from 'react'

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>Visualizer</title>
      </Head>
      <header className="mb-12 px-4 xl:px-0">
        <h1 className="text-5xl font-semibold text-stroke mb-8">
          What is this?
        </h1>
        <p className="w-full mb-4">
          {`I'm a huge fan of Design Guru's Grokking the Coding Interview course. I love how it emphasizes patterns rather than data structures. Yet, as a student who was never good at algorithms, I had a hard time following some of the patterns that were described.`}
        </p>
        <p className="w-full">
          {`Despite being given the solution, I would often ask myself "so what's actually going on here? What does each step of the function actually do?"`}
        </p>
      </header>
    </>
  )
}
