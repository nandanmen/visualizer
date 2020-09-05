import React from 'react'

export function Controls({
  options,
  algorithm,
  onSelect,
  isPlaying,
  toggle,
  reset,
}) {
  return (
    <div className="w-full mb-8 flex">
      <select
        className="bg-gray-200 p-2 rounded-md font-semibold"
        value={algorithm}
        onBlur={() => {}}
        onChange={(evt) => {
          onSelect(evt.target.value)
          reset()
        }}
      >
        {options.map((alg) => (
          <option value={alg.__vizName} key={alg.__vizName}>
            {alg.__vizName}
          </option>
        ))}
      </select>
      <div className="flex ml-auto">
        <button
          className="font-semibold mr-4 bg-gray-200 rounded-md px-4 py-2"
          onClick={toggle}
        >
          {isPlaying ? 'Pause' : 'Play'}
        </button>
        <button
          className="font-semibold bg-gray-200 rounded-md px-4 py-2"
          onClick={reset}
        >
          Reset
        </button>
      </div>
    </div>
  )
}
