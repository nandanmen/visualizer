function findPairWithSum({ record }, nums, target) {
  let head = 0
  let tail = nums.length - 1

  while (head < tail) {
    const headNum = nums[head]
    const tailNum = nums[tail]

    record({
      head,
      tail,
      done: false,
    })

    if (headNum + tailNum === target) {
      return [head, tail]
    }

    if (headNum + tailNum > target) {
      tail--
    } else {
      head++
    }
  }

  return null
}

findPairWithSum.__vizName = 'Pair with Target Sum'
findPairWithSum.__defaultInput = [[1, 2, 3, 4, 6], 6]

export default findPairWithSum
