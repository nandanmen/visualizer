import React from 'react'
import clsx from 'clsx'
import { BiUpArrow } from 'react-icons/bi'

const variants = {
  default: 'text-stroke',
  highlight: 'text-gray-500',
}

export function Pointer({ variant = 'default' }) {
  return (
    <div className={clsx('arrow-down absolute', variants[variant])}>
      <BiUpArrow />
    </div>
  )
}

Pointer.variants = Object.fromEntries(
  Object.entries(variants).map(([key]) => [key, key])
)
