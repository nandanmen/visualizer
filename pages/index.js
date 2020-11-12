import React from 'react'
import Link from 'next/link'

import { Layout } from '~components/Layout'

function Home() {
  return (
    <Layout title="Algorithms">
      <h1 className="text-5xl font-semibold text-stroke">Algorithm Patterns</h1>
      <ul>
        <li>
          <Link href="/patterns/sliding-window/find-all-averages">
            <a>Sliding Window</a>
          </Link>
        </li>
        <li>
          <Link href="/patterns/two-pointers/closest-triplet">
            <a>Two Pointers</a>
          </Link>
        </li>
      </ul>
    </Layout>
  )
}

export default Home
