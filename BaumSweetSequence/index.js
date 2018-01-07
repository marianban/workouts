const toBinary = number => number.toString(2)
const extractConsecutiveZeros = string => string.match(/0+/g) || []
const hasOddLength = xs => xs.length % 2 !== 0
const someConsecutiveZerosOfOddLength = number => extractConsecutiveZeros(toBinary(number)).some(hasOddLength)
const toBaumSweet = number => someConsecutiveZerosOfOddLength(number) ? 0 : 1
const range = number => new Array(number).fill(1).map((x, i) => x + i)
const toBaumSweetSequence = number => [1, ...range(number).map(toBaumSweet)]

console.log(toBaumSweetSequence(20))
