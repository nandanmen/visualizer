export default function nonRepeatSubstring({ record }, str) {
  const seen = {}
  let windowStart = 0
  let windowEnd = 0
  let maxSize = 0
  let windowUniqueCount = 0

  while (windowEnd < str.length) {
    const char = str[windowEnd]
    if (seen[char]) {
      seen[char]++
    } else {
      seen[char] = 1
      windowUniqueCount++
    }
    record({
      start: windowStart,
      end: windowEnd,
      result: maxSize,
    })
    while (windowUniqueCount !== windowEnd - windowStart + 1) {
      const startChar = str[windowStart]
      seen[startChar]--
      if (seen[startChar] === 0) {
        windowUniqueCount--
      }
      windowStart++
      record({
        start: windowStart,
        end: windowEnd,
        result: maxSize,
      })
    }
    maxSize = Math.max(windowEnd - windowStart + 1, maxSize)
    windowEnd++
  }

  return maxSize
}
nonRepeatSubstring.__vizName = 'Longest no-repeat substring'
nonRepeatSubstring.__defaultInput = ['aabccbb']
