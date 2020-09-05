import React, { createContext, useState, useMemo } from 'react'
import useInterval from '@use-it/interval'

export const AlgorithmContext = createContext()

export function Algorithm({ algorithms, children, title }) {
  const [activeStepIndex, setActiveStepIndex] = useState(0)
  const [algorithm, setAlgorithm] = useState(algorithms[0].__vizName)
  const [isPlaying, setIsPlaying] = useState(false)
  const [inputs, setInputs] = useState(null)

  const func = algorithms.find((alg) => alg.__vizName === algorithm)
  const args = inputs || func.__defaultInput

  const steps = useMemo(() => {
    const recordedSteps = []
    func({ record: (data) => recordedSteps.push(data) }, ...args)
    return recordedSteps
  }, [args, func])

  useInterval(
    () => {
      if (activeStepIndex < steps.length - 1) {
        setActiveStepIndex((index) => index + 1)
      } else {
        setIsPlaying(false)
      }
    },
    isPlaying ? 400 : null
  )

  const toggle = () => setIsPlaying((playing) => !playing)

  const reset = () => {
    setIsPlaying(false)
    setActiveStepIndex(0)
  }

  return (
    <>
      <h1 className="text-2xl font-semibold mb-4">{title}</h1>
      <div className="w-full mb-8 flex">
        <select
          className="bg-gray-200 p-2 rounded-md font-semibold"
          value={algorithm}
          onChange={(evt) => {
            setAlgorithm(evt.target.value)
            setActiveStepIndex(0)
          }}
        >
          {algorithms.map((alg) => (
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
      <AlgorithmContext.Provider
        value={{ steps, activeStepIndex, args, func, actions: { setInputs } }}
      >
        {children}
      </AlgorithmContext.Provider>
    </>
  )
}
