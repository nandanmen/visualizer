import React from 'react'
import clsx from 'clsx'

export function Button({ onClick, children, className }) {
  return (
    <button
      className={clsx(
        'font-semibold bg-gray-200 rounded-full w-10 h-10 flex items-center justify-center text-gray-800 hover:bg-blue-500 hover:text-white',
        className
      )}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
