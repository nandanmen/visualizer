import React from 'react'
import clsx from 'clsx'

import styles from './styles/Input.module.scss'

export function Input({ label, value, onChange }) {
  return (
    <label className={clsx(styles.input, 'font-mono flex-1')}>
      {label}
      <input
        className="block border-stroke border-4 rounded-md p-2  w-full"
        type="text"
        value={value}
        onChange={onChange}
      />
    </label>
  )
}
