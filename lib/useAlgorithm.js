import { useState, useMemo } from 'react'
import useInterval from '@use-it/interval'

export function useAlgorithm(algorithm, inputs) {
  const [activeStepIndex, setActiveStepIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  const steps = useMemo(() => {
    const recordedSteps = []
    if (typeof algorithm === 'function' && Array.isArray(inputs)) {
      const result = algorithm(
        { record: (data) => recordedSteps.push(data) },
        ...inputs
      )
      recordedSteps.push({ done: true, result })
    }
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

  const toggle = () => {
    if (activeStepIndex === steps.length - 1) {
      reset()
    }
    setIsPlaying((playing) => !playing)
  }

  const reset = () => {
    setIsPlaying(false)
    setActiveStepIndex(0)
  }

  const next = () => {
    if (activeStepIndex < steps.length - 1) {
      setActiveStepIndex((index) => index + 1)
    }
  }

  const prev = () => {
    if (activeStepIndex > 0) {
      setActiveStepIndex((index) => index - 1)
    }
  }

  return {
    models: {
      state: steps[activeStepIndex],
      isPlaying,
      steps,
    },
    actions: {
      reset,
      toggle,
      next,
      prev,
    },
  }
}
