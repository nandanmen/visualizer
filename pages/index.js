import React from 'react'
import Link from 'next/link'

import { Layout } from '../components/Layout'

function Home() {
  return (
    <Layout title="Algorithms">
      <h1 className="text-3xl font-semibold mb-4">Patterns</h1>
      <ul>
        <li>
          <Link href="/patterns/sliding-window">
            <a>Sliding Window</a>
          </Link>
        </li>
        <li>
          <Link href="/patterns/two-pointers">
            <a>Two Pointers</a>
          </Link>
        </li>
      </ul>
    </Layout>
  )
}

export default Home
