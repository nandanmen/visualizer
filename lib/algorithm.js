import fs from 'fs'
import path from 'path'

export function getAlgorithms(pattern) {
  const patternPath = path.join(process.cwd(), 'algorithms', pattern)
  return fs.readdirSync(patternPath)
}
