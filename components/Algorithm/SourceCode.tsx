import React from 'react'
import { BiLeftArrowAlt } from 'react-icons/bi'
import { motion } from 'framer-motion'
import clsx from 'clsx'

type SourceCodeProps = {
  open: boolean
  code: string
  activeLine: number
  onClose: () => void
  className?: string
}

const variants = {
  open: {
    x: 0,
  },
  closed: {
    x: '-100%',
  },
}

export default function SourceCode({
  open,
  code,
  activeLine,
  onClose,
  className = '',
}: SourceCodeProps) {
  return (
    <motion.section
      variants={variants}
      initial="closed"
      animate={open ? 'open' : 'closed'}
      transition={{ duration: 0.2 }}
      className={clsx(
        'bg-white px-4 py-20 flex items-center justify-center',
        className
      )}
    >
      <button
        className="absolute top-0 left-0 m-4 text-lg bg-none rounded-full w-12 h-12 flex items-center justify-center border-3 border-black"
        onClick={onClose}
      >
        <BiLeftArrowAlt size="1.5em" />
      </button>
      <pre
        style={{ fontSize: '14px' }}
        className="w-full p-4 bg-gray-200 border-3 rounded-lg  max-h-full overflow-scroll relative language-javascript"
      >
        <motion.div
          layout
          style={{
            height: '22.4px',
            top: 16 + 22.4 * activeLine,
          }}
          className="absolute w-full bg-gray-500 opacity-25 left-0"
        ></motion.div>
        <code className="language-javascript">{code}</code>
      </pre>
    </motion.section>
  )
}
