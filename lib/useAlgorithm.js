import { useState, useMemo } from 'react'
import useInterval from '@use-it/interval'
import { identity } from '~utils/helpers'

const defaultSettings = {
  delay: 400,
}

export function useAlgorithm(algorithm, defaultInputs, parser = identity) {
  const [activeStepIndex, setActiveStepIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [inputs, setInputs] = useState(parser(defaultInputs))
  const [settings, setSettings] = useState(defaultSettings)

  const steps = useMemo(() => {
    const recordedSteps = []
    algorithm({ record: (data) => recordedSteps.push(data) }, inputs)
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
    isPlaying ? settings.delay : null
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
      inputs,
      settings,
    },
    actions: {
      reset,
      toggle,
      next,
      prev,
      setInputs: (inputs) => setInputs(parser(inputs)),
      setSettings,
    },
  }
}
