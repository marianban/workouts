const input = `2 3
0 0 0 0 1 0 0 0 0
1 1 1 1 1 1 1 1 1`

const inputLines = input.split('\n').map(line => line.split(' ').map(x => parseInt(x, 10)))
const nextColorsPerColor = inputLines.slice(1)
const colorCount = inputLines[0][0]
const iterationCount = inputLines[0][1]
const carpetDimension = Math.pow(3, iterationCount)
const createCarpet = (dimension) => new Array(dimension).fill(null).map(_ => new Array(dimension).fill(0))
let oldCarpet = createCarpet(1)
const startPosition = Math.floor(carpetDimension / 2)

// 1 white, 0 black

let iteraton = 1
while (iteraton <= iterationCount) {
  const newCarpetDimension = Math.pow(3, iteraton)
  const newCarpet = createCarpet(newCarpetDimension)
  for (let row=1; row<=oldCarpet.length; row++) {
    for (let col=1; col<=oldCarpet.length; col++) {
      const oldColor = oldCarpet[row-1][col-1]
      const nextColors = nextColorsPerColor[oldColor]
      const newRowStart = (row * 3) - 2
      const newColStart = (col * 3) - 2
      let colorIndex = 0
      for (let newRow=newRowStart; newRow<=newRowStart+2; newRow++) {
        for (let newCol=newColStart; newCol<=newColStart+2; newCol++) {
          newCarpet[newRow-1][newCol-1] = nextColors[colorIndex]
          colorIndex += 1
        }
      }
    }
  }
  oldCarpet = newCarpet
  iteraton += 1
}

console.log(oldCarpet)
