import React from 'react'

export function Input({ label, value, onChange }) {
  return (
    <label className="font-mono flex-1 input">
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
