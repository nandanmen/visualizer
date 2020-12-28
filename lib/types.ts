export type Settings = {
  /**
   * Determines the running speed of the animation. This number is passed directly
   * to setInterval - defaults to 500ms.
   */
  delay: number
}

export type EntryFunction = (
  snapshot: Snapshotter
) => (...args: unknown[]) => unknown

export type EntryArguments<T> = T extends (
  snapshot: Snapshotter
) => (...args: infer Params) => unknown
  ? Params
  : unknown[]

export type Recordable = {
  entryPoint: EntryFunction
  params: string
  code: string
}

export type Snapshotter = {
  data: State[]
  push(val: Omit<State, 'line' | '__done' | '__returnValue'>): void
}

export type State = {
  line: number
  __done: boolean
  __returnValue: unknown
  [variable: string]: unknown
}

export type Snapshot<Parameters> = {
  /**
   * A snapshot of the current state of the algorithm. Typically represents the
   * value of specific variables at a particular point in time.
   */
  state: State
  /**
   * An array of all states recorded by the algorithm.
   */
  steps: State[]
  /**
   * The inputs passed to the running algorithm.
   */
  inputs: Parameters
  /**
   * Whether the current animation is playing.
   */
  isPlaying: boolean
  /**
   * Settings for the current animation.
   */
  settings: Settings
}

export type AlgorithmContext<Parameters = unknown[]> = {
  models: Snapshot<Parameters>
  actions: {
    /**
     * Set arguments for the algorithm. Triggers a re-run of the algorithm, in turn
     * updating `steps` and `state`.
     */
    setInputs(newArguments: Parameters): void
    /**
     * Set new settings for the running algorithm. Does NOT trigger a re-run.
     *   - NOTE: Might convert this to a global setting instead.
     */
    setSettings(settings: Partial<Settings>): void
    /**
     * Moves to the next recorded step of the algorithm. Does nothing if at the end.
     */
    next(): void
    /**
     * Moves to the previous recorded step of the algorithm. Does nothing if at
     * start.
     */
    prev(): void
    /**
     * Resets the current active state back to the start.
     */
    reset(): void
    /**
     * Starts the animation if paused or stopped, pauses the animation otherwise.
     * When the animation is running, `state` is updated every `delay` ms.
     */
    toggle(): void
  }
}
