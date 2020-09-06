import React from 'react'

export function Input({ label, value, onChange }) {
  return (
    <label className="font-mono flex-1 input">
      {label}
      <input
        className="block border-gray-500 border-4 rounded-md p-2 focus:border-blue-500 w-full focus:outline-none"
        type="text"
        value={value}
        onChange={onChange}
      />
    </label>
  )
}
