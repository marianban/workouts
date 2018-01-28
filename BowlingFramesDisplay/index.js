const input = `9  0  9  0  9  0  9  0  9  0  9  0  9  0  9  0  9  0  9  0
10 10 10 10 10 10 10 10 10 10 10 10
5  5  5  5  5  5  5  5  5  5  5  5  5  5  5  5  5  5  5  5  5
10 3  7  6  1  10 10 10 2  8  9  0  7  3  10 10 10
9  0  3  7  6  1  3  7  8  1  5  5  0  10 8  0  7  3  8  2  8`

const lineToRolls = line =>
  line
    .split(' ')
    .filter(x => x)
    .map(x => parseInt(x, 10))

const rollsToFrames = rolls => {
  const frames = []
  let currentFrame = []
  rolls.forEach((roll, index) => {
    currentFrame.push(roll)
    const isLastFrame = frames.length === 9
    if (isLastFrame) {
      if (index === rolls.length - 1) {
        frames.push(currentFrame)
      }
    } else if (roll === 10 || currentFrame.length === 2) {
      frames.push(currentFrame)
      currentFrame = []
    }
  })
  return frames
}

const displayFirstTwoAttempts = (first, second) => {
  if (second === undefined) {
    return 'X'
  }
  if (first + second === 10) {
    return `${first}/`
  }
  if (first === 1 && second === 0) {
    return '10'
  }
  return `${first}${second}`.replace(/10/g, 'X')
}

const displayThirdAttempt = third =>
  third === undefined ? '' : third.toString().replace(/10/g, 'X')

const displayFrames = frames =>
  frames
    .map(([first, second, third]) =>
      `${displayFirstTwoAttempts(first, second)}${displayThirdAttempt(third)}`.replace(/0/g, '-'),
    )
    .join(' ')

const result = input
  .split('\n')
  .map(lineToRolls)
  .map(rolls => displayFrames(rollsToFrames(rolls)))
  .join('\n')

console.log(result)
