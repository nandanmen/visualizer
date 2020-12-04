import React from 'react'
import useInterval from '@use-it/interval'

import { AlgorithmContext, Settings } from '~lib/types'

/**
 * Given an algorithm and arguments, this hook runs the algorithm with the given
 * arguments and returns a series of algorithm "states" and animation controls.
 */
export function useAlgorithm<
  Parameters extends Record<string, unknown>,
  State = unknown
>(
  algorithm: (
    { record }: { record: (data: State) => void },
    args: Parameters
  ) => unknown,
  initialArguments: Parameters
): AlgorithmContext<Parameters, State> {
  const [activeStepIndex, setActiveStepIndex] = React.useState(0)
  const [isPlaying, setIsPlaying] = React.useState(false)
  const [inputs, setInputs] = React.useState(initialArguments)
  const [settings, setSettings] = React.useState<Settings>({
    delay: 500,
  })

  const steps = React.useMemo(() => {
    const recordedSteps: State[] = []
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
      steps,
      inputs,
      isPlaying,
      settings,
    },
    actions: {
      reset,
      toggle,
      next,
      prev,
      setInputs,
      setSettings: (partialSettings) =>
        setSettings({ ...settings, ...partialSettings }),
    },
  }
}
