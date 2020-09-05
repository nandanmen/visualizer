export default function smallestSubarrayWithGivenSum({ record }, arr, s) {
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
