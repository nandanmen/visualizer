import { useEffect, useState } from 'react'

export function useImplementation(pattern, files) {
  const [funcs, setFuncs] = useState(null)

  useEffect(() => {
    Promise.all(
      files.map(async (file) => [
        file,
        (await import(`../algorithms/${pattern}/${file}`)).default,
      ])
    ).then((mods) => setFuncs(Object.fromEntries(mods)))
  }, [pattern, files])

  return funcs
}
