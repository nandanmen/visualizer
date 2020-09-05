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

export default function findAllAveragesOptimal({ record }, arr, k) {
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
