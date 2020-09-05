import React from 'react'
import Link from 'next/link'

import { Layout } from './Layout'
import { Title } from './Title'

export function PatternLayout({ name, children }) {
  return (
    <Layout title={name}>
      <Link href="/">Home</Link>
      <Title>{name}</Title>
      {children}
    </Layout>
  )
}
