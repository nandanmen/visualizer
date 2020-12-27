import React from 'react'
import Prism from 'prismjs'

import '../styles/global.css'
import '../styles/prism.css'

export default function App({ Component, pageProps }) {
  React.useEffect(() => {
    Prism.highlightAll()
  }, [])

  return <Component {...pageProps} />
}
