import React from 'react'

export function Controls({
  algorithms,
  activeAlgorithm,
  onSelect,
  isPlaying,
  toggle,
  reset,
}) {
  return (
    <div className="w-full mb-8 flex">
      <select
        className="bg-gray-200 p-2 rounded-md font-semibold"
        value={activeAlgorithm}
        onBlur={() => {}}
        onChange={(evt) => {
          onSelect(evt.target.value)
          reset()
        }}
      >
        {Object.entries(algorithms).map(([path, alg]) => (
          <option value={path} key={path}>
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
