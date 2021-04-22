import React from 'react'
import Highlight, { defaultProps } from 'prism-react-renderer'
import { motion } from 'framer-motion'
import clsx from 'clsx'

export default function CodeBlock({ code, highlightLine }) {
  return (
    <Highlight
      {...defaultProps}
      code={code}
      language="typescript"
      theme={undefined}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre
          className={clsx(
            className,
            'w-full p-4 bg-gray-200 rounded-lg border-3 max-h-full overflow-scroll relative'
          )}
          style={{ ...style, fontSize: '14px' }}
        >
          <motion.div
            layout
            style={{
              height: '22.4px',
              top: 16 + 22.4 * highlightLine,
            }}
            className="absolute w-full bg-gray-500 opacity-25 left-0"
          ></motion.div>
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  )
}
