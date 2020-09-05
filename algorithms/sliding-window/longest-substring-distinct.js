export default function longestSubstringWithKDistinct({ record }, str, k) {
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
    while (windowUniqueCount > k) {
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
longestSubstringWithKDistinct.__vizName = 'Longest substring with k distinct'
longestSubstringWithKDistinct.__defaultInput = ['araaci', 1]
