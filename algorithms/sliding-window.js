export const findAllAverages = ({ record }, arr, k) => {
  const result = []
  for (let i = 0; i <= arr.length - k; i++) {
    let sum = 0
    for (let j = 0; j < k; j++) {
      sum += arr[i + j]
      record({ start: i, end: i + j, sum, result: [...result] })
    }
    result.push((sum / k).toFixed(2))
  }
  return result
}

findAllAverages.__vizName = 'Find all averages (brute force)'
findAllAverages.__defaultInput = [[1, 3, 2, 6, -1, 4, 1, 8, 2], 3]

export const findAllAveragesOptimal = ({ record }, arr, k) => {
  const result = []
  let windowStart = 0
  let windowSum = 0
  for (let windowEnd = 0; windowEnd < arr.length; windowEnd++) {
    windowSum += arr[windowEnd]
    record({
      start: windowStart,
      end: windowEnd,
      sum: windowSum,
      result: [...result],
    })

    if (windowEnd >= k - 1) {
      result.push((windowSum / k).toFixed(2))
      windowSum -= arr[windowStart]
      windowStart++
    }
  }
}

findAllAveragesOptimal.__vizName = 'Find all averages (optimal)'
findAllAveragesOptimal.__defaultInput = [[1, 3, 2, 6, -1, 4, 1, 8, 2], 3]

function smallestSubarrayWithGivenSum({ record }, arr, s) {
  let windowSum = 0
  let windowStart = 0
  let windowEnd = 0
  let minSubarraySize = Number.POSITIVE_INFINITY

  while (windowEnd < arr.length) {
    windowSum += arr[windowEnd] // Add the current element
    record({
      start: windowStart,
      end: windowEnd,
      result: minSubarraySize,
    })

    while (windowSum >= s) {
      windowSum -= arr[windowStart]
      minSubarraySize = Math.min(minSubarraySize, windowEnd - windowStart + 1)
      windowStart++

      record({
        start: windowStart,
        end: windowEnd,
        result: minSubarraySize,
      })
    }

    windowEnd++
  }

  if (minSubarraySize === Number.POSITIVE_INFINITY) {
    return 0
  }

  return minSubarraySize
}

smallestSubarrayWithGivenSum.__vizName = 'Smallest subarray with given sum'
smallestSubarrayWithGivenSum.__defaultInput = [[2, 1, 5, 2, 8, 9, 2, 3, 1], 7]

function longestSubstringWithKDistinct({ record }, str, k) {
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

function nonRepeatSubstring({ record }, str) {
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

export default [
  findAllAveragesOptimal,
  findAllAverages,
  smallestSubarrayWithGivenSum,
  longestSubstringWithKDistinct,
  nonRepeatSubstring,
]
