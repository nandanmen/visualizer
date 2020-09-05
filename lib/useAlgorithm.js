import { useState, useMemo } from 'react'
import useInterval from '@use-it/interval'

export function useAlgorithm(algorithm, inputs = algorithm.__defaultInput) {
  const [activeStepIndex, setActiveStepIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  const steps = useMemo(() => {
    const recordedSteps = []
    const result = algorithm(
      { record: (data) => recordedSteps.push(data) },
      ...inputs
    )
    recordedSteps.push({ done: true, result })
    return recordedSteps
  }, [inputs, algorithm])

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

  return {
    state: steps[activeStepIndex],
    isPlaying,
    reset,
    steps,
    toggle,
  }
}
